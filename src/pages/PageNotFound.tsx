import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead mb-4">אופס! הדף שחיפשת לא קיים.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        חזור לדף הבית
      </Button>
    </Container>
  );
};

export default NotFoundPage;
