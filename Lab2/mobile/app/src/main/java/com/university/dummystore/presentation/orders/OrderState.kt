package com.university.dummystore.presentation.orders

import com.university.dummystore.domain.model.Order

data class OrderState (
    val page: Int = 1,
    val limit: Int = 2,
    val hasNext: Boolean = true,

    val isLoading: Boolean = false,
    val orders: List<Order> = listOf(),
)