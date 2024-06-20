package com.university.dummystore.presentation.favorite

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
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
class FavoriteViewModel @Inject constructor(
    private val productUseCases: ProductUseCases,
): ViewModel() {
    var state by mutableStateOf(ProductListState())

    init {
        fetchFavorites()
    }

    fun onEvent(event: ProductListEvent) {
        when(event) {
            is ProductListEvent.LoadMore -> {
                state = state.copy(page = state.page + 1)
                fetchFavorites()
            }
            is ProductListEvent.ToggleFavorite -> {
                removeFavorite(event.product)
            }
        }
    }

    private fun fetchFavorites() {
        viewModelScope.launch {
            state = state.copy(isLoading = true)

            val fetchResult = productUseCases.fetchFavorites(
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

    private fun removeFavorite(product: Product) {
        viewModelScope.launch {
            val toggleResult = productUseCases
                .toggleFavorite(product.id, false)

            when(toggleResult) {
                is ApiResult.Success -> {
                    state = state.copy(
                        products = state.products.filter {
                            it != product
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