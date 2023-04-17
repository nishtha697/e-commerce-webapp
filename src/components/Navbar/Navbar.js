import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../reducers/user-reducer";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const dispatch = useDispatch();
    const { type } = useSelector(state => state.user);
    const [user, setUser] = useState("anon");

    useEffect(() => {
        if (type === 'seller') { setUser("seller") }
        else if (type === 'buyer') { setUser("buyer") }
        else if (type === '') { setUser("anon") }
    }, [type])

    const handleLogout = () => dispatch(logoutUser())

    const navLinks = [
        { title: "Home", path: "/", show: ["anon", "buyer"] },
        { title: "Cart", path: "/cart", show: ["anon", "buyer"] },
        { title: "Login/Register", path: "/login", show: ["anon"] },
        { title: "My Orders", path: "/orders", show: ["buyer"] },
        { title: "Dashboard", path: "/seller/dashboard", show: ["seller"] },
        { title: "Product Listings", path: "/seller/productlistings", show: ["seller"] },
        { title: "Order Shipments", path: "/seller/orders", show: ["seller"] },
        { title: "Profile", path: "/profile", show: ["seller", "buyer"] },
        { title: "Logout", path: "/", show: ["seller", "buyer"], onClickHandler: handleLogout },

    ]

    return (
        <div className="navbar navbar-light bg-light d-flex flex-row justify-content-between" style={{ borderBottom: "1px solid coral" }}>
            <Link className="navbar-brand ms-5" to="">
                E-commerce WebApp
            </Link>

            <div className="d-flex flex-row">

                {navLinks
                    .filter((link) => link.show.includes(user))
                    .map((link) => (
                        <li className="nav nav-item ps-2 pe-2" key={link.title}>
                            <Link
                                className="btn btn-light wd-round-btn"
                                style={{ color: 'coral', textDecoration: 'none' }}
                                to={link.path}
                                onClick={link.onClickHandler}
                            >
                                {link.title}
                            </Link>
                        </li>
                    ))}
            </div>
        </div>

    );
}

export default Navbar;