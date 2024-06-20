package com.university.dummystore.utils

sealed class ApiError(
    val message: String,
    val code: Int = 500
) {
    class BadRequest(message: String) : ApiError(
        message = message,
        code = 400
    )
    data object NetworkError: ApiError(
        message = "Network error",
        code = 500
    )
    data object Unauthorized: ApiError(
        message = "Authorization required!",
        code = 401
    )
    data object UnknownError: ApiError(
        message = "Oops! Something went wrong!",
        code = 500
    )
}