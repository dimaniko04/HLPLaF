package com.university.dummystore.presentation.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.university.dummystore.ui.theme.PrimaryBlue

@Composable
fun SubmitButton(
    text: String,
    onClick: () -> Unit,
    isSubmitting: Boolean
) {
    Button(
        modifier = Modifier
            .fillMaxWidth()
            .height(89.dp)
            .padding(vertical = 16.dp),
        shape = RoundedCornerShape(5.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = PrimaryBlue
        ),
        onClick = { onClick() }
    ) {
        if (isSubmitting)
            CircularProgressIndicator()
        else
            Text(text, fontSize = 16.sp)
    }
}