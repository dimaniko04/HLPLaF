package com.university.dummystore.domain.use_case.order

data class OrderUseCases(
    val checkout: Checkout,
    val fetchOrders: FetchOrders,
)
