import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "../interfaces";

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
