import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // puede que nunca necesitemos este componente ni su context en realidad, pero uno nunca sabe :v
  return (
    <button onClick={toggleTheme}  className="text-3xl font-bold underline bg-red-200">
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

export default ThemeSwitcher;