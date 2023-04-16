import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home.js";
import Product from "./components/Home/Product.js";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="w-100 h-100" style={{minHeight: "50vh"}}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </BrowserRouter>

    );
}

export default App;