package com.university.dummystore.data.repository

import com.university.dummystore.data.mapper.toApiError
import com.university.dummystore.data.remote.OrderApi
import com.university.dummystore.data.repository.request.CheckoutRequest
import com.university.dummystore.data.repository.response.Paginated
import com.university.dummystore.domain.model.Order
import com.university.dummystore.domain.repository.OrderRepository
import com.university.dummystore.utils.ApiResult
import javax.inject.Inject

class OrderRepositoryImpl @Inject constructor(
    private val orderApi: OrderApi
): OrderRepository {
    override suspend fun fetchOrders(
        page: Int,
        limit: Int
    ): ApiResult<Paginated<Order>> {
        return try {
            val res = orderApi.fetchOrders(page, limit)
            ApiResult.Success(res)
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }

    override suspend fun checkout(order: CheckoutRequest): ApiResult<Unit> {
        return try {
            val res = orderApi.checkout(order)
            ApiResult.Success(res)
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }

}