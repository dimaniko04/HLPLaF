package com.university.dummystore.data.repository.request

data class OrderedProduct (
    val productId: Int,
    val quantity: Int,
)

data class CheckoutRequest (
    val orderDetails: List<OrderedProduct>
)