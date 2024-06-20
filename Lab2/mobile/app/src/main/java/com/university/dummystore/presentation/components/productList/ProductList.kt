package com.university.dummystore.presentation.components.productList

import androidx.activity.ComponentActivity
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.ViewModelProvider
import coil.compose.AsyncImage
import com.university.dummystore.R
import com.university.dummystore.domain.model.Product
import com.university.dummystore.presentation.shared.CartDataViewModel
import com.university.dummystore.utils.Constants

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
            item {
                RecommendedProductsCarousel(state = state)
                Spacer(modifier = Modifier.height(20.dp))
            }
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

@Composable
fun RecommendedProductsCarousel(state: ProductListState) {
    Column {
        Text(
            text = "Recommended Products",
            style = MaterialTheme.typography.headlineSmall,
            modifier = Modifier.padding(16.dp)
        )

        if (state.isLoadingRecommendations) {
            CircularProgressIndicator()
        } else if (state.recommendations.isEmpty()) {
            Text(
                text = "No recommendations",
                style = MaterialTheme.typography.headlineLarge,
                modifier = Modifier.padding(16.dp)
            )
        } else {
            LazyRow(
                modifier = Modifier.fillMaxWidth(),
                contentPadding = PaddingValues(horizontal = 16.dp)
            ) {
                items(state.recommendations) { product ->
                    RecommendedProductCard(product)
                }
            }
        }
    }
}

@Composable
fun RecommendedProductCard(product: Product) {
    Card(
        modifier = Modifier
            .padding(8.dp)
            .width(200.dp)
            .height(250.dp),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Column {
            AsyncImage(
                model = "${Constants.BASE_URL}/${product.img}",
                contentDescription = null,
                placeholder = painterResource(R.mipmap.ic_placeholder),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(150.dp),
                contentScale = ContentScale.Crop
            )

            Spacer(modifier = Modifier.height(8.dp))

            Column(modifier = Modifier.padding(8.dp)) {
                Text(text = product.name, style = MaterialTheme.typography.bodyLarge)
                Text(text = "\$${product.price}", style = MaterialTheme.typography.bodyMedium)
            }
        }
    }
}