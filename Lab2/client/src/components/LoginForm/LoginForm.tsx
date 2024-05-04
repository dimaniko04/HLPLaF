import { InputField } from "../Input";

export const LoginForm = () => {
  return (
    <form className="space-y-6" action="#" method="POST">
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

      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </form>
  );
};
