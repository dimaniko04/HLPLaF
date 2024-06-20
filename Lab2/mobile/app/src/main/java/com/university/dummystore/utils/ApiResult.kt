package com.university.dummystore.utils

sealed class ApiResult<T>(
    val data: T? = null,
    val error: ApiError? = null
) {
    class Success<T>(data: T? = null): ApiResult<T>(data)
    class Error<T>(error: ApiError): ApiResult<T>(error = error)
}