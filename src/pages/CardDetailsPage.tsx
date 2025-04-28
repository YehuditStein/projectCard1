import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { cardsApi } from "../services/apiService";

interface CardData {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
    _id: string;
  };
  phone: string;
  image: {
    url: string;
    alt: string;
  };
}

const CardDetailsPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cardsApi
      .get(`/${id}`)
      .then((res) => setCard(res.data))
      .catch(() => setError("שגיאה בטעינת פרטי הכרטיס"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  if (!card) {
    return null;
  }

  const { street, houseNumber, city, zip } = card.address;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Img
              variant="top"
              src={card.image?.url || "https://source.unsplash.com/600x400/?business"}
              alt={card.image?.alt || "Business Card"}
              onError={(e) => {
                e.currentTarget.src = "https://source.unsplash.com/600x400/?business";
              }}
              style={{ objectFit: "cover", height: "280px" }}
            />
            <Card.Body>
              <h2 className="text-center mb-3 fw-bold">{card.title}</h2>
              <h5 className="text-center text-muted mb-4">{card.subtitle}</h5>

              <Card.Text className="text-center mb-4 border-top pt-3">
                {card.description}
              </Card.Text>

              <div className="border-top pt-3">
                <p className="mb-2"><strong>כתובת:</strong> {street} {houseNumber}, {city}, {zip}</p>
                <p className="mb-0"><strong>טלפון:</strong> {card.phone}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CardDetailsPage;
