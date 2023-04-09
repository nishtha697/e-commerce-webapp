import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../reducers/current-user-reducer";

const Navbar = () => {
    const currentUser = useSelector(state => state.currentUserData.currentUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="navbar navbar-light bg-light">
            <Link className="navbar-brand ms-5" to="">
                E-commerce WebApp
            </Link>
            {(currentUser === null || Object.keys(currentUser).length === 0 || currentUser === undefined) ?

             <div className="nav nav-item me-2">
                <li className="nav nav-item ps-3 pe-2">
                    <Link
                        className="logout wd-logout-btn btn btn-light wd-round-btn" style={{color: "coral", textDecoration: "none"}}
                        to="/login"
                    >
                        Login
                    </Link>
                </li>
                <li className="nav nav-item ps-2 pe-2">
                    <Link
                        className="logout wd-logout-btn btn btn-light wd-round-btn" style={{color: "coral", textDecoration: "none"}}
                        to="/register"
                    >
                        Register
                    </Link>
                </li>
            </div> :
             <div className="nav nav-item me-2">
                 <li className="nav nav-item ps-3 pe-2">
                     <Link
                         className="logout wd-logout-btn btn btn-light wd-round-btn" style={{color: "coral", textDecoration: "none"}}
                         to="/cart"
                     >
                         Cart
                     </Link>
                 </li>
                 <li className="nav nav-item ps-2 pe-2">
                     <button
                         className="logout wd-logout-btn btn btn-light wd-round-btn" style={{color: "coral", textDecoration: "none"}}
                         onClick={handleLogout}
                     >
                         Logout
                     </button>
                 </li>
             </div>}


            {/*<Link to={<Register/>}/>*/}
        </div>
    );
}

export default Navbar;