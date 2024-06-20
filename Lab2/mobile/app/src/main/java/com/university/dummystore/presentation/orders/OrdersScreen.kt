package com.university.dummystore.presentation.orders

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.university.dummystore.R
import com.university.dummystore.domain.model.Order
import com.university.dummystore.domain.model.OrderDetail
import com.university.dummystore.presentation.components.storeScaffold.StoreScaffold
import com.university.dummystore.utils.Constants
import java.text.SimpleDateFormat
import java.util.Locale

@Composable
fun OrdersScreen(
    navController: NavController,
    viewModel: OrderViewModel = hiltViewModel()
) {
    val state = viewModel.state

    StoreScaffold(
        title = "Order history",
        navController = navController
    ) {
        Column(modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)) {
            LazyColumn(modifier = Modifier.weight(1f)) {
                items(state.orders) { order ->
                    OrderItem(order = order)
                }
                item {
                    if (state.isLoading) {
                        CircularProgressIndicator()
                    } else if (state.hasNext && state.orders.isNotEmpty()) {
                        viewModel.loadMore()
                    }
                }
            }
        }
    }
}

@Composable
fun OrderItem(order: Order) {
    val totalPrice = order.orderDetails.sumOf {
        it.product.price * it.quantity
    }
    val format = SimpleDateFormat("dd.MM.yyy", Locale.getDefault())
    val dateString = format.format(order.createdAt)

    Column(modifier = Modifier
        .fillMaxWidth()
        .padding(vertical = 8.dp)) {

        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = dateString)
            Text(
                text = order.status,
                style = TextStyle(fontWeight = FontWeight.Bold)
            )
            Text(text = "\$$totalPrice")
        }

        Spacer(modifier = Modifier.height(8.dp))

        Column(modifier = Modifier.padding(start = 16.dp)) {
            order.orderDetails.map {
                ProductItem(orderDetail = it)
            }
        }

        HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
    }
}

@Composable
fun ProductItem(orderDetail: OrderDetail) {
    val product = orderDetail.product
    val totalPrice = orderDetail.quantity * orderDetail.product.price

    Row(modifier = Modifier
        .fillMaxWidth()
        .padding(vertical = 4.dp)) {
        AsyncImage(
            model = "${Constants.BASE_URL}/${product.img}",
            contentDescription = null,
            placeholder = painterResource(R.mipmap.ic_placeholder),
            modifier = Modifier.size(64.dp)
        )

        Spacer(modifier = Modifier.width(8.dp))

        Column {
            Text(
                text = product.name,
                style = MaterialTheme.typography.bodyLarge
            )
            Text(
                text = "Quantity: ${orderDetail.quantity}",
                style = MaterialTheme.typography.bodyMedium
            )
            Text(
                text = "Total Price: \$${totalPrice}",
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}