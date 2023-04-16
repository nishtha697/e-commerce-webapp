import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { findBuyerByUsernameAndPasswordThunk } from "../../services/buyer-thunks";
import "./Login.css";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.currentUserData.currentUser);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const validateUsername = () => {
        return username === '' || username === undefined
    }

    const validatePassword = () => {
        return password === '' || password === undefined || password.length < 6;
    }

    const handleLogin = async () => {
        if (!validateUsername() && !validatePassword()) {
            dispatch(findBuyerByUsernameAndPasswordThunk({ username, password }))
        } else {
            toast.error('Cannot find a user with entered username and password!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    useEffect(() => {
        if (currentUser !== null && Object.keys(currentUser).length !== 0 && currentUser !== undefined) {
            // Navigate to the new page
            navigate(-1);
        } else {
            toast.error('Cannot find a user with entered username and password!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }, [currentUser]);

    return (
        <div className="mt-3 background-radial-gradient overflow-hidden">
            <div className="px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">
                    <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                        <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                            The best offer <br />
                            <span style={{ color: "#b04141" }}>for your business</span>
                        </h1>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong" />

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="form-outline mb-4">
                                    <input type="email" id="username" className={`form-control ${validateUsername() ? "is-invalid" : "is-valid"}`} value={username} onChange={handleUsername} />
                                    <label className="form-label" htmlFor="username">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="password" className={`form-control ${validatePassword() ? "is-invalid" : "is-valid"}`} value={password} onChange={handlePassword} />
                                    <label className="form-label" htmlFor="password">Password</label>
                                </div>

                                <button className="btn btn-block mb-4" style={{ backgroundColor: "coral", color: "white" }} onClick={handleLogin}>
                                    Log In
                                </button>
                                <div>Don't have an account? <Link to="/register" style={{ color: "coral" }} >Register
                                    here</Link></div>
                            </div>
                        </div>

                    </div>

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Login;