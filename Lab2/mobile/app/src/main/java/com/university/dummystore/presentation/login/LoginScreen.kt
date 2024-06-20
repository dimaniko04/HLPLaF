package com.university.dummystore.presentation.login

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.university.dummystore.presentation.components.AnnotatedNavText
import com.university.dummystore.presentation.components.InputField
import com.university.dummystore.presentation.components.SubmitButton
import com.university.dummystore.presentation.registration.RegistrationFormEvent
import com.university.dummystore.presentation.utils.Utils
import com.university.dummystore.ui.theme.DarkBlue
import com.university.dummystore.ui.theme.PrimaryBlue
import com.university.dummystore.utils.Event
import com.university.dummystore.utils.EventBus
import com.university.dummystore.utils.Screen

@Composable
fun LoginScreen(
    navController: NavController,
    viewModel: LoginViewModel = hiltViewModel()
) {
    val context = LocalContext.current

    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(key1 = context) {
        Utils.CollectBusEvents(
            snackbarHostState = snackbarHostState,
            navController = navController
        )
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { paddingValues ->
        Column(
            modifier = Modifier.fillMaxSize().padding(paddingValues)
        ) {
            LoginForm(
                navController = navController,
                viewModel = viewModel
            )
        }
    }
}

@Composable
fun LoginForm(
    navController: NavController,
    viewModel: LoginViewModel
) {
    val state = viewModel.state

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .imePadding(),
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            "Login",
            modifier = Modifier.fillMaxWidth(),
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            color = DarkBlue
        )
        Spacer(modifier = Modifier.height(16.dp))
        InputField(
            value = state.email,
            label = "Email",
            error = state.emailError,
            keyboardType = KeyboardType.Email,
            onChange = {
                viewModel.onEvent(
                    LoginFormEvent.EmailChanged(it)
                )
            }
        )
        InputField(
            value = state.password,
            label = "Password",
            error = state.passwordError,
            keyboardType = KeyboardType.Password,
            visualTransformation = PasswordVisualTransformation(),
            onChange = {
                viewModel.onEvent(
                    LoginFormEvent.PasswordChanged(it)
                )
            }
        )
        SubmitButton(
            text = "Login",
            onClick = {
                viewModel.onEvent(
                    LoginFormEvent.Login
                )
            },
            isSubmitting = state.isLoading,
        )
        AnnotatedNavText(
            text = "Don't have an account?",
            linkLabel = "Register",
            onClick = {
                navController.navigate(Screen.RegistrationScreen.route)
            }
        )
    }
}
