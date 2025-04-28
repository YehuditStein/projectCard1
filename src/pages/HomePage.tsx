import CardList from '../components/CardList';
import { Container } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">ברוכים הבאים</h1>
        <p className="lead">למערכת ניהול כרטיסי ביקור</p>
      </div>

      <CardList />
    </Container>
  );
};

export default HomePage;
