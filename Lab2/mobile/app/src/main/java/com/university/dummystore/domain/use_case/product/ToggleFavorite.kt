package com.university.dummystore.domain.use_case.product

import com.university.dummystore.domain.repository.ProductRepository
import com.university.dummystore.utils.ApiResult

class ToggleFavorite (
    private val repository: ProductRepository
) {
    suspend operator fun invoke(
        id: Int,
        value: Boolean
    ): ApiResult<Unit> {
        return repository.toggleFavorite(id, value)
    }
}