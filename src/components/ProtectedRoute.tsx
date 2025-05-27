import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const loggedInUser = Cookies.get("loggedInUser");

  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
