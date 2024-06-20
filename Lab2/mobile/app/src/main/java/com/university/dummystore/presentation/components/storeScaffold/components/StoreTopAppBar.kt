package com.university.dummystore.presentation.components.storeScaffold.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ExitToApp
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.navigation.NavController
import com.university.dummystore.domain.model.Cart

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StoreTopAppBar(
    title: String,
    cartItemCount: Int,
    onLogout: () -> Unit,
    onOpenDrawer: () -> Unit,
) {
    TopAppBar(
        title = { Text(title) },
        actions = {
            IconButton(onClick = { onLogout() }) {
                Icon(
                    imageVector = Icons.AutoMirrored.Default.ExitToApp,
                    contentDescription = "Logout"
                )
            }

            BadgedBox(
                badge = {
                    if (cartItemCount > 0) {
                        Badge { Text(cartItemCount.toString()) }
                    }
                }
            ) {
                IconButton(
                    onClick = { onOpenDrawer() },
                    enabled = cartItemCount > 0
                ) {
                    Icon(
                        imageVector = Icons.Default.ShoppingCart,
                        contentDescription = "Cart"
                    )
                }
            }
        }
    )
}