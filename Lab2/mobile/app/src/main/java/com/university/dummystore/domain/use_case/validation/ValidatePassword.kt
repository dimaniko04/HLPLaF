package com.university.dummystore.domain.use_case.validation

class ValidatePassword {
    operator fun invoke(password: String): String? {
        if (password.isBlank()) {
            return "Required field"
        }
        if (password.length < 8) {
            return "Must be at least 8 characters long"
        }
        if (password.length > 32) {
            return "Must be less than 32 characters long"
        }
        return null
    }
}