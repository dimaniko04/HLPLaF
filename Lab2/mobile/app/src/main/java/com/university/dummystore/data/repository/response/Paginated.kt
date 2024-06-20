package com.university.dummystore.data.repository.response

data class Paginated<T>(
    val items: List<T>,
    val page: Int,
    val limit: Int,
    val pageCount: Int,
)
