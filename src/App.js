import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import productsReducer from "./reducers/products-reducer.js";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import Home from "./Home/Home";
import Product from "./Home/Product";
import React from "react";

const store = configureStore(
    {reducer: {productsData: productsReducer}});

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand ms-5" href="#">
                        E-commerce WebApp
                    </a>
                </nav>
                <div className="container">
                    <Routes>
                        <Route index element={<Home/>}/>
                        {/*<Route path="/products/"*/}
                        {/*       element={<HelloWorld/>}/>*/}
                        <Route path="/products/:id" element={ <Product />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
