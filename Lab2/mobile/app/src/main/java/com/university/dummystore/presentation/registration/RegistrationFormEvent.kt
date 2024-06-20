package com.university.dummystore.presentation.registration

sealed class RegistrationFormEvent {
    data class EmailChanged(
        val email: String
    ): RegistrationFormEvent()
    data class PasswordChanged(
        val password: String
    ): RegistrationFormEvent()
    data class ConfirmPasswordChanged(
        val confirmPassword: String
    ): RegistrationFormEvent()
    data object Register: RegistrationFormEvent()
}