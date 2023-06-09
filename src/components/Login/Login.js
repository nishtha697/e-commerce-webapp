import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio } from 'antd';
import { toast, ToastContainer } from "react-toastify";
import { buyerLoginThunk } from "../../services/buyer-thunks";
import { sellerLoginThunk } from "../../services/seller-thunks";
import { clearLogin } from "../../reducers/user-reducer";
import "./Login.css";


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.user.profile);
    const { lastAttempt, error, type } = useSelector(state => state.user);

    useEffect(() => {
        return () => error && dispatch(clearLogin())
    }, [])

    useEffect(() => {
        if (error && !currentUser) {
            toast.error(`Login failed! ${error}!`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        } else if (currentUser) {
            if (type === 'buyer') navigate('/');
            else navigate('/seller/productlistings')
        }
    }, [lastAttempt])

    const onFinish = async (values) => {
        const { username, password, usertype } = values
        if (usertype === 'buyer') dispatch(buyerLoginThunk({ username, password }))
        else dispatch(sellerLoginThunk({ username, password }))
    }

    const onFinishFailed = (errorInfo) => {
        toast.error("Error in username/password!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
    }

    return (

        <div className="background-radial-gradient overflow-hidden">
            <div className="px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 justify-content-center mb-5">
                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong" />

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5 d-flex flex-column justify-content-center">
                                <h1>Login</h1>

                                <Form
                                    name="login"
                                    style={{ maxWidth: 600 }}
                                    initialValues={{ usertype: 'buyer' }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            { required: true, message: 'Please input your password!' },
                                            { min: 6, message: 'Password must contain minimum 6 characters!' }
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        label="User Type"
                                        name="usertype"
                                        rules={[{ required: true, message: 'Please select user type!' }]}
                                    >
                                        <Radio.Group>
                                            <Radio value="buyer"> Buyer </Radio>
                                            <Radio value="seller"> Seller </Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                        <Button type="primary" htmlType="submit" style={{ backgroundColor: "coral", color: "white" }}>
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>

                                <div>Don't have an account? <Link to="/register" style={{ color: "coral" }} >Register here</Link></div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Login;