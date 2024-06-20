package com.university.dummystore.domain.model

data class Product(
    val id: Int,
    val img: String,
    val name: String,
    val price: Double,
    val isFavorite: Boolean
)
