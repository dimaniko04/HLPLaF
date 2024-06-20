package com.university.dummystore.presentation.components.productList

import com.university.dummystore.domain.model.Product

sealed class ProductListEvent {
    data class ToggleFavorite(
        val product: Product
    ): ProductListEvent()
    data object LoadMore: ProductListEvent()
}