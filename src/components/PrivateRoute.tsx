

import { JSX } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  businessOnly?: boolean;
  adminOnly?: boolean;
}

const PrivateRoute = ({ children, businessOnly, adminOnly }: PrivateRouteProps) => {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" replace />;
  if (businessOnly && !user.isBusiness) return <Navigate to="/" replace />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
