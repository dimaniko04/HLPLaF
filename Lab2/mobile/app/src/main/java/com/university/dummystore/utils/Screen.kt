package com.university.dummystore.utils

sealed class Screen(val route: String) {
    data object LoadingScreen: Screen("loading_screen")
    data object LoginScreen: Screen("login_screen")
    data object RegistrationScreen: Screen("registration_screen")
    data object ProductScreen: Screen("product_screen")
    data object FavoriteScreen: Screen("favorite_screen")
    data object OrderScreen: Screen("order_screen")
    data object CheckoutScreen: Screen("checkout_screen")
}