package com.university.dummystore.presentation.catalog

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
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
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.university.dummystore.R
import com.university.dummystore.domain.model.Product
import com.university.dummystore.presentation.components.productList.ProductList
import com.university.dummystore.presentation.components.productList.ProductListEvent
import com.university.dummystore.presentation.components.productList.ProductListState
import com.university.dummystore.presentation.components.storeScaffold.StoreScaffold
import com.university.dummystore.presentation.components.storeScaffold.StoreScaffoldViewModel
import com.university.dummystore.utils.Constants

@Composable
fun ProductCatalogScreen(
    navController: NavController,
    viewModel: ProductCatalogViewModel = hiltViewModel(),
) {
    StoreScaffold(
        title = "Catalog",
        navController = navController
    ) {
        RecommendedProductsCarousel(state = viewModel.state)
        Spacer(modifier = Modifier.height(20.dp))
        ProductList(
            state = viewModel.state,
            onEvent = { event ->
                viewModel.onEvent(event)
            },
        )
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