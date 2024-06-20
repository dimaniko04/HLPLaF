package com.university.dummystore.presentation.components.productList

import com.university.dummystore.domain.model.Product
import com.university.dummystore.domain.use_case.product.FetchRecommendations

data class ProductListState (
    val page: Int = 1,
    val limit: Int = 10,
    val hasNext: Boolean = true,

    val isLoading: Boolean = false,
    val products: List<Product> = listOf(),
    val recommendations: List<Product> = listOf(),
    val isLoadingRecommendations: Boolean = false,
)