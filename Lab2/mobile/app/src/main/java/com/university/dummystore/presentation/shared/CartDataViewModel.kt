package com.university.dummystore.presentation.shared

import androidx.datastore.dataStore
import androidx.datastore.preferences.core.edit
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.university.dummystore.data.local.CartDataStore
import com.university.dummystore.domain.local.CartManager
import com.university.dummystore.domain.model.Cart
import com.university.dummystore.domain.model.CartItem
import com.university.dummystore.domain.model.Product
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import javax.inject.Inject

@HiltViewModel
class CartDataViewModel @Inject constructor(
    private val cartDataStore: CartManager
): ViewModel() {
    private val _cartState = MutableSharedFlow<Cart>(replay = 1)
    private var _cart = Cart(listOf())

    val cartState: SharedFlow<Cart> = _cartState

    init {
        runBlocking {
            _cart = cartDataStore.getCart()
            _cartState.tryEmit(_cart)
        }
    }

     fun addToCart(product: Product) {
        val item = _cart.items.find { it.product.id == product.id }

        item?.let {
            _cart = _cart.copy(items = _cart.items.map {
                if (it == item)
                    it.copy(quantity = it.quantity + 1)
                else
                    it
            })
        } ?: run {
            var items = _cart.items
            items = items.plus(
                CartItem(1, product)
            )
            _cart = _cart.copy(items = items)
        }

        _cartState.tryEmit(_cart)
        viewModelScope.launch {
            cartDataStore.saveCart(_cart)
        }
    }

    fun removeFromCart(item: CartItem) {
        if (item.quantity == 1) {
            _cart = _cart.copy(
                items = _cart.items.filter { it != item }
            )
        } else run {
            _cart = _cart.copy(items = _cart.items.map {
                if (it == item)
                    it.copy(quantity = it.quantity - 1)
                else
                    it
            })
        }

        _cartState.tryEmit(_cart)
        viewModelScope.launch {
            cartDataStore.saveCart(_cart)
        }
    }

    fun clearCart() {
        _cart = Cart(listOf())
        _cartState.tryEmit(_cart)
        viewModelScope.launch {
            cartDataStore.clearCart()
        }
    }
}