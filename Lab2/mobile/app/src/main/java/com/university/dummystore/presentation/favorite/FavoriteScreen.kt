package com.university.dummystore.presentation.favorite

import androidx.compose.runtime.Composable
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.university.dummystore.presentation.components.productList.ProductList
import com.university.dummystore.presentation.components.storeScaffold.StoreScaffold

@Composable
fun FavoriteScreen(
    navController: NavController,
    viewModel: FavoriteViewModel = hiltViewModel(),
) {
    StoreScaffold(
        title = "Favorites",
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