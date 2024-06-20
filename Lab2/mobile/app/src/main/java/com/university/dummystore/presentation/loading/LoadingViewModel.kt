package com.university.dummystore.presentation.loading

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.university.dummystore.domain.use_case.auth.AuthUseCases
import com.university.dummystore.utils.ApiResult
import com.university.dummystore.utils.Event
import com.university.dummystore.utils.EventBus
import com.university.dummystore.utils.Screen
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoadingViewModel @Inject constructor(
    private val authUseCases: AuthUseCases
): ViewModel() {
    init {
        authenticate()
    }

    private fun authenticate() {
        viewModelScope.launch {
            val result = authUseCases.refresh()

            when(result) {
                is ApiResult.Success -> EventBus.sendEvent(
                    Event.NavigateEvent(
                        Screen.ProductScreen.route
                    )
                )
                is ApiResult.Error -> EventBus.sendEvent(
                    Event.NavigateEvent(
                        Screen.LoginScreen.route
                    )
                )
            }
        }
    }
}