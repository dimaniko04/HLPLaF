package com.university.dummystore.presentation.components.productList

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.university.dummystore.R
import com.university.dummystore.domain.model.Product
import com.university.dummystore.utils.Constants

@Composable
fun ProductListItem(
    product: Product,
    addToCart: () -> Unit,
    toggleFavorite: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable { toggleFavorite() },
        verticalAlignment = Alignment.CenterVertically
    ) {
        AsyncImage(
            model = "${Constants.BASE_URL}/${product.img}",
            contentDescription = null,
            placeholder = painterResource(R.mipmap.ic_placeholder),
            modifier = Modifier.size(64.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(
                product.name,
                style = MaterialTheme.typography.headlineSmall
            )
            Text(
                product.price.toString(),
                style = MaterialTheme.typography.bodyLarge
            )
        }
        Icon(
            imageVector =
            if (product.isFavorite)
                Icons.Default.Favorite
            else
                Icons.Default.FavoriteBorder,
            contentDescription = null
        )
        Button(onClick = { addToCart() }) {
            Text("Add to Cart")
        }
    }
}