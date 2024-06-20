package com.university.dummystore

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.university.dummystore.presentation.catalog.ProductCatalogScreen
import com.university.dummystore.presentation.favorite.FavoriteScreen
import com.university.dummystore.presentation.loading.LoadingScreen
import com.university.dummystore.presentation.login.LoginScreen
import com.university.dummystore.presentation.orders.OrdersScreen
import com.university.dummystore.presentation.registration.RegistrationScreen
import com.university.dummystore.utils.Screen

@Composable
fun Navigation() {
    val navController = rememberNavController()

    NavHost(navController, startDestination = Screen.LoadingScreen.route) {
        composable(Screen.LoadingScreen.route) {
            LoadingScreen(navController)
        }
        composable(Screen.LoginScreen.route) {
            LoginScreen(navController)
        }
        composable(Screen.RegistrationScreen.route) {
            RegistrationScreen(navController)
        }
        composable(Screen.ProductScreen.route) {
            ProductCatalogScreen(navController)
        }
        composable(Screen.FavoriteScreen.route) {
            FavoriteScreen(navController)
        }
        composable(Screen.OrderScreen.route) {
            OrdersScreen(navController)
        }
    }
}