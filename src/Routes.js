import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { ROLES } from "./Actions";

import { useSelector } from "react-redux";
import { SelectIsAuthenticated } from "./redux/reducers/auth";

import PageNotFound from "./Components/PageNotFound"; 
import LogoLoading from "./Components/common/LogoLoading"; 
import Layout from "./Components/Layout"; 

const Catigories = lazy(()=> import("./Pages/Catigories"));
const Catigory = lazy(()=> import("./Pages/Catigory"));
const Product = lazy(()=> import("./Pages/Product"));
const Dashboard = lazy(()=> import("./Pages/Dashboard"));
const AddCatigory = lazy(()=> import("./Pages/Dashboard/AddCatigory"));
const AddProduct = lazy(()=> import("./Pages/Dashboard/AddProduct"));
const AddUser = lazy(()=> import("./Pages/Dashboard/AddUser"));
const AddSocial = lazy(()=> import("./Pages/Dashboard/AddSocial"));
const Profile = lazy(()=> import("./Pages/Profile"));
const UpdateInfo = lazy(()=> import("./Pages/Profile/UpdateInfo"));
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
          path="/dashboard"
          element={<PrivateRoute requireRole={[ROLES.ADMIN,ROLES.MANAGER]}><Dashboard/></PrivateRoute>}>
          <Route
          index
          element={<AddProduct/>}/>
          <Route
          path="addCatigory"
          element={<AddCatigory/>}/>
          <Route
          path="addUser"
          element={<PrivateRoute requireRole={[ROLES.MANAGER]}>
            <AddUser/></PrivateRoute>}/>
          <Route
          path="addSocial"
          element={<AddSocial/>}/>
        </Route>
        
        <Route index element={<Navigate to='/home'/>}/>
        <Route path="home" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="catigories">
            <Route index element={<Catigories />} />
            <Route path=":catigory" element={<Catigory />} /> 
          </Route>
          <Route path="products">
            <Route index element={<Catigories />} />
            <Route path=":product" element={<Product />} /> 
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<PrivateRoute requireRole={[ROLES.USER,ROLES.ADMIN,ROLES.MANAGER]}/>}>
            <Route index element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Route> 
          <Route path="updateInfo" element={<PrivateRoute requireRole={[ROLES.USER,ROLES.ADMIN,ROLES.MANAGER]}/>}>
            <Route index element={<UpdateInfo />} />
            <Route path="*" element={<PageNotFound />} />
          </Route> 
          <Route path="saved" element={<Saved />} />
          <Route path="cart" element={<PrivateRoute requireRole={[ROLES.USER,ROLES.ADMIN,ROLES.MANAGER]}/>}>
            <Route index element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
export default MyRoutes;
