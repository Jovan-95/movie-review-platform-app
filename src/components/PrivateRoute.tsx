import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "../interfaces";

function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only admin can see admin page
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />; // može i "/403" za Forbidden stranicu
  }

  return children;
}

export default PrivateRoute;
