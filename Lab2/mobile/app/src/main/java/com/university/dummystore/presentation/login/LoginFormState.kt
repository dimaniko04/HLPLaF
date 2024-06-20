package com.university.dummystore.presentation.login

data class LoginFormState(
    val email: String = "test@gmail.com",
    val emailError: String? = null,
    val password: String = "qwerty1234",
    val passwordError: String? = null,

    val isLoading: Boolean = false,
)