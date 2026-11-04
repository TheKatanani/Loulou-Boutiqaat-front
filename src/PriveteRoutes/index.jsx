import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectIsAuthenticated, selectUser, selectStatus } from "../redux/reducers/auth";
import { STATUS } from "../Actions";
import LogoLoading from "../Components/common/LogoLoading";

const PrivateRoute = ({ requireRole, children }) => {
  const isAuthenticated = useSelector(SelectIsAuthenticated);
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);

  // While checking authentication on page reload / refresh token, show loading instead of prematurely redirecting to login
  if (!isAuthenticated && (status === 'idle' || status === STATUS.LOADING)) {
    return <LogoLoading />;
  }

  const authorized = requireRole.find(r => r === user?.role);
  return isAuthenticated && authorized === user?.role ? (children ? children : <Outlet />) : <Navigate to='/login' />;
};

export default PrivateRoute;
