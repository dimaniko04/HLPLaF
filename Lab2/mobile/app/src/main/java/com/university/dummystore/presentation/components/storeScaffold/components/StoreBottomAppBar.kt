package com.university.dummystore.presentation.components.storeScaffold.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.List
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.rememberVectorPainter
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.university.dummystore.utils.Screen

data class StoreScaffoldScreen(
    val route: String,
    val title: String,
    val icon: ImageVector
)

@Composable
fun StoreBottomAppBar(
    navController: NavController,
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val screens = listOf(
        StoreScaffoldScreen(Screen.ProductScreen.route, "Catalog", Icons.Default.Star),
        StoreScaffoldScreen(Screen.FavoriteScreen.route, "Favorites", Icons.Default.Favorite),
        StoreScaffoldScreen(Screen.OrderScreen.route, "Orders", Icons.AutoMirrored.Filled.List)
    )

    BottomAppBar {
        screens.forEach { screen ->
            NavigationBarItem(
                icon = {
                    Icon(
                        painter = rememberVectorPainter(image = screen.icon),
                        contentDescription = screen.title
                    ) },
                label = { Text(screen.title) },
                selected = currentRoute == screen.route,
                onClick = {
                    if (currentRoute != screen.route) {
                        navController.navigate(screen.route) {
                            launchSingleTop = true
                            restoreState = true
                            popUpTo(navController.graph.startDestinationId) {
                                saveState = true
                            }
                        }
                    }
                }
            )
        }
    }
}