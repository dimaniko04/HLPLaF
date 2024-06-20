package com.university.dummystore.presentation.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.ClickableText
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import com.university.dummystore.ui.theme.PrimaryBlue

@Composable
fun AnnotatedNavText(
    text: String,
    linkLabel: String,
    onClick: (Int) -> Unit
) {
    val annotatedText = buildAnnotatedString {
        append("$text ")

        withStyle(
            style = SpanStyle(
                color = PrimaryBlue,
                fontWeight = FontWeight.Bold
            )
        ) {
            append(linkLabel)
        }
    }

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.Center
    ) {
        ClickableText(
            text = annotatedText,
            style = MaterialTheme.typography.bodyLarge,
            onClick = onClick
        )
    }
}

