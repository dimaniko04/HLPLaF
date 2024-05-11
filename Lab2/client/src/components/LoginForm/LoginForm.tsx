import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { InputField } from "../Input";
import { loginFormValidation } from "./utils/LoginFormValidation";
import { useStoreContext } from "../../store";
import { useEffect } from "react";
import { SubmitButton } from "../Buttons";

export const LoginForm = observer(() => {
  const {
    userStore: { login },
    uiStore: { isPosting, setIsPosting, postError, setPostError },
  } = useStoreContext();
  const navigate = useNavigate();

  useEffect(() => {
    return () => setPostError(null);
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginFormValidation}
      onSubmit={async (values, { setSubmitting }) => {
        setIsPosting(true);
        try {
          const { email, password } = values;
          await login(email, password).then(() => navigate("/"));
        } finally {
          setSubmitting(false);
          setIsPosting(false);
        }
      }}
    >
      <Form className="space-y-6">
        <InputField
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />

        {postError && <h1 className="text-red-600">{postError}</h1>}

        <SubmitButton text="Sign in" submitting={isPosting} />
      </Form>
    </Formik>
  );
});
