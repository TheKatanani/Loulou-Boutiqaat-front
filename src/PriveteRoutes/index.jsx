import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectIsAuthenticated, selectUser } from "../redux/reducers/auth";

const PrivateRoute = ({ requireRole, children }) => {
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const user = useSelector(selectUser) 
  const authorized = requireRole.find(r => r === user?.role)
  return isAuthenticated && authorized === user?.role ? (children ? children : <Outlet />) : <Navigate to='/login' />
};
export default PrivateRoute;