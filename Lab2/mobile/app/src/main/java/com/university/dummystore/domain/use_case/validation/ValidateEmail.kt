package com.university.dummystore.domain.use_case.validation

import android.util.Patterns

class ValidateEmail {
    operator fun invoke(email: String): String? {
        if (email.isBlank()) {
            return "Required field"
        }
        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            return "Invalid email"
        }
        return null
    }
}