package com.university.dummystore.data.local

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import com.university.dummystore.domain.local.TokenManager
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import javax.inject.Inject

class TokenDataStore @Inject constructor(
    private val dataStore: DataStore<Preferences>
): TokenManager {
    companion object {
        val ACCESS_TOKEN = stringPreferencesKey("access_token")
        val REFRESH_TOKEN = stringPreferencesKey("refresh_token")
    }

    override suspend fun saveAccessToken(token: String) {
        dataStore.edit { pref ->
            pref[ACCESS_TOKEN] = token
        }
    }

    override suspend fun getAccessToken(): String? {
        return dataStore.data.map { pref ->
            pref[ACCESS_TOKEN]
        }.first()
    }

    override suspend fun saveRefreshToken(token: String) {
        dataStore.edit { pref ->
            pref[REFRESH_TOKEN] = token
        }
    }

    override suspend fun getRefreshToken(): String? {
        return dataStore.data.map { pref ->
            pref[REFRESH_TOKEN]
        }.first()
    }

    override suspend fun clearAllTokens() {
        dataStore.edit { pref ->
            pref.remove(ACCESS_TOKEN)
            pref.remove(REFRESH_TOKEN)
        }
    }
}