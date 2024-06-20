package com.university.dummystore.domain.use_case.validation

class ValidateConfirmPassword {
    operator fun invoke(
        password: String,
        confirmPassword: String
    ): String? {
        if (password != confirmPassword) {
            return "Passwords must match"
        }
        return null
    }
}