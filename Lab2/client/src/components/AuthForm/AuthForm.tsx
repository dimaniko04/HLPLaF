import { Form, Formik } from "formik";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { InputField } from "../Input";
import { loginFormValidation } from "./utils/LoginFormValidation";
import { useStoreContext } from "../../store";
import { SubmitButton } from "../Buttons";
import { registrationFormValidation } from "./utils/RegistrationFormValidation";

interface Props {
  mode: "login" | "registration";
}

export const AuthForm = observer(({ mode }: Props) => {
  const {
    userStore: { login, registration },
    uiStore: { isPosting, postError, setPostError },
  } = useStoreContext();

  useEffect(() => {
    return () => setPostError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLogin = mode === "login";
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        isLogin ? loginFormValidation : registrationFormValidation
      }
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { email, password } = values;
          if (isLogin) {
            await login(email, password);
          } else {
            await registration(email, password);
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ touched, errors }) => (
        <Form className="space-y-6">
          <InputField
            name="email"
            label="Email address"
            type="email"
            autoComplete={isLogin ? "email" : undefined}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            autoComplete={isLogin ? "current-password" : undefined}
          />
          {!isLogin && touched["password"] && !errors["password"] && (
            <InputField
              label="Confirm password"
              name="confirmPassword"
              type="password"
            />
          )}

          {postError && <h1 className="text-red-600">{postError}</h1>}

          <SubmitButton
            text={isLogin ? "Sign in" : "Register"}
            submitting={isPosting}
          />
        </Form>
      )}
    </Formik>
  );
});
