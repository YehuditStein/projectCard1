import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { cardsApi } from "../services/apiService";
import CardItem from "../components/CardItem";
import { getFavoriteIds } from "../services/favoriteService";

interface CardData {
  _id: string;
  title: string;
  subtitle: string;
  image: {
    url: string;
    alt: string;
  };
}

const FavoritesPage = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const allCards = await cardsApi.get("/");
        const favoriteIds = getFavoriteIds();
        const favCards = allCards.data.filter((card: CardData) =>
          favoriteIds.includes(card._id)
        );
        setCards(favCards);
      } catch (err) {
        setError("שגיאה בטעינת כרטיסים מועדפים");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">המועדפים שלי</h2>
      {cards.length === 0 ? (
        <p className="text-center">אין כרטיסים במועדפים.</p>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {cards.map((card) => (
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

export default FavoritesPage;
