package com.university.dummystore.presentation.components.storeScaffold

import androidx.activity.ComponentActivity
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DismissibleDrawerSheet
import androidx.compose.material3.DismissibleNavigationDrawer
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.NavController
import com.university.dummystore.domain.model.Cart
import com.university.dummystore.presentation.components.storeScaffold.components.CartDrawer
import com.university.dummystore.presentation.components.storeScaffold.components.StoreBottomAppBar
import com.university.dummystore.presentation.components.storeScaffold.components.StoreTopAppBar
import com.university.dummystore.presentation.shared.CartDataViewModel
import com.university.dummystore.presentation.utils.Utils
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.supervisorScope

@Composable fun StoreScaffold(
    title: String,
    navController: NavController,
    viewModel: StoreScaffoldViewModel = hiltViewModel(),
    content: @Composable (() -> Unit),
) {
    val cartDataViewModel = ViewModelProvider(
        LocalContext.current as ComponentActivity
    )[CartDataViewModel::class.java]
    val cart = cartDataViewModel.cartState.collectAsState(
        initial = Cart(listOf())
    )

    val scope = rememberCoroutineScope()
    val context = LocalContext.current
    val drawerState = rememberDrawerState(
        initialValue = DrawerValue.Closed
    )
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(key1 = context) {
        Utils.CollectBusEvents(
            snackbarHostState = snackbarHostState,
            navController = navController
        )
    }

    DismissibleNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet {
                CartDrawer(
                    cart = cart.value,
                    viewModel = cartDataViewModel,
                    onCheckout = {
                        viewModel.checkout(cart.value) {
                            cartDataViewModel.clearCart()
                            scope.launch {
                                drawerState.apply {
                                    if (isClosed) open() else close()
                                }
                            }
                        }
                    },
                    isSubmitting = viewModel.isSubmitting.value
                )
            }
        }
    ) {
        Scaffold(
            topBar = {
                StoreTopAppBar(
                    title = title,
                    onOpenDrawer = {
                        scope.launch {
                            drawerState.apply {
                                if (isClosed) open() else close()
                            }
                        }
                    },
                    onLogout = {
                        viewModel.logout {
                            cartDataViewModel.clearCart()
                        }
                    },
                    cartItemCount = cart.value.items.sumOf { it.quantity }
                )
            },
            bottomBar = {
                StoreBottomAppBar(navController)
            },
            snackbarHost = { SnackbarHost(snackbarHostState) }
        ) { paddingValues ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(
                        top = paddingValues.calculateTopPadding(),
                        bottom = paddingValues.calculateBottomPadding()
                    )
            ) {
                content()
            }
        }
    }
}