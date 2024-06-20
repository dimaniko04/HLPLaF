package com.university.dummystore.di

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.core.handlers.ReplaceFileCorruptionHandler
import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.emptyPreferences
import androidx.datastore.preferences.preferencesDataStoreFile
import com.university.dummystore.data.local.CartDataStore
import com.university.dummystore.data.local.TokenDataStore
import com.university.dummystore.data.remote.AuthApi
import com.university.dummystore.data.remote.OrderApi
import com.university.dummystore.data.remote.ProductApi
import com.university.dummystore.data.remote.interceptor.AuthInterceptor
import com.university.dummystore.domain.local.CartManager
import com.university.dummystore.domain.local.TokenManager
import com.university.dummystore.domain.repository.AuthRepository
import com.university.dummystore.domain.repository.OrderRepository
import com.university.dummystore.domain.repository.ProductRepository
import com.university.dummystore.domain.use_case.auth.AuthUseCases
import com.university.dummystore.domain.use_case.auth.Login
import com.university.dummystore.domain.use_case.auth.Logout
import com.university.dummystore.domain.use_case.auth.Refresh
import com.university.dummystore.domain.use_case.auth.Register
import com.university.dummystore.domain.use_case.order.Checkout
import com.university.dummystore.domain.use_case.order.FetchOrders
import com.university.dummystore.domain.use_case.order.OrderUseCases
import com.university.dummystore.domain.use_case.product.FetchFavorites
import com.university.dummystore.domain.use_case.product.FetchProducts
import com.university.dummystore.domain.use_case.product.FetchRecommendations
import com.university.dummystore.domain.use_case.product.ProductUseCases
import com.university.dummystore.domain.use_case.product.ToggleFavorite
import com.university.dummystore.domain.use_case.validation.ValidateConfirmPassword
import com.university.dummystore.domain.use_case.validation.ValidateEmail
import com.university.dummystore.domain.use_case.validation.ValidatePassword
import com.university.dummystore.domain.use_case.validation.ValidationUseCases
import com.university.dummystore.utils.Constants
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.Retrofit.Builder
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideDataStore(
        @ApplicationContext appContext: Context
    ): DataStore<Preferences> {
        return PreferenceDataStoreFactory.create(
            corruptionHandler = ReplaceFileCorruptionHandler(
                produceNewData = { emptyPreferences() }
            ),
            produceFile = {
                appContext.preferencesDataStoreFile(Constants.AUTH_PREFERENCES)
            }
        )
    }

    @Provides
    @Singleton
    fun provideTokenManager(dataStore: DataStore<Preferences>): TokenManager{
        return TokenDataStore(dataStore = dataStore)
    }

    @Provides
    @Singleton
    fun provideCartManager(dataStore: DataStore<Preferences>): CartManager {
        return CartDataStore(dataStore = dataStore)
    }

    @Provides
    @Singleton
    @AuthenticatedClient
    fun provideAuthenticatedOkHttpClient(
        authInterceptor: AuthInterceptor
    ): OkHttpClient {
        val loggingInterceptor = HttpLoggingInterceptor()
        loggingInterceptor.level = HttpLoggingInterceptor.Level.BODY
        return OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .addInterceptor(authInterceptor)
            .build()
    }

    @Provides
    @Singleton
    @PublicClient
    fun providePublicOkHttpClient(): OkHttpClient {
        val loggingInterceptor = HttpLoggingInterceptor()
        loggingInterceptor.level = HttpLoggingInterceptor.Level.BODY
        return OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .build()
    }

    @Provides
    @Singleton
    fun provideAuthInterceptor(
        tokenManager: TokenManager,
        authRepository: AuthRepository
    ): AuthInterceptor {
        return AuthInterceptor(tokenManager, authRepository)
    }

    @Singleton
    @Provides
    fun provideRetrofitBuilder(): Retrofit.Builder =
        Retrofit.Builder()
            .baseUrl(Constants.BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())

    @Provides
    @Singleton
    fun provideAuthApi(
        retrofit: Retrofit.Builder,
        @PublicClient okHttpClient: OkHttpClient
    ): AuthApi {
        return retrofit
            .client(okHttpClient)
            .build()
            .create(AuthApi::class.java)
    }

    @Provides
    @Singleton
    fun provideProductApi(
        retrofit: Builder,
        @AuthenticatedClient okHttpClient: OkHttpClient
    ): ProductApi {
        return retrofit
            .client(okHttpClient)
            .build()
            .create(ProductApi::class.java)
    }

    @Provides
    @Singleton
    fun provideOrderApi(
        retrofit: Builder,
        @AuthenticatedClient okHttpClient: OkHttpClient
    ): OrderApi {
        return retrofit
            .client(okHttpClient)
            .build()
            .create(OrderApi::class.java)
    }

    @Provides
    @Singleton
    fun provideValidationUseCases(): ValidationUseCases {
        return ValidationUseCases(
            validateEmail = ValidateEmail(),
            validatePassword = ValidatePassword(),
            validateConfirmPassword = ValidateConfirmPassword(),
        )
    }

    @Provides
    @Singleton
    fun provideAuthUseCases(
        repository: AuthRepository
    ): AuthUseCases {
        return AuthUseCases(
            login = Login(repository),
            register = Register(repository),
            logout = Logout(repository),
            refresh = Refresh(repository)
        )
    }

    @Provides
    @Singleton
    fun provideProductUseCases(
        repository: ProductRepository
    ): ProductUseCases {
        return ProductUseCases(
            fetchProducts = FetchProducts(repository),
            fetchFavorites = FetchFavorites(repository),
            fetchRecommendations = FetchRecommendations(repository),
            toggleFavorite = ToggleFavorite(repository)
        )
    }

    @Provides
    @Singleton
    fun provideOrderUseCases(
        repository: OrderRepository
    ): OrderUseCases {
        return OrderUseCases(
            fetchOrders = FetchOrders(repository),
            checkout = Checkout(repository)
        )
    }
}