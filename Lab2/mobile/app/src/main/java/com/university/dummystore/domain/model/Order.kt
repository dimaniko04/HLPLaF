package com.university.dummystore.domain.model

import java.util.Date

data class OrderDetail (
    val id: Int,
    val quantity: Int,
    val product: Product
)

data class Order (
    val id: Int,
    val status: String,
    val createdAt: Date,
    val orderDetails: List<OrderDetail>,
)