package com.university.dummystore.presentation.components.storeScaffold

import androidx.compose.material3.DrawerState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.university.dummystore.data.local.CartDataStore
import com.university.dummystore.data.repository.request.OrderedProduct
import com.university.dummystore.domain.local.CartManager
import com.university.dummystore.domain.model.Cart
import com.university.dummystore.domain.model.CartItem
import com.university.dummystore.domain.model.Product
import com.university.dummystore.domain.use_case.auth.AuthUseCases
import com.university.dummystore.domain.use_case.order.OrderUseCases
import com.university.dummystore.utils.ApiResult
import com.university.dummystore.utils.Event
import com.university.dummystore.utils.EventBus
import com.university.dummystore.utils.Screen
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class StoreScaffoldViewModel @Inject constructor(
    private val authUseCases: AuthUseCases,
    private val orderUseCases: OrderUseCases
): ViewModel() {
    val isSubmitting = mutableStateOf(false)

    fun logout(clearCart: () -> Unit) {
        viewModelScope.launch {
            when(val logoutResult = authUseCases.logout()) {
                is ApiResult.Success -> {
                    clearCart()
                    EventBus.sendEvent(
                        Event.NavigateEvent(Screen.LoginScreen.route)
                    )
                }
                is ApiResult.Error -> {
                    EventBus.sendEvent(
                        Event.SnackbarEvent(logoutResult.error!!.message)
                    )
                }
            }
        }
    }

    fun checkout(cart: Cart, callback: () -> Unit) {
        viewModelScope.launch {
            isSubmitting.value = true;

            val checkoutResult = orderUseCases.checkout(
                cart.items.map {
                        item -> OrderedProduct(item.product.id, item.quantity)
                }
            )

            isSubmitting.value = false;

            when(checkoutResult) {
                is ApiResult.Success -> {
                    callback()
                }
                is ApiResult.Error -> {
                    EventBus.sendEvent(
                        Event.SnackbarEvent(checkoutResult.error!!.message)
                    )
                }
            }
        }
    }
}