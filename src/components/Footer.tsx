import { Container, Nav } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const year = new Date().getFullYear();

  const renderLinks = () => (
    <>
      <Nav.Link as={Link} to="/">דף הבית</Nav.Link>
      <Nav.Link as={Link} to="/about">אודות</Nav.Link>

      {!user && (
        <>
          <Nav.Link as={Link} to="/login">התחברות</Nav.Link>
          <Nav.Link as={Link} to="/register">הרשמה</Nav.Link>
        </>
      )}

      {user && (
        <>
          {user.isAdmin && (
            <Nav.Link as={Link} to="/admin">ניהול משתמשים</Nav.Link>
          )}
          {user.isBusiness && (
            <>
              <Nav.Link as={Link} to="/my-cards">הכרטיסים שלי</Nav.Link>
              <Nav.Link as={Link} to="/create-card">צור כרטיס</Nav.Link>
              <Nav.Link as={Link} to="/favorites">מועדפים</Nav.Link>
            </>
          )}
          {!user.isAdmin && !user.isBusiness && (
            <Nav.Link as={Link} to="/favorites">מועדפים</Nav.Link>
          )}
          <Nav.Link as={Link} to="/logout">התנתקות</Nav.Link>
        </>
      )}
    </>
  );

  return (
    <footer className={`py-3 mt-auto text-center ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Container>
        <Nav className="justify-content-center mb-2">
          {renderLinks()}
        </Nav>
        <small>© {year} כל הזכויות שמורות ל-BCard</small>
      </Container>
    </footer>
  );
};

export default Footer;
