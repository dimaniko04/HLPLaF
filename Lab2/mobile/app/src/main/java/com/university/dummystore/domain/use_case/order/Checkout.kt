package com.university.dummystore.domain.use_case.order

import com.university.dummystore.data.repository.request.CheckoutRequest
import com.university.dummystore.data.repository.request.OrderedProduct
import com.university.dummystore.domain.repository.OrderRepository
import com.university.dummystore.utils.ApiResult

class Checkout (
    private val repository: OrderRepository
) {
    suspend operator fun invoke(orderDetails: List<OrderedProduct>): ApiResult<Unit> {
        val checkoutRequest = CheckoutRequest(
            orderDetails = orderDetails
        )

        return repository.checkout(checkoutRequest)
    }
}