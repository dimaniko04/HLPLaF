package com.university.dummystore.utils

import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.receiveAsFlow

object EventBus {
    private val _events = Channel<Any>()
    val events = _events.receiveAsFlow()

    suspend fun sendEvent(event: Any) {
        _events.send(event)
    }
}

sealed interface Event {
    data class SnackbarEvent(val message: String): Event
    data class NavigateEvent(val route: String): Event
    data object UpdateRecommendationsEvent: Event
    data object UpdateFavoritesEvent: Event
    data object UpdateOrdersEvent: Event
}