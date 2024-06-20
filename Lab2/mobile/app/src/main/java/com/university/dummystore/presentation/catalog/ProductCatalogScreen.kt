package com.university.dummystore.presentation.catalog

import android.util.Log
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
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
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
import com.university.dummystore.utils.Event
import com.university.dummystore.utils.EventBus

@Composable
fun ProductCatalogScreen(
    navController: NavController,
    viewModel: ProductCatalogViewModel = hiltViewModel(),
) {
    val context = LocalContext.current

    LaunchedEffect(key1 = context, viewModel) {
        EventBus.events.collect { event ->
            when(event) {
                is Event.UpdateRecommendationsEvent -> {
                    viewModel.fetchRecommendations()
                }
            }
        }
    }

    StoreScaffold(
        title = "Catalog",
        navController = navController
    ) {
        ProductList(
            state = viewModel.state,
            onEvent = { event ->
                viewModel.onEvent(event)
            },
        )
    }
}