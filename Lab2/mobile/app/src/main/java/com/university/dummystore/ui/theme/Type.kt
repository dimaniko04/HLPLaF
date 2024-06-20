package com.university.dummystore.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import com.university.dummystore.R

val PoppinsFamily = FontFamily(
    Font(R.font.poppins_light, FontWeight.Light),
    Font(R.font.poppins_regular, FontWeight.Normal),
    Font(R.font.poppins_medium, FontWeight.Medium),
    Font(R.font.poppins_bold, FontWeight.Bold),
    Font(R.font.poppins_extra_bold, FontWeight.ExtraBold)
)

val defaultTypography = Typography()
// Set of Material typography styles to start with
val Typography = Typography(
    displayLarge = defaultTypography.displayLarge.copy(fontFamily = PoppinsFamily),
    displayMedium = defaultTypography.displayMedium.copy(fontFamily = PoppinsFamily),
    displaySmall = defaultTypography.displaySmall.copy(fontFamily = PoppinsFamily),

    headlineLarge = defaultTypography.headlineLarge.copy(fontFamily = PoppinsFamily),
    headlineMedium = defaultTypography.headlineMedium.copy(fontFamily = PoppinsFamily),
    headlineSmall = defaultTypography.headlineSmall.copy(fontFamily = PoppinsFamily),

    titleLarge = defaultTypography.titleLarge.copy(fontFamily = PoppinsFamily),
    titleMedium = defaultTypography.titleMedium.copy(fontFamily = PoppinsFamily),
    titleSmall = defaultTypography.titleSmall.copy(fontFamily = PoppinsFamily),

    bodyLarge = defaultTypography.bodyLarge.copy(fontFamily = PoppinsFamily),
    bodyMedium = defaultTypography.bodyMedium.copy(fontFamily = PoppinsFamily),
    bodySmall = defaultTypography.bodySmall.copy(fontFamily = PoppinsFamily),

    labelLarge = defaultTypography.labelLarge.copy(fontFamily = PoppinsFamily),
    labelMedium = defaultTypography.labelMedium.copy(fontFamily = PoppinsFamily),
    labelSmall = defaultTypography.labelSmall.copy(fontFamily = PoppinsFamily)
)