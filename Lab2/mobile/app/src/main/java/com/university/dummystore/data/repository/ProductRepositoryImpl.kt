package com.university.dummystore.data.repository

import com.university.dummystore.data.mapper.toApiError
import com.university.dummystore.data.remote.ProductApi
import com.university.dummystore.data.repository.response.Paginated
import com.university.dummystore.domain.model.Product
import com.university.dummystore.domain.repository.ProductRepository
import com.university.dummystore.utils.ApiResult
import javax.inject.Inject

class ProductRepositoryImpl @Inject constructor(
    private val productApi: ProductApi
): ProductRepository {
    override suspend fun fetchProducts(
        page: Int,
        limit: Int
    ): ApiResult<Paginated<Product>> {
        return try {
            val res = productApi.fetchProducts(page, limit)
            ApiResult.Success(res)
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }

    override suspend fun fetchFavorites(
        page: Int,
        limit: Int
    ): ApiResult<Paginated<Product>> {
        return try {
            val res = productApi.fetchFavorite(page, limit)
            ApiResult.Success(res)
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }

    override suspend fun fetchRecommendations(): ApiResult<List<Product>> {
        return try {
            val res = productApi.fetchRecommendations()
            ApiResult.Success(res)
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }

    override suspend fun toggleFavorite(id: Int, value: Boolean): ApiResult<Unit> {
        return try {
            val res = if (value) {
                productApi.addFavorite(productId = id)
            } else {
                productApi.removeFavorite(productId = id)
            }
            ApiResult.Success(res)
        } catch (e: Throwable) {
            return ApiResult.Error(e.toApiError())
        }
    }
}