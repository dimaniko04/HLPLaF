package com.university.dummystore.domain.use_case.auth

data class AuthUseCases (
    val login: Login,
    val register: Register,
    val logout: Logout,
    val refresh: Refresh
)