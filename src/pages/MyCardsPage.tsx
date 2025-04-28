import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Card, ButtonGroup, Button } from "react-bootstrap";
import { getMyCards, deleteCard } from "../services/apiService";
import { FaTrash, FaEdit } from "react-icons/fa";

interface CardData {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
}

const MyCardsPage = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await getMyCards();
      setCards(res.data);
    } catch {
      setError("שגיאה בטעינת הכרטיסים שלי");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("בטוח שאת/ה רוצה למחוק את הכרטיס?")) {
      try {
        await deleteCard(id);
        setCards((prev) => prev.filter((card) => card._id !== id));
      } catch {
        alert("שגיאה במחיקת הכרטיס");
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-card/${id}`);
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">הכרטיסים שלי</h1>
      {cards.length === 0 ? (
        <Alert variant="info">לא נמצאו כרטיסים.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {cards.map((card) => (
            <Col key={card._id}>
              <Card className="h-100 shadow-sm card-hover">
                <Card.Img
                  variant="top"
                  src={card.image?.url || "https://source.unsplash.com/300x200/?business"}
                  alt={card.image?.alt || "Business card"}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.subtitle}</Card.Text>
                  <ButtonGroup className="mt-auto justify-content-end">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(card._id)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(card._id)}>
                      <FaTrash />
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyCardsPage;