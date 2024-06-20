package com.university.dummystore.data.remote.interceptor

import com.university.dummystore.domain.local.TokenManager
import com.university.dummystore.domain.repository.AuthRepository
import com.university.dummystore.utils.ApiResult
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor @Inject constructor(
    private val tokenManager: TokenManager,
    private val authRepository: AuthRepository
): Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = runBlocking {
            tokenManager.getAccessToken()
        }
        val originalRequest = chain.request()
        val request = originalRequest.newBuilder()

        request.addHeader("Authorization", "Bearer $token")

        val response = chain.proceed(request.build())

        if (response.code == 401) {
            synchronized(this) {
                val newToken = runBlocking {
                    when(val refreshResponse = authRepository.refresh()) {
                        is ApiResult.Success -> {
                            refreshResponse.data!!.accessToken
                        }
                        else -> null
                    }
                }
                if (newToken != null) {
                    val newRequest = originalRequest
                        .newBuilder()
                        .header("Authorization", "Bearer $newToken")
                        .build()
                    return chain.proceed(newRequest)
                }
            }
        }

        return response
    }
}