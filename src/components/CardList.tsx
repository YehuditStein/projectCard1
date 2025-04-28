import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import CardItem from './CardItem';
import { cardsApi } from '../services/apiService';
import { useSearch } from "../context/SearchContext";

interface CardData {
  _id: string;
  title: string;
  subtitle: string;
  image: {
    url: string;
    alt: string;
  };
}

const CardList = () => {
  const { searchTerm } = useSearch();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cardsApi.get("/")
      .then((res) => {
        setCards(res.data);
      })
      .catch(() => setError('שגיאה בטעינת כרטיסים'))
      .finally(() => setLoading(false));
  }, []);

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      {filteredCards.length === 0 ? (
        <Alert variant="info" className="text-center">
          לא נמצאו כרטיסים תואמים לחיפוש.
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {filteredCards.map((card) => (
            <Col key={card._id}>
              <CardItem
                id={card._id}
                title={card.title}
                subtitle={card.subtitle}
                image={card.image.url}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CardList;
