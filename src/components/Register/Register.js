import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { buyerRegisterThunk } from "../../services/buyer-thunks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import { sellerRegisterThunk } from "../../services/seller-thunks";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSeller, setIsSeller] = useState(false)

    const onFinish = async (values) => {
        console.log('Register Attempted:', values)
        const { usertype, first_name, last_name, email, username, password, gender, dob, address1, address2, city, state, zipcode, phone } = values
        const address = {
            address1,
            address2,
            city,
            state,
            zipcode,
            incareof: first_name + " " + last_name
        }
        if (usertype == 'buyer') {
            const newUser = {
                username,
                password,
                first_name,
                last_name,
                email,
                addresses: [address],
                phone,
                gender,
                dob: new Date(dob).getTime()
            }
            dispatch(buyerRegisterThunk(newUser))
        } else {
            const newUser = {
                username,
                password,
                name: first_name + " " + last_name,
                email,
                business_address: address,
                phone,
            }
            dispatch(sellerRegisterThunk(newUser))
        }

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
        navigate('/login')
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Register Attempt Failed:', errorInfo)
        toast.error("Error in details entered!", {
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
        <div className="container mt-4 mb-2">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12">
                    <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                        <div className="card-body p-0">

                            <Form
                                name="register"
                                layout="vertical"
                                initialValues={{ usertype: 'buyer' }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <div className="row g-0">

                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <h3 className="fw-normal mb-3" style={{ color: "coral" }}> General Information </h3>

                                            {/* Name */}
                                            <div className="row">
                                                <div className="col-md-6 mb-1">
                                                    <Form.Item
                                                        label="First Name"
                                                        name="first_name"
                                                        rules={[{ required: true, message: 'Enter first name!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6 mb-1">
                                                    <Form.Item
                                                        label="Last Name"
                                                        name="last_name"
                                                        rules={[{ required: true, message: 'Enter last name!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="mb-1">
                                                <Form.Item
                                                    label="User Type"
                                                    name="usertype"
                                                    rules={[{ required: true, message: 'Please select user type!' }]}
                                                >
                                                    <Radio.Group onChange={(e) => setIsSeller(e.target.value == 'seller')}>
                                                        <Radio value="buyer"> Buyer </Radio>
                                                        <Radio value="seller"> Seller </Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </div>

                                            {/* Email */}
                                            <div className="mb-1">
                                                <Form.Item
                                                    label="Email"
                                                    name="email"
                                                    rules={[
                                                        { required: true, message: 'Enter email id!' },
                                                        { type: "email", message: 'Invalid email!' }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>

                                            </div>

                                            {/* Username */}
                                            <div className="mb-1">
                                                <Form.Item
                                                    label="Username"
                                                    name="username"
                                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </div>

                                            {/* Password */}
                                            <div className="mb-1">
                                                <Form.Item
                                                    name="password"
                                                    label="Password"
                                                    rules={[
                                                        { required: true, message: 'Please input your password!' },
                                                        { min: 6, message: 'Password must contain minimum 6 characters!' }]}
                                                    hasFeedback
                                                >
                                                    <Input.Password />
                                                </Form.Item>
                                            </div>

                                            {/* Confirm Password */}
                                            <div className="mb-1">
                                                <Form.Item
                                                    name="confirm"
                                                    label="Confirm Password"
                                                    dependencies={['password']}
                                                    hasFeedback
                                                    rules={[
                                                        { required: true, message: 'Please confirm your password!' },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('password') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password />
                                                </Form.Item>
                                            </div>

                                            {/* DoB */}
                                            {!isSeller && <div className="mb-1">
                                                <Form.Item
                                                    label="Date of Birth"
                                                    name="dob"
                                                    rules={[{ required: true, message: 'Enter date of birth!' }]}
                                                >
                                                    <DatePicker style={{ width: '100%' }} />
                                                </Form.Item>
                                            </div>}

                                        </div>
                                    </div>

                                    <div className="col-lg-6 bg-indigo text-white">
                                        <div className="p-5">
                                            <h3 className="fw-normal mb-3">Contact Details</h3>

                                            {/* Gender */}
                                            {!isSeller && <div className="mb-1">
                                                <Form.Item
                                                    label="Gender"
                                                    name="gender"
                                                    rules={[{ required: true, message: 'Select a gender!' }]}
                                                >
                                                    <Select>
                                                        <Select.Option value="Male">Male</Select.Option>
                                                        <Select.Option value="Female">Female</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>}

                                            {/* Phone */}
                                            <div className="mb-2">
                                                <Form.Item
                                                    name="phone"
                                                    label="Phone Number"
                                                    rules={[
                                                        { required: true, message: 'Please input your phone number!' },
                                                        { len: 10, message: 'Must contain 10 digits!' },
                                                    ]}
                                                >
                                                    <Input
                                                        style={{ width: '100%' }}
                                                        addonBefore={
                                                            <Select style={{ width: 80 }}>
                                                                <Select.Option>{"(+1)"}</Select.Option>
                                                            </Select>
                                                        }
                                                    />
                                                </Form.Item>
                                            </div>
                                            {/* Street */}
                                            <div className="mb-1">
                                                <Form.Item
                                                    label="Street Address 1"
                                                    name="address1"
                                                    rules={[{ required: true, message: 'Cannot be empty!' }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </div>

                                            {/* Street 2 */}
                                            <div className="mb-1">
                                                <Form.Item
                                                    label="Street Address 2"
                                                    name="address2"
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </div>

                                            {/* City & State */}
                                            <div className="row">
                                                <div className="col-md-6 mb-1">
                                                    <Form.Item
                                                        label="City"
                                                        name="city"
                                                        rules={[{ required: true, message: 'Enter city name!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-md-6 mb-1">
                                                    <Form.Item
                                                        label="State"
                                                        name="state"
                                                        rules={[{ required: true, message: 'Enter state name!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            {/* Zipcode */}
                                            <div className="mb-1">
                                                <Form.Item
                                                    label="Zipcode"
                                                    name="zipcode"
                                                    rules={[
                                                        { required: true, message: 'Enter zipcode!' },
                                                        { len: 5, message: 'Must contain 5 digits!' }
                                                    ]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>
                                            </div>



                                            {/* TnC */}
                                            <div className="mb-1">
                                                <Form.Item
                                                    name="agreement"
                                                    valuePropName="checked"
                                                    rules={[
                                                        { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')) },
                                                    ]}
                                                >
                                                    <Checkbox> I do accept the<a href="">Terms and Conditions</a> of this website</Checkbox>
                                                </Form.Item>
                                            </div>

                                            {/* Register Button */}
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit"
                                                    style={{ fontWeight: "bold", backgroundColor: "white", color: "coral" }}
                                                >
                                                    Register
                                                </Button>
                                            </Form.Item>


                                            <ToastContainer />
                                        </div>
                                    </div>


                                </div>
                            </Form>

                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Register;