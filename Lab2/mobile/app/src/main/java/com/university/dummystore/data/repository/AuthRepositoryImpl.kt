package com.university.dummystore.data.repository

import com.university.dummystore.data.local.TokenDataStore
import com.university.dummystore.data.mapper.toApiError
import com.university.dummystore.data.remote.AuthApi
import com.university.dummystore.data.repository.request.AuthRequest
import com.university.dummystore.data.repository.response.AuthResponse
import com.university.dummystore.domain.repository.AuthRepository
import com.university.dummystore.utils.ApiResult
import javax.inject.Inject


class AuthRepositoryImpl @Inject constructor(
    private val authApi: AuthApi,
    private val preferences: TokenDataStore
): AuthRepository {
    override suspend fun login(
        request: AuthRequest
    ): ApiResult<AuthResponse> {
        return try {
            val res = authApi.login(request)
            preferences.saveAccessToken(res.accessToken)
            preferences.saveRefreshToken(res.refreshToken)
            ApiResult.Success(res)
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }

    override suspend fun register(
        request: AuthRequest
    ): ApiResult<AuthResponse> {
        return try {
            val res = authApi.register(request)
            preferences.saveAccessToken(res.accessToken)
            preferences.saveRefreshToken(res.refreshToken)
            ApiResult.Success(res)
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }

    override suspend fun logout(): ApiResult<Nothing> {
        return try {
            authApi.logout()
            preferences.clearAllTokens()
            ApiResult.Success()
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }

    override suspend fun refresh(): ApiResult<AuthResponse> {
        return try {
            val token = preferences.getRefreshToken()
            val res = authApi.refresh("refreshToken=$token")
            preferences.saveAccessToken(res.accessToken)
            preferences.saveRefreshToken(res.refreshToken)
            ApiResult.Success(res)
        } catch (e: Throwable) {
            preferences.clearAllTokens()
            return ApiResult.Error(e.toApiError())
        }
    }

}