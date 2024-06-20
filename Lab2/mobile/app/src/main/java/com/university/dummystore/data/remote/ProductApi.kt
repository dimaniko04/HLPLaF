package com.university.dummystore.data.remote

import com.university.dummystore.data.repository.response.Paginated
import com.university.dummystore.domain.model.Product
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface ProductApi {
    @GET("product")
    suspend fun fetchProducts(
        @Query("page") page: Int,
        @Query("limit") limit: Int,
    ): Paginated<Product>

    @GET("favorite")
    suspend fun fetchFavorite(
        @Query("page") page: Int,
        @Query("limit") limit: Int
    ): Paginated<Product>

    @POST("favorite/{productId}")
    suspend fun addFavorite(
        @Path("productId") productId: Int
    )

    @DELETE("favorite/{productId}")
    suspend fun removeFavorite(
        @Path("productId") productId: Int
    )

    @GET("recommendations")
    suspend fun fetchRecommendations(): List<Product>
}