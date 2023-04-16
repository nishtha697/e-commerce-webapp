import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createBuyerThunk } from "../../services/buyer-thunks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const handleFirstName = (event) => setFirstName(event.target.value)

    const [lastName, setLastName] = useState('');
    const handleLastName = (event) => setLastName(event.target.value)

    const [email, setEmail] = useState('');
    const handleEmail = (event) => setEmail(event.target.value)

    const [username, setUserName] = useState('');
    const handleUsername = (event) => setUserName(event.target.value)

    const [password, setPassword] = useState('');
    const handlePassword = (event) => setPassword(event.target.value)

    const [dob, setDOB] = useState(undefined);
    const handleDOB = (event) => setDOB(new Date(event.target.value))

    const [gender, setGender] = useState('Female');
    const handleGender = (event) => setGender(event.target.value)

    const [address1, setAddress1] = useState('');
    const handleAddress1 = (event) => setAddress1(event.target.value);

    const [address2, setAddress2] = useState('');
    const handleAddress2 = (event) => setAddress2(event.target.value)

    const [city, setCity] = useState('');
    const handleCity = (event) => setCity(event.target.value)

    const [state, setState] = useState('');
    const handleState = (event) => setState(event.target.value)

    const [zip, setZip] = useState('');
    const handleZip = (event) => setZip(event.target.value)

    const [phone, setPhone] = useState('');
    const handlePhone = (event) => setPhone(event.target.value)

    const [termsAccepted, setTermsAccepted] = useState(false);
    const handleTermsAccepted = (event) => {
        setTermsAccepted(event.target.checked)
    }

    const validateString = (input) => input === '' || input === undefined
    const validateEmail = () => email === undefined || email === '' || !/^[^@ ]+@[^@ ]+\.[^@ \.]+$/.test(email)
    const validatePassword = () => password === '' || password === undefined || password.length < 6
    const validatePhone = () => phone === '' || phone === undefined || !/[0-9]/.test(phone) || phone.length !== 10
    const validateDOB = () => dob === undefined
    const validateZip = () => zip === '' || zip === undefined || !/[0-9]/.test(zip) || zip.length !== 5

    const validationError = () => {
        toast.error('Please make sure to enter all fields correctly!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const success = () => {
        toast.success('Registered successfully! :)', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }


    const handleRegister = () => {
        if (!validateString(firstName)
            && !validateString(lastName)
            && !validateString(username)
            && !validateString(address1)
            && !validateString(city)
            && !validateString(state)
            && !validatePhone()
            && !validateZip()
            && !validatePassword()
            && !validateDOB()
            && !validateEmail()
            && termsAccepted === true) {

            const address = {
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipcode: zip,
                incareof: firstName + " " + lastName
            }
            const newUser = {
                username: username,
                password: password,
                first_name: firstName,
                last_name: lastName,
                email: email,
                addresses: [address],
                phone: 'TEST',
                gender: gender,
                dob: new Date(dob).getTime()
            }
            dispatch(createBuyerThunk(newUser));
            success("Success");
            navigate('/login');
        } else {
            validationError("Error");
        }
    }


    return (
        <div className="container mt-4 mb-2">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12">
                    <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                        <div className="card-body p-0">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <h3 className="fw-normal mb-5" style={{ color: "coral" }}> General Information </h3>

                                        {/* Name */}
                                        <div className="row">
                                            <div className="col-md-6 mb-2 pb-2">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        className={`form-control form-control-lg ${validateString(firstName) ? "is-invalid" : "is-valid"}`}
                                                        value={firstName}
                                                        onChange={handleFirstName}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="firstName"> First name </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-2 pb-2">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        className={`form-control form-control-lg ${validateString(lastName) ? "is-invalid" : "is-valid"}`}
                                                        value={lastName}
                                                        onChange={handleLastName}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="lastName"> Last name </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gender */}
                                        <div className="mb-2 pb-2">
                                            <select
                                                className="form-select form-select-lg"
                                                id="gender"
                                                value={gender}
                                                onChange={handleGender}
                                                required
                                            >
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <label className="form-label" htmlFor="gender">Gender</label>
                                        </div>

                                        {/* DoB */}
                                        <div className="mb-2 pb-2">
                                            <div className="form-outline">
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    className={`form-control form-control-lg  ${validateDOB() ? "is-invalid" : "is-valid"}`}
                                                    onChange={handleDOB}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="dob">Date of Birth</label>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="mb-2 pb-2">
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    className={`form-control form-control-lg ${validateEmail() ? "is-invalid" : "is-valid"}`}
                                                    value={email}
                                                    onChange={handleEmail}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="email">Email</label>
                                            </div>
                                        </div>

                                        {/* Username */}
                                        <div className="mb-2 pb-2">
                                            <div className="form-outline">
                                                <input
                                                    type="text"
                                                    id="username"
                                                    className={`form-control form-control-lg ${validateString(username) ? "is-invalid" : "is-valid"}`}
                                                    value={username}
                                                    onChange={handleUsername}
                                                    required />
                                                <label className="form-label" htmlFor="username">Username</label>
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="mb-2 pb-2">
                                            <div className="form-outline">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className={`form-control form-control-lg ${validatePassword() ? "is-invalid" : "is-valid"}`}
                                                    value={password}
                                                    onChange={handlePassword}
                                                    required />
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-lg-6 bg-indigo text-white">
                                    <div className="p-5">
                                        <h3 className="fw-normal mb-5">Contact Details</h3>

                                        {/* Street */}
                                        <div className="mb-2 pb-2">
                                            <div className="form-outline form-white">
                                                <input
                                                    type="text"
                                                    id="address1"
                                                    className={`form-control form-control-lg ${validateString(address1) ? "is-invalid" : "is-valid"}`}
                                                    value={address1}
                                                    onChange={handleAddress1}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="address1">Street Address</label>
                                            </div>
                                        </div>

                                        {/* Street 2 */}
                                        <div className="mb-2 pb-2">
                                            <div className="form-outline form-white">
                                                <input
                                                    type="text"
                                                    id="address2"
                                                    className="form-control form-control-lg"
                                                    value={address2}
                                                    onChange={handleAddress2}
                                                />
                                                <label className="form-label" htmlFor="address2">Street Address Line 2</label>
                                            </div>
                                        </div>

                                        {/* City & State */}
                                        <div className="row">
                                            <div className="col-md-5 mb-2 pb-2">
                                                <div className="form-outline form-white">
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        className={`form-control form-control-lg ${validateString(city) ? "is-invalid" : "is-valid"}`}
                                                        value={city}
                                                        onChange={handleCity}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="city">City</label>
                                                </div>
                                            </div>
                                            <div className="col-md-7 mb-2 pb-2">
                                                <div className="form-outline form-white">
                                                    <input type="text" id="state"
                                                        className={`form-control form-control-lg ${validateString(state) ? "is-invalid" : "is-valid"}`}
                                                        value={state}
                                                        onChange={handleState}
                                                        required />
                                                    <label className="form-label" htmlFor="state">State</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Zipcode */}
                                        <div className="mb-2 pb-2">
                                            <div className="form-outline form-white">
                                                <input
                                                    type="text"
                                                    id="zip"
                                                    className={`form-control form-control-lg  ${validateZip() ? "is-invalid" : "is-valid"}`}
                                                    value={zip}
                                                    onChange={handleZip}
                                                    required />
                                                <label className="form-label" htmlFor="zip">Zip Code</label>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="mb-2 pb-2">
                                            <div className="form-outline form-white">
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    className={`form-control form-control-lg  ${validatePhone() ? "is-invalid" : "is-valid"}`}
                                                    value={phone}
                                                    onChange={handlePhone}
                                                    required />
                                                <label className="form-label" htmlFor="phone">Phone Number</label>
                                            </div>
                                        </div>

                                        {/* TnC */}
                                        <div className="form-check d-flex justify-content-start mb-2 pb-3">
                                            <input
                                                className="form-check-input me-3"
                                                type="checkbox"
                                                id="terms"
                                                onClick={handleTermsAccepted}
                                                required
                                            />
                                            <label
                                                className="form-check-label text-white"
                                                htmlFor="terms"
                                            >
                                                I do accept the <a href="#" className="text-white"><u>Terms and Conditions</u></a> of your site.
                                            </label>
                                        </div>

                                        {/* Register Button */}
                                        <button
                                            type="button"
                                            className="btn btn-light btn-lg"
                                            data-mdb-ripple-color="dark"
                                            onClick={handleRegister}
                                        >
                                            Register
                                        </button>

                                        <ToastContainer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;