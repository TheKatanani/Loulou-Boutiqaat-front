import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectIsAuthenticated, selectUser } from "../redux/reducers/auth";

const PrivateRoute = ({ requireRole, children }) => {
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const { role } = useSelector(selectUser)
  const authorized = requireRole.find(r => r === role)
  return isAuthenticated && authorized === role ? (children ? children : <Outlet />) : <Navigate to='/login' />
};
export default PrivateRoute;