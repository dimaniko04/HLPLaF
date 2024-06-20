package com.university.dummystore.domain.repository

import com.university.dummystore.data.repository.request.AuthRequest
import com.university.dummystore.data.repository.response.AuthResponse
import com.university.dummystore.utils.ApiResult

interface AuthRepository {
    suspend fun login(request: AuthRequest): ApiResult<AuthResponse>
    suspend fun register(request: AuthRequest): ApiResult<AuthResponse>
    suspend fun logout(): ApiResult<Nothing>
    suspend fun refresh(): ApiResult<AuthResponse>
}