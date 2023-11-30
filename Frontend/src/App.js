import './App.css';
import { Routes,Route } from "react-router-dom"
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotound from './pages/Pagenotound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './Components/Route/Private';
import Forgotpassword from './pages/Auth/Forgotpassword';
import AdminRoute from './Components/Route/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Createcategory from './pages/Admin/Createcategory';
import Createproduct from './pages/Admin/Createproduct';
import User from './pages/Admin/User';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';



function App() {
  return (
    <div className="App">
       <Routes>
<Route path="/"  element={<Home/>}/>
<Route path="/Product/:slug"  element={<ProductDetail/>}/>
<Route path="/categories"  element={<Categories/>}/>
<Route path="/cart"  element={<CartPage/>}/>
<Route path="/category/:slug"  element={<CategoryProduct/>}/>
<Route path="/search"  element={<Search/>}/>
<Route path="/dashboard"  element={<PrivateRoute/>}>
<Route path="user"  element={<Dashboard/>}/>
<Route path="user/profile"  element={<Profile/>}/>
<Route path="user/orders"  element={<Orders/>}/>
  </Route>

  <Route path="/dashboard"  element={<AdminRoute/>}>
<Route path="admin"  element={<AdminDashboard/>}/>
<Route path="admin/create-category"  element={<Createcategory/>}/>
<Route path="admin/create-product"  element={<Createproduct/>}/>
<Route path="admin/product/:slug"  element={<UpdateProduct/>}/>
<Route path="admin/products"  element={<Products/>}/>
<Route path="admin/users"  element={<User/>}/>
<Route path="admin/orders"  element={<AdminOrders/>}/>

  </Route>

<Route path="/About"  element={<About/>}/>
<Route path="/Contact"  element={<Contact/>}/>
<Route path="/Policy"  element={<Policy/>}/>
<Route path="*"  element={<Pagenotound/>}/>
<Route path="Register"  element={<Register/>}/>
<Route path="Register"  element={<Register/>}/>
<Route path="forgot-password"  element={<Forgotpassword/>}/>
<Route path="/login"  element={<Login/>}/>
    </Routes>
   
     
    </div>
  );
}

export default App;
