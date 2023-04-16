import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../reducers/current-user-reducer";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUserData.currentUser);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const isLoggedIn = () => {
        return !(currentUser === null || Object.keys(currentUser).length === 0 || currentUser === undefined)
    }

    return (
        <div className="navbar navbar-light bg-light">
            <Link className="navbar-brand ms-5" to="">
                E-commerce WebApp
            </Link>

            <li className="nav nav-item ps-2 pe-2">
                <Link
                    className="logout wd-logout-btn btn btn-light wd-round-btn"
                    style={{ color: "coral", textDecoration: "none" }}
                    to="/"
                >
                    Home
                </Link>
            </li>


            {!isLoggedIn() &&
                <li className="nav nav-item ps-2 pe-2">
                    <Link
                        className="logout wd-logout-btn btn btn-light wd-round-btn"
                        style={{ color: "coral", textDecoration: "none" }}
                        to="/login"
                    >
                        Login
                    </Link>
                </li>}

            {!isLoggedIn() &&
                <li className="nav nav-item ps-2 pe-2">
                    <Link
                        className="logout wd-logout-btn btn btn-light wd-round-btn"
                        style={{ color: "coral", textDecoration: "none" }}
                        to="/register"
                    >
                        Register
                    </Link>
                </li>}

            {isLoggedIn() &&
                <li className="nav nav-item ps-2 pe-2">
                    <Link
                        className="logout wd-logout-btn btn btn-light wd-round-btn"
                        style={{ color: "coral", textDecoration: "none" }}
                        to="/cart"
                    >
                        Cart
                    </Link>
                </li>}

            {isLoggedIn() &&
                <li className="nav nav-item ps-2 pe-2">
                    <Link
                        className="logout wd-logout-btn btn btn-light wd-round-btn"
                        style={{ color: "coral", textDecoration: "none" }}
                        to="/profile"
                    >
                        Profile
                    </Link>
                </li>}

            {isLoggedIn() &&
                <li className="nav nav-item ps-2 pe-2">
                    <Link
                        className="logout wd-logout-btn btn btn-light wd-round-btn"
                        style={{ color: "coral", textDecoration: "none" }}
                        onClick={handleLogout}
                        to="/"
                    >
                        Logout
                    </Link>
                </li>}

        </div>

    );
}

export default Navbar;