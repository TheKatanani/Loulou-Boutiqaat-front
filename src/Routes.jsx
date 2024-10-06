import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { ROLES } from "./Actions";

import { useSelector } from "react-redux";
import { SelectIsAuthenticated } from "./redux/reducers/auth";

import PageNotFound from "./Components/PageNotFound";
import LogoLoading from "./Components/common/LogoLoading";
import Layout from "./Components/Layout";
import ErrorBoundary from "./Components/common/Errorboundary";
// import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOTP from "./Pages/ForgotPassword/VerifyOTP";
import UpdateUserInfo from "./Pages/Profile/UpdateInfo";
const Contactus = lazy(() => import("./Pages/ForgotPassword/Contactus"));
const CategoryProducts = lazy(() => import("./Pages/Dashboard/AddCategory/CategoryProducts"));
// const UpdateUserInfo = lazy(() => import("./Pages/Profile/UpdateInfo"));
const Orders = lazy(() => import("./Pages/Dashboard/Orders"));
const UserOrders = lazy(() => import("./Pages/Orders"));
const Categories = lazy(() => import("./Pages/Categories"));
const Category = lazy(() => import("./Pages/Category"));
const Product = lazy(() => import("./Pages/Product"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const AddCategory = lazy(() => import("./Pages/Dashboard/AddCategory"));
const AddProduct = lazy(() => import("./Pages/Dashboard/AddProduct"));
const AddUser = lazy(() => import("./Pages/Dashboard/AddUser"));
const AddSocial = lazy(() => import("./Pages/Dashboard/AddSocial"));
const Profile = lazy(() => import("./Pages/Profile"));
const Home = lazy(() => import("./Pages/Home"));
const Search = lazy(() => import("./Pages/Search"));
const Saved = lazy(() => import("./Pages/Saved"));
const Cart = lazy(() => import("./Pages/Cart"));
const Register = lazy(() => import("./Pages/Register"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const PrivateRoute = lazy(() => import("./PriveteRoutes"));

const MyRoutes = () => {
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  return (
    <Suspense fallback={<LogoLoading />}>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <SignIn />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/forgotPassword"
          element={<Layout />}
        // element={<ForgotPassword />}
        >
          <Route
            index
            element={<Contactus />}
          // element={<ForgotPassword />}
          />

        </Route>

        <Route
          path="/verifyOTP"
          element={<VerifyOTP />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requireRole={[ROLES.ADMIN, ROLES.EDITOR]}>
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            </PrivateRoute>
          }>
          <Route
            index
            element={
              <ErrorBoundary>
                <AddProduct />
              </ErrorBoundary>
            } />
          <Route
            path="addcategory"
          >
            <Route index element={
              <ErrorBoundary>
                <AddCategory />
              </ErrorBoundary>
            } />
            <Route path=":categoryId"
              element={<CategoryProducts />}
            />
          </Route>
          <Route
            path="addUser"
            element={<PrivateRoute requireRole={[ROLES.ADMIN]}>
              <ErrorBoundary>
                <AddUser />
              </ErrorBoundary>
            </PrivateRoute>} />
          <Route
            path="addSocial"
            element={
              <ErrorBoundary>
                <AddSocial />
              </ErrorBoundary>
            } />
          <Route
            path="orders"
            element={
              <ErrorBoundary>
                <Orders />
              </ErrorBoundary>
            } />
        </Route>
        <Route index element={<Navigate to='/home' />} />
        <Route path="home" element={
          <ErrorBoundary>
            <Layout />
          </ErrorBoundary>
        }>
          <Route index element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          } />
          <Route path="الأقسام">
            <Route index element={
              <ErrorBoundary>
                <Categories />
              </ErrorBoundary>
            } />
            <Route path=":categoryId" element={
              <ErrorBoundary>
                <Category />
              </ErrorBoundary>
            } />
          </Route>
          <Route path="products">
            <Route index element={
              <ErrorBoundary>
                <Categories />
              </ErrorBoundary>
            } />
            <Route path=":productId" element={
              <ErrorBoundary>
                <Product />
              </ErrorBoundary>
            } />
          </Route>
          <Route path="search" element={
            <ErrorBoundary>
              <Search />
            </ErrorBoundary>
          } />
          <Route path="profile" element={<PrivateRoute requireRole={[ROLES.USER, ROLES.ADMIN, ROLES.EDITOR]} />}>
            <Route index element={
              <ErrorBoundary>
                <Profile />
              </ErrorBoundary>
            } />
            <Route path="updateUserInfo/:id" element={
              <ErrorBoundary>
                <UpdateUserInfo />
              </ErrorBoundary>
            } />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="saved" element={
            <ErrorBoundary>
              <Saved />
            </ErrorBoundary>
          } />
          <Route path="cart" element={<PrivateRoute requireRole={[ROLES.USER, ROLES.ADMIN, ROLES.EDITOR]} />}>
            <Route index element={
              <ErrorBoundary>
                <Cart />
              </ErrorBoundary>
            } />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="orders" element={<PrivateRoute requireRole={[ROLES.USER, ROLES.ADMIN, ROLES.EDITOR]} />}>
            <Route index element={
              <ErrorBoundary>
                <UserOrders />
              </ErrorBoundary>
            } />
          </Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
export default MyRoutes;
