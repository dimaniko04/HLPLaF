package com.university.dummystore.presentation.utils

import androidx.compose.material3.SnackbarHostState
import androidx.navigation.NavController
import com.university.dummystore.utils.Event
import com.university.dummystore.utils.EventBus

object Utils {
    @JvmStatic
    suspend fun CollectBusEvents(
        navController: NavController,
        snackbarHostState: SnackbarHostState,
    ) {
        EventBus.events.collect { event ->
            when(event) {
                is Event.SnackbarEvent -> {
                    snackbarHostState.showSnackbar(
                        message = event.message
                    )
                }
                is Event.NavigateEvent -> {
                    navController.navigate(event.route)
                }
            }
        }
    }
}