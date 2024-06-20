package com.university.dummystore.presentation.catalog

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.university.dummystore.data.local.CartDataStore
import com.university.dummystore.domain.model.Product
import com.university.dummystore.domain.use_case.product.ProductUseCases
import com.university.dummystore.presentation.components.productList.ProductListEvent
import com.university.dummystore.presentation.components.productList.ProductListState
import com.university.dummystore.utils.ApiResult
import com.university.dummystore.utils.Event
import com.university.dummystore.utils.EventBus
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProductCatalogViewModel @Inject constructor(
    private val productUseCases: ProductUseCases,
): ViewModel() {
    var state by mutableStateOf(ProductListState())

    init {
        fetchRecommendations()
        fetchProducts()
    }

    fun onEvent(event: ProductListEvent) {
        when(event) {
            is ProductListEvent.LoadMore -> {
                state = state.copy(page = state.page + 1)
                fetchProducts()
            }
            is ProductListEvent.ToggleFavorite -> {
                toggleFavorite(event.product)
            }
        }
    }

    private fun fetchProducts() {
        viewModelScope.launch {
            state = state.copy(isLoading = true)

            val fetchResult = productUseCases.fetchProducts(
                page = state.page,
                limit = state.limit
            )

            state = state.copy(isLoading = false)

            when(fetchResult) {
                is ApiResult.Success -> {
                    fetchResult.data?.let {
                        state = state.copy(
                            hasNext = it.page < it.pageCount,
                            products = state.products + it.items
                        )
                    }
                }
                is ApiResult.Error -> {
                    EventBus.sendEvent(
                        Event.SnackbarEvent(fetchResult.error!!.message)
                    )
                }
            }
        }
    }

    private fun fetchRecommendations() {
        viewModelScope.launch {
            state = state.copy(isLoadingRecommendations = true)

            val fetchResult = productUseCases.fetchRecommendations()

            state = state.copy(isLoadingRecommendations = false)

            when(fetchResult) {
                is ApiResult.Success -> {
                    fetchResult.data?.let {
                        state = state.copy(
                            recommendations = it
                        )
                    }
                }
                is ApiResult.Error -> {
                    EventBus.sendEvent(
                        Event.SnackbarEvent(fetchResult.error!!.message)
                    )
                }
            }
        }
    }

    private fun toggleFavorite(product: Product) {
        viewModelScope.launch {
            val toggleResult = productUseCases.toggleFavorite(
                product.id,
                !product.isFavorite
            )

            when(toggleResult) {
                is ApiResult.Success -> {
                    state = state.copy(
                        products = state.products.map {
                            if (it.id == product.id) {
                                it.copy(isFavorite = !it.isFavorite)
                            } else it
                        }
                    )
                }
                is ApiResult.Error -> {
                    EventBus.sendEvent(
                        Event.SnackbarEvent(toggleResult.error!!.message)
                    )
                }
            }
        }
    }
}