package com.university.dummystore.domain.use_case.auth

import com.university.dummystore.data.repository.request.AuthRequest
import com.university.dummystore.data.repository.response.AuthResponse
import com.university.dummystore.domain.repository.AuthRepository
import com.university.dummystore.utils.ApiResult

class Login(
    private val repository: AuthRepository
) {
    suspend operator fun invoke(
        email: String,
        password: String
    ): ApiResult<AuthResponse> {
        val loginRequest = AuthRequest(
            email = email.trim(),
            password = password.trim()
        )

        return repository.login(loginRequest)
    }
}