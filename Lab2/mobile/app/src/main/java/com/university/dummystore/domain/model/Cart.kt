package com.university.dummystore.domain.model

data class CartItem (
    val quantity: Int,
    val product: Product,
)

data class Cart (
    val items: List<CartItem>,
)