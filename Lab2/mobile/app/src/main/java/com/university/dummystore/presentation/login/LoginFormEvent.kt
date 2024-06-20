package com.university.dummystore.presentation.login

sealed class LoginFormEvent {
    data class EmailChanged(
        val email: String
    ): LoginFormEvent()
    data class PasswordChanged(
        val password: String
    ): LoginFormEvent()
    data object Login: LoginFormEvent()
}