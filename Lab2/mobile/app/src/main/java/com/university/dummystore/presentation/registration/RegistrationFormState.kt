package com.university.dummystore.presentation.registration

data class RegistrationFormState(
    val email: String = "test2@gmail.com",
    val emailError: String? = null,
    val password: String = "qwerty1234",
    val passwordError: String? = null,
    val confirmPassword: String = "qwerty1234",
    val confirmPasswordError: String? = null,

    val isLoading: Boolean = false,
)
