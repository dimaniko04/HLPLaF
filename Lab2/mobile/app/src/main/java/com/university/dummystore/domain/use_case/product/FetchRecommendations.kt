package com.university.dummystore.domain.use_case.product

import com.university.dummystore.domain.model.Product
import com.university.dummystore.domain.repository.ProductRepository
import com.university.dummystore.utils.ApiResult

class FetchRecommendations (
    private val repository: ProductRepository
) {
    suspend operator fun invoke(): ApiResult<List<Product>> {
        return repository.fetchRecommendations()
    }
}