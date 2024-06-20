package com.university.dummystore.presentation.login

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
class LoginViewModel @Inject constructor(
    private val validationUseCases: ValidationUseCases,
    private val authUseCases: AuthUseCases
): ViewModel() {
    var state by  mutableStateOf(LoginFormState())

    fun onEvent(event: LoginFormEvent) {
        when(event) {
            is LoginFormEvent.EmailChanged -> {
                state = state.copy(email = event.email)
            }
            is LoginFormEvent.PasswordChanged -> {
                state = state.copy(password = event.password)
            }
            is LoginFormEvent.Login -> {
                login()
            }
        }
    }

    private fun login() {
        if (!validate()) {
            return
        }
        viewModelScope.launch {
            state = state.copy(isLoading = true)

            val loginResult = authUseCases.login(
                email = state.email,
                password = state.password
            )

            state = state.copy(isLoading = false)

            when(loginResult) {
                is ApiResult.Success -> {
                    EventBus.sendEvent(
                        Event.NavigateEvent(Screen.ProductScreen.route)
                    )
                }
                is ApiResult.Error -> {
                    EventBus.sendEvent(
                        Event.SnackbarEvent(loginResult.error!!.message)
                    )
                }
            }
        }
    }

    private fun validate(): Boolean {
        val emailResult = validationUseCases.validateEmail(state.email)
        val passwordResult = validationUseCases
            .validatePassword(state.password)

        val hasError = listOf(
            emailResult, passwordResult
        ).any { it != null }

        if (hasError) {
            state = state.copy(
                emailError = emailResult,
                passwordError = passwordResult,
            )
            return false
        }
        return true
    }
}