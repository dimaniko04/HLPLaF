package com.university.dummystore.di

import com.university.dummystore.data.repository.AuthRepositoryImpl
import com.university.dummystore.data.repository.OrderRepositoryImpl
import com.university.dummystore.data.repository.ProductRepositoryImpl
import com.university.dummystore.domain.repository.AuthRepository
import com.university.dummystore.domain.repository.OrderRepository
import com.university.dummystore.domain.repository.ProductRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun provideAuthRepository(
        impl: AuthRepositoryImpl
    ): AuthRepository

    @Binds
    @Singleton
    abstract fun provideProductRepository(
        impl: ProductRepositoryImpl
    ): ProductRepository

    @Binds
    @Singleton
    abstract fun provideOrderRepository(
        impl: OrderRepositoryImpl
    ): OrderRepository
}