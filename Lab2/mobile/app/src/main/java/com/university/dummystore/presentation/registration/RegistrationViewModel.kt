package com.university.dummystore.presentation.registration

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.university.dummystore.domain.use_case.auth.AuthUseCases
import com.university.dummystore.domain.use_case.validation.ValidationUseCases
import com.university.dummystore.utils.ApiResult
import com.university.dummystore.utils.Event
import com.university.dummystore.utils.EventBus
import com.university.dummystore.utils.Screen
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class RegistrationViewModel @Inject constructor(
    private val validationUseCases: ValidationUseCases,
    private val authUseCases: AuthUseCases
): ViewModel() {

    var state by mutableStateOf(RegistrationFormState())

    fun onEvent(event: RegistrationFormEvent) {
        when(event) {
            is RegistrationFormEvent.EmailChanged -> {
                state = state.copy(email = event.email)
            }
            is RegistrationFormEvent.PasswordChanged -> {
                state = state.copy(password = event.password)
            }
            is RegistrationFormEvent.ConfirmPasswordChanged -> {
                state = state.copy(confirmPassword = event.confirmPassword)
            }
            is RegistrationFormEvent.Register -> {
                register()
            }
        }
    }

    private fun register() {
        if (!validate()) {
            return
        }
        viewModelScope.launch {
            state = state.copy(isLoading = true)

            val registerResult = authUseCases.register(
                email = state.email,
                password = state.password
            )

            state = state.copy(isLoading = false)

            when(registerResult) {
                is ApiResult.Success -> {
                    EventBus.sendEvent(
                        Event.NavigateEvent(Screen.ProductScreen.route)
                    )
                }
                is ApiResult.Error -> {
                    EventBus.sendEvent(
                        Event.SnackbarEvent(registerResult.error!!.message)
                    )
                }
            }
        }
    }

    private fun validate(): Boolean {
        val emailResult = validationUseCases.validateEmail(state.email)
        val passwordResult = validationUseCases
            .validatePassword(state.password)
        val confirmPasswordResult = validationUseCases
            .validateConfirmPassword(state.password, state.confirmPassword)

        val hasError = listOf(
            emailResult, passwordResult, confirmPasswordResult
        ).any { it != null }

        if (hasError) {
            state = state.copy(
                emailError = emailResult,
                passwordError = passwordResult,
                confirmPasswordError = confirmPasswordResult
            )
            return false
        }
        return true
    }
}