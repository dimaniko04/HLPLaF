import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  text: string;
}

export const HeaderNavLink = ({ to, text }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "flex border-b-2 " +
        (isActive
          ? "border-indigo-600 text-indigo-600"
          : "border-transparent text-gray-700 hover:text-gray-800")
      }
    >
      <button
        type="button"
        className={
          "relative z-10 -mb-px pt-px text-sm font-medium transition-colors duration-200 ease-out"
        }
      >
        {text}
      </button>
    </NavLink>
  );
};
