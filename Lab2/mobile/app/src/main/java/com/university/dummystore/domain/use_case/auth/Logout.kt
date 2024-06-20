package com.university.dummystore.domain.use_case.auth

import com.university.dummystore.domain.repository.AuthRepository
import com.university.dummystore.utils.ApiResult

class Logout (
    private val repository: AuthRepository
) {
    suspend operator fun invoke(): ApiResult<Nothing> {
        return repository.logout()
    }
}