package com.university.dummystore.domain.use_case.validation

data class ValidationUseCases(
    val validateEmail: ValidateEmail,
    val validatePassword: ValidatePassword,
    val validateConfirmPassword: ValidateConfirmPassword
)
