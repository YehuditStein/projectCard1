import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { isFavorite, toggleFavorite } from "../services/favoriteService";

interface CardItemProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const CardItem = ({ id, title, subtitle, image }: CardItemProps) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavorite((prev) => !prev);
  };

  return (
    <Card className="h-100 shadow-sm card-hover position-relative">
      <Button
        variant="light"
        onClick={handleToggleFavorite}
        className="position-absolute top-0 start-0 m-2 p-2 rounded-circle shadow-sm"
        style={{ zIndex: 1 }}
      >
        {favorite ? <FaHeart color="red" /> : <FaRegHeart />}
      </Button>

      <Card.Img
        variant="top"
        src={image || "https://source.unsplash.com/300x200/?business"}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = "https://source.unsplash.com/300x200/?business";
        }}
      />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text className="text-center text-muted">{subtitle}</Card.Text>
        </div>
        <Button
          variant="primary"
          className="mt-3 w-100"
          onClick={() => navigate(`/card/${id}`)}
        >
          למידע נוסף
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
