package com.university.dummystore.presentation.orders

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.university.dummystore.domain.model.Product
import com.university.dummystore.domain.use_case.order.OrderUseCases
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
class OrderViewModel @Inject constructor(
    private val orderUseCases: OrderUseCases,
): ViewModel() {
    var state by mutableStateOf(OrderState())

    init {
        fetchOrders()
    }

    fun toFirstPage() {
        state = state.copy(page = 1, orders = listOf())
    }

    fun loadMore() {
        state = state.copy(page = state.page + 1)
        fetchOrders()
    }

    fun fetchOrders() {
        viewModelScope.launch {
            state = state.copy(isLoading = true)

            val fetchResult = orderUseCases.fetchOrders(
                page = state.page,
                limit = state.limit
            )

            state = state.copy(isLoading = false)

            when(fetchResult) {
                is ApiResult.Success -> {
                    fetchResult.data?.let {
                        state = state.copy(
                            hasNext = it.page < it.pageCount,
                            orders = state.orders + it.items
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
}