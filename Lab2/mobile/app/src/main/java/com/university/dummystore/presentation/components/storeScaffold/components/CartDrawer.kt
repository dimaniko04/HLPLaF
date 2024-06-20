package com.university.dummystore.presentation.components.storeScaffold.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.university.dummystore.R
import com.university.dummystore.domain.model.Cart
import com.university.dummystore.domain.model.CartItem
import com.university.dummystore.presentation.components.SubmitButton
import com.university.dummystore.presentation.shared.CartDataViewModel
import com.university.dummystore.utils.Constants

@Composable
fun CartDrawer(
    cart: Cart,
    isSubmitting: Boolean,
    onCheckout: () -> Unit,
    viewModel: CartDataViewModel
) {
    val totalPrice = cart.items.sumOf { it.quantity * it.product.price }

    Column(modifier = Modifier
        .fillMaxHeight()
        .background(Color.White)
        .padding(16.dp)) {

        Text(text = "Cart", style = MaterialTheme.typography.headlineSmall)

        LazyColumn(modifier = Modifier.weight(1f)) {
            items(cart.items) { cartItem ->
                CartDrawerItem(
                    item = cartItem,
                    onRemove = {
                        viewModel.removeFromCart(cartItem)
                    }
                )
            }
        }

        Column {
            Text(text = "Total = \$$totalPrice", style = MaterialTheme.typography.bodyLarge)
            SubmitButton(
                text = "Checkout",
                onClick = { onCheckout() },
                isSubmitting = isSubmitting
            )
        }
    }
}

@Composable
fun CartDrawerItem(item: CartItem, onRemove: () -> Unit) {
    val totalPrice = item.product.price * item.quantity

    Row(modifier = Modifier
        .fillMaxWidth()
        .padding(vertical = 8.dp)) {
        AsyncImage(
            model = "${Constants.BASE_URL}/${item.product.img}",
            contentDescription = null,
            placeholder = painterResource(R.mipmap.ic_placeholder),
            modifier = Modifier.size(64.dp)
        )

        Spacer(modifier = Modifier.width(8.dp))

        Column(modifier = Modifier.weight(1f)) {
            Text(text = item.product.name, style = MaterialTheme.typography.bodyLarge)
            Text(text = "Quantity: ${item.quantity}", style = MaterialTheme.typography.bodyMedium)
            Text(text = "Total Price: \$${totalPrice}", style = MaterialTheme.typography.bodyMedium)
        }

        IconButton(onClick = { onRemove() }) {
            Icon(imageVector = Icons.Default.Delete, contentDescription = "Remove")
        }
    }
}