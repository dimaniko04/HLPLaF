package com.university.dummystore.data.local

import android.util.Log
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import com.university.dummystore.domain.local.CartManager
import com.university.dummystore.domain.model.Cart
import com.university.dummystore.domain.model.CartItem
import com.university.dummystore.domain.model.Product
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.runBlocking
import javax.inject.Inject

class CartDataStore @Inject constructor(
    private val dataStore: DataStore<Preferences>
): CartManager {
    companion object {
        val CART = stringPreferencesKey("cart")
    }

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()
    private val adapter = moshi.adapter(Cart::class.java)

    override suspend fun getCart(): Cart {
        val cartJson = dataStore.data.map {
            it[CartDataStore.CART]
        }.first()

        return cartJson?.let {json ->
            adapter.fromJson(json)
        } ?: Cart(listOf())
    }

    override suspend fun saveCart(cart: Cart) {
        dataStore.edit {
            it[CART] = adapter.toJson(cart)
        }
    }

    override suspend fun clearCart() {
        dataStore.edit {
            it.remove(CART)
        }
    }
}