import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const loggedInUser = Cookies.get("loggedInUser");

  if (loggedInUser) {
    return <Navigate to="/todo" replace />;
  }

  return children;
};

export default PublicRoute;
