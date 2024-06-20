package com.university.dummystore.data.mapper

import com.google.gson.Gson
import com.university.dummystore.utils.ApiError
import retrofit2.HttpException
import java.io.IOError

fun Throwable.toApiError(): ApiError {
    return when (this) {
        is IOError -> ApiError.NetworkError
        is HttpException -> {
            if (this.code() == 400) {
                this.response()?.let {
                    val errorBody = it.errorBody()
                    val gson = Gson()

                    gson.fromJson(
                        errorBody?.charStream(),
                        ApiError.BadRequest::class.java
                    )
                }
                ?: ApiError.BadRequest(this.message())
            }
            else if (this.code() == 401) {
                ApiError.Unauthorized
            }
            else {
                ApiError.UnknownError
            }
        }
        else -> ApiError.UnknownError
    }
}