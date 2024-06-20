package com.university.dummystore.presentation.favorite

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.platform.LocalContext
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.university.dummystore.presentation.components.productList.ProductList
import com.university.dummystore.presentation.components.storeScaffold.StoreScaffold
import com.university.dummystore.presentation.utils.Utils
import com.university.dummystore.utils.Event
import com.university.dummystore.utils.EventBus

@Composable
fun FavoriteScreen(
    navController: NavController,
    viewModel: FavoriteViewModel = hiltViewModel(),
) {
    val context = LocalContext.current

    LaunchedEffect(key1 = context, viewModel) {
        viewModel.toFirstPage()
        viewModel.fetchFavorites()
    }

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