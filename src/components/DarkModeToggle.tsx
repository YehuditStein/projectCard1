
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline-secondary"
      onClick={toggleTheme}
      className="rounded-circle p-2 d-flex align-items-center justify-content-center"
      style={{ width: "40px", height: "40px" }}
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </Button>
  );
};

export default DarkModeToggle;
