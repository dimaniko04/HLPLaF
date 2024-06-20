package com.university.dummystore.domain.use_case.order

import com.university.dummystore.data.repository.response.Paginated
import com.university.dummystore.domain.model.Order
import com.university.dummystore.domain.repository.OrderRepository
import com.university.dummystore.utils.ApiResult

class FetchOrders (
    private val repository: OrderRepository
) {
    suspend operator fun invoke(
        page: Int,
        limit: Int
    ): ApiResult<Paginated<Order>> {
        return repository.fetchOrders(page, limit)
    }
}