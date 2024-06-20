package com.university.dummystore.domain.use_case.product

import com.university.dummystore.data.repository.response.Paginated
import com.university.dummystore.domain.model.Product
import com.university.dummystore.domain.repository.ProductRepository
import com.university.dummystore.utils.ApiResult

class FetchFavorites (
    private val repository: ProductRepository
) {
    suspend operator fun invoke(
        page: Int,
        limit: Int
    ): ApiResult<Paginated<Product>> {
        return repository.fetchFavorites(page, limit)
    }
}