package com.university.dummystore.domain.repository

import com.university.dummystore.data.repository.response.Paginated
import com.university.dummystore.domain.model.Product
import com.university.dummystore.utils.ApiResult

interface ProductRepository {
    suspend fun fetchProducts(
        page: Int,
        limit: Int
    ): ApiResult<Paginated<Product>>
    suspend fun fetchFavorites(
        page: Int,
        limit: Int
    ): ApiResult<Paginated<Product>>
    suspend fun fetchRecommendations(): ApiResult<List<Product>>
    suspend fun toggleFavorite(
        id: Int,
        value: Boolean
    ): ApiResult<Unit>
}