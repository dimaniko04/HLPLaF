package com.university.dummystore.presentation.components.productList

import androidx.activity.ComponentActivity
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import com.university.dummystore.presentation.shared.CartDataViewModel

@Composable
fun ProductList(
    state: ProductListState,
    onEvent: (event: ProductListEvent) -> Unit,
) {
    val cartDataViewModel = ViewModelProvider(
        LocalContext.current as ComponentActivity
    )[CartDataViewModel::class.java]

    Column {
        LazyColumn {
            items(state.products) { product ->
                ProductListItem(
                    product,
                    addToCart = {
                        cartDataViewModel.addToCart(product)
                    },
                    toggleFavorite = {
                        onEvent(ProductListEvent.ToggleFavorite(product))
                    }
                )
            }
            item {
                if (state.isLoading) {
                    CircularProgressIndicator()
                } else if (state.hasNext && state.products.isNotEmpty()) {
                    onEvent(ProductListEvent.LoadMore)
                }
            }
        }
    }
}