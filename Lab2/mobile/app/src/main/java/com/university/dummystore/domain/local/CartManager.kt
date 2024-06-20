package com.university.dummystore.domain.local

import com.university.dummystore.domain.model.Cart
import com.university.dummystore.domain.model.CartItem
import com.university.dummystore.domain.model.Product
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow

interface CartManager {
    suspend fun getCart(): Cart
    suspend fun saveCart(cart: Cart)
    suspend fun clearCart()
}
