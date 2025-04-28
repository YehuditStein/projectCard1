# Business Card Management System - React Project

## Project Description
This project is a React web application for managing business cards. It includes full user authentication, authorization, content management (CRUD operations), dark mode, favorites, and a responsive modern UI.

## Main Technologies

- React
- TypeScript
- Vite
- Bootstrap, React-Bootstrap
- Formik & Yup for form validation
- Axios for API communication
- React Router Dom for navigation
- React-toastify for user notifications
- React-icons for icons

## Key Features

- **User Registration and Login** with token management and role-based permissions
- **Full CRUD system** for managing business cards (Create, Read, Update, Delete)
- "My Cards" page to manage user-created cards
- **Favorite cards** feature and Favorites page
- **Dynamic search** for cards
- **Responsive Design** for mobile, tablet, and desktop
- **Dark Mode** toggle

## Installation and Local Setup

Run the following commands in the project root:

```bash
npm install
npm run dev
```

## Environment Variables Setup

Create a `.env` file in the project root with the following content:

```env
VITE_CARDS_API="https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
VITE_USERS_API="https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users"
```

## Project Structure

The project is organized clearly into components, pages, services, contexts, and styles for easy readability and maintenance.

```
src/
├── components/
├── pages/
├── services/
├── contexts/
├── utils/
├── App.tsx
├── main.tsx
└── index.css
```

## API Calls

All HTTP requests are managed with Axios, with centralized services for organization and error handling for better user experience.

## Contact

For any questions, feel free to contact me through GitHub.

---




  
