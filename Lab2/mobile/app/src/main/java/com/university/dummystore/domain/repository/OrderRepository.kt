package com.university.dummystore.domain.repository

import com.university.dummystore.data.repository.request.CheckoutRequest
import com.university.dummystore.data.repository.response.Paginated
import com.university.dummystore.domain.model.Order
import com.university.dummystore.utils.ApiResult

interface OrderRepository {
    suspend fun fetchOrders(
        page: Int,
        limit:Int,
    ): ApiResult<Paginated<Order>>
    suspend fun checkout(order: CheckoutRequest): ApiResult<Unit>
}