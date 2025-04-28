import { Navbar, Nav, Container, Button, Dropdown, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import DarkModeToggle from "../components/DarkModeToggle";
import { FaUserCircle } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";

const Header = () => {
  const { user, logout } = useUser();
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          BCard
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2">
          <Form className="d-none d-md-flex">
            <Form.Control
              type="search"
              placeholder="חיפוש..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
              style={{ width: "200px" }}
            />
          </Form>
          <DarkModeToggle />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 align-items-center">
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
                <Nav.Link as={Link} to="/favorites">מועדפים</Nav.Link>

                {user.isBusiness && (
                  <>
                    <Nav.Link as={Link} to="/my-cards">הכרטיסים שלי</Nav.Link>
                    <Nav.Link as={Link} to="/create-card">יצירת כרטיס</Nav.Link>
                  </>
                )}

                {user.isAdmin && (
                  <Nav.Link as={Link} to="/admin">ניהול משתמשים</Nav.Link>
                )}

                <Dropdown align="end">
                  <Dropdown.Toggle as={Button} variant="outline-secondary" className="d-flex align-items-center">
                    <FaUserCircle size={22} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>התנתק</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
