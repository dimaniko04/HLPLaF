package com.university.dummystore.presentation.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.university.dummystore.ui.theme.LightGrey
import com.university.dummystore.ui.theme.NeutralGrey
import com.university.dummystore.ui.theme.PrimaryBlue
import com.university.dummystore.ui.theme.PrimaryRed

@Composable
fun InputField(
    value: String,
    label: String,
    onChange: (String) -> Unit,
    error: String? = null,
    keyboardType: KeyboardType = KeyboardType.Text,
    visualTransformation: VisualTransformation = VisualTransformation.None
) {
    OutlinedTextField(
        value = value,
        onValueChange = onChange,
        label = { Text(label) },
        shape = RoundedCornerShape(5.dp),
        isError = error != null,
        colors = OutlinedTextFieldDefaults.colors(
            unfocusedLabelColor = NeutralGrey,
            unfocusedBorderColor = LightGrey,
            focusedBorderColor = PrimaryBlue,
            errorBorderColor = PrimaryRed,
        ),
        visualTransformation = visualTransformation,
        keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
    )
    if (error != null) {
        Text(
            text = error,
            color = PrimaryRed,
            textAlign = TextAlign.End
        )
    }
}