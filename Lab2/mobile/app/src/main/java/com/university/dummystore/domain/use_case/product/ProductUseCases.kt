package com.university.dummystore.domain.use_case.product

data class ProductUseCases(
    val fetchProducts: FetchProducts,
    val fetchFavorites: FetchFavorites,
    val fetchRecommendations: FetchRecommendations,
    val toggleFavorite: ToggleFavorite,
)
