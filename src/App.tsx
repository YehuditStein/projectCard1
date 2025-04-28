import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CardDetailsPage from './pages/CardDetailsPage';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer'; // ✨ חדש!
import MyCardsPage from './pages/MyCardsPage';
import PrivateRoute from './components/PrivateRoute';
import CreateCardPage from './pages/CreateCardPage';
import { ThemeProvider } from './context/ThemeContext';
import FavoritesPage from './pages/FavoritesPage';
import { SearchProvider } from './context/SearchContext';
import NotFoundPage from './pages/PageNotFound';
import AboutPage from './pages/AboutPage';

const App = () => {
  return (
    <ThemeProvider>
      <SearchProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/card/:id" element={<CardDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route
              path="/my-cards"
              element={
                <PrivateRoute businessOnly>
                  <MyCardsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-card"
              element={
                <PrivateRoute>
                  <CreateCardPage />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
<Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
      </SearchProvider>
    </ThemeProvider>
  );
};

export default App;
