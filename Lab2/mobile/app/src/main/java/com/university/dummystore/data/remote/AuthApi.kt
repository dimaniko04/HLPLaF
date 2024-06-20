package com.university.dummystore.data.remote

import com.university.dummystore.data.repository.request.AuthRequest
import com.university.dummystore.data.repository.response.AuthResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface AuthApi {
    @POST("auth/login")
    suspend fun login(
        @Body request: AuthRequest
    ): AuthResponse

    @POST("auth/registration")
    suspend fun register(
        @Body request: AuthRequest
    ): AuthResponse

    @POST("auth/logout")
    suspend fun logout()

    @GET("auth/refresh")
    suspend fun refresh(
        @Header("Cookie") refreshToken: String
    ): AuthResponse
}