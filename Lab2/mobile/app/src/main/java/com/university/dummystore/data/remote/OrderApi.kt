package com.university.dummystore.data.remote

import com.university.dummystore.data.repository.request.CheckoutRequest
import com.university.dummystore.data.repository.response.Paginated
import com.university.dummystore.domain.model.Order
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface OrderApi {
    @GET("order")
    suspend fun fetchOrders(
        @Query("page") page: Int,
        @Query("limit") limit: Int,
    ): Paginated<Order>

    @POST("order")
    suspend fun checkout(
        @Body request: CheckoutRequest
    )
}