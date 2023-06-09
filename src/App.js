import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home.js";
import Product from "./components/Home/Product.js";
import Profile from "./components/Profile/Profile";
import ProductListings from "./components/SellerDashboard/ProductListings";
import NewProduct from "./components/SellerDashboard/NewProduct";
import Cart from "./components/Cart/Cart";
import Order from "./components/OrderShipments/Order";
import ReceivedShipments from "./components/OrderShipments/ReceivedShipments";
import Dashboard from "./components/SellerDashboard/Dashboard";

function App() {

    const user = useSelector(state => state.user)

    return (
        <div style={{ width: "100%" }}>
            <BrowserRouter>
                <Navbar />
                <div className="m-5" style={{ minHeight: "50vh" }}>
                    <Routes>
                        <Route path="/products/:id" element={<Product />} />
                        <Route index element={user.type === "seller" ? <Navigate to="/seller/productlistings" /> : <Home />} />
                        {user.type === "buyer" && <Route path="/cart" element={<Cart />} />}
                        {user.type === "buyer" && <Route path="/orders" element={<Order />} />}
                        {user.type === "seller" && <Route path="/seller/productlistings" element={<ProductListings />} />}
                        {user.type === "seller" && <Route path="/seller/newlisting" element={<NewProduct />} />}
                        {user.type === "seller" && <Route path="/seller/orders" element={<ReceivedShipments />} />}
                        {user.type === "seller" && <Route path="/seller/dashboard" element={<Dashboard />} />}
                        {['buyer', 'seller'].includes(user.type) && <Route path="/profile" element={<Profile />} />}
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<div>INVALID PAGE</div>} />
                    </Routes>
                </div>
            </BrowserRouter>

        </div>
    );
}

export default App;