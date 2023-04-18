import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import {logger} from "redux-logger";
import shoppingCartReducer from "./reducers/cart-reducers";
import productsReducer from "./reducers/products-reducer.js";
import userReducer from "./reducers/user-reducer.js";
import storage from "redux-persist/lib/storage";
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
}

const store = configureStore(
    {
        reducer: persistReducer(persistConfig, combineReducers({
                                                                   productsData: productsReducer,
                                                                   user: userReducer,
                                                                   shoppingCartData: shoppingCartReducer
                                                               })),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
            .concat(logger)
    });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <App/>
            </PersistGate>
        </Provider>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
