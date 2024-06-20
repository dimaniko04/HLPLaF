package com.university.dummystore.domain.use_case.auth

import com.university.dummystore.data.repository.response.AuthResponse
import com.university.dummystore.domain.repository.AuthRepository
import com.university.dummystore.utils.ApiResult

class Refresh (
    private val repository: AuthRepository
) {
    suspend operator fun invoke(): ApiResult<AuthResponse> {
        return repository.refresh()
    }
}