import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Form, Input, Select } from 'antd'
import { PlusOutlined, UserOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { buyerAddAddressThunk, buyerDeleteAddressThunk, buyerUpdateAddressThunk, buyerUpdateProfileThunk } from "../../services/buyer-thunks";
import { ToastContainer, toast } from "react-toastify";
import { sellerUpdateProfileThunk } from "../../services/seller-thunks";


const Profile = () => {

    const dispatch = useDispatch();

    const { profile, type } = useSelector(state => state.user)
    const [newAddressFlag, setNewAddressFlag] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);
    const [editGeneralInfo, setEditGeneralInfo] = useState(false);
    const [editContactInfo, setEditContactInfo] = useState(false);

    const addressKey = type === 'seller' ? 'business_address' : 'addresses'

    const getFormattedDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    useEffect(() => {
        if (newAddressFlag) {
            setNewAddressFlag(false)
            success()
        } else if (editAddressId) {
            setEditAddressId(null)
            success()
        }

    }, [profile.addresses])

    useEffect(() => {
        if (editGeneralInfo) {
            setEditGeneralInfo(false)
            success()
        } else if (editContactInfo) {
            setEditContactInfo(false)
            success()
        }
    }, [profile])


    const success = () => (
        toast.success("Profile Updated!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        }))


    const fail = () => (
        toast.error("Failed!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        }))

    // UPDATE
    const handleEditProfileFinish = async (values) => {
        console.log("Profile Edit Attempt: ", values)
        if (type === 'buyer') {
            dispatch(buyerUpdateProfileThunk({ username: profile.username, newProfile: values }))
        } else if (type === 'seller') {
            dispatch(sellerUpdateProfileThunk({ username: profile.username, newProfile: values }))
        }
    }
    const handleEditProfileFinishFail = (errorInfo) => {
        console.log("Profile Edit Attempt Fail: ", errorInfo)
        fail()
    }



    // UPDATE
    const handlEditAddressFinish = async (values) => {
        console.log("Address Edit Attempt: ", values)
        dispatch(buyerUpdateAddressThunk({ username: profile.username, address: { ...values, id: editAddressId } }))
    }
    const handleEditAddressFinishFail = (errorInfo) => {
        console.log("Address Edit Attempt Fail: ", errorInfo)
        fail()
    }

    // DELETE
    const handleAddresDelete = (addressId) => {
        console.log("Delete Address Attempt: ", addressId)
        dispatch(buyerDeleteAddressThunk({ username: profile.username, addressId }));
    }


    // CREATE
    const handleNewAddressFinish = async (values) => {
        console.log("New Address Save Attempt: ", values)
        dispatch(buyerAddAddressThunk({ username: profile.username, address: values }));
    }
    const handleNewAddressFinishFail = (errorInfo) => {
        console.log("New Address Save Attempt Fail: ", errorInfo)
        fail()
    }


    return (
        <div className="d-flex flex-column flex-wrap align-items-center">

            <h1 className="mb-5">Profile Information</h1>
            <Avatar
                className="d-flex justify-content-center align-items-center bg-dark mb-5"
                size={200}
                icon={<UserOutlined />}
            />

            <div className="card bg-glass w-50 mb-5">
                <h4 className="card-header bg-secondary bg-gradient text-white"> General Information</h4>
                <div className="card-body">
                    {editGeneralInfo ?
                        <Form layout="vertical" onFinish={handleEditProfileFinish} onFinishFailed={handleEditProfileFinishFail} initialValues={profile}>
                            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Cannot be empty' }]}>
                                <Input disabled />
                            </Form.Item>
                            {type === 'seller' &&
                                <Form.Item label="Seller Name" name="name" rules={[{ required: true, message: 'Seller name cannot be empty!' }]}>
                                    <Input />
                                </Form.Item>
                            }
                            {type === 'buyer' &&
                                <>
                                    <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'First name cannot be empty!' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Last name cannot be empty!' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Select a gender!' }]}>
                                        <Select>
                                            <Select.Option value="Male">Male</Select.Option>
                                            <Select.Option value="Female">Female</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    {/* <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Date of birth cannot be empty!' }, { len: 5, message: 'Must contain 5 digits!' }]}>
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item> */}
                                </>
                            }
                            <Form.Item>
                                <div className="d-flex flex-row">
                                    <Button shape="round" htmlType="submit" className="bg-dark text-white d-flex align-items-center me-2">
                                        Update
                                    </Button>
                                    <Button danger shape="round" className="d-flex align-items-center" onClick={() => setEditGeneralInfo(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                        : (
                            <div className="d-flex flex-column">
                                <div><b>Username:</b> {profile.username}</div>
                                {type === 'seller' && <div> <b>Seller Name:</b> {profile.name} </div>}
                                {type === 'buyer' &&
                                    <>
                                        <div><b>First name:</b> {profile.first_name}</div>
                                        <div><b>Last name:</b> {profile.last_name}</div>
                                        <div><b>Gender:</b> {profile.gender}</div>
                                        <div><b>Date of Birth:</b> {getFormattedDate(profile.dob)}</div>
                                    </>
                                }
                                <Button className="ms-2 ps-2 pe-2 d-flex align-items-center align-self-end" style={{ width: "fit-content" }} icon={<EditOutlined />} onClick={() => setEditGeneralInfo(true)} />
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="card bg-glass w-50 mb-5">
                <h4 className="card-header bg-secondary bg-gradient text-white">Contact Details</h4>
                <div className="card-body">
                    {editContactInfo ?
                        <Form layout="vertical" onFinish={handleEditProfileFinish} onFinishFailed={handleEditProfileFinishFail} initialValues={profile}>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email cannot be empty' }, { type: "email", message: 'Invalid email!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: 'Phone cannot be empty!' }, { len: 10, message: 'Must contain 10 digits!' }]}>
                                <Input addonBefore="+1" style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item>
                                <div className="d-flex flex-row">
                                    <Button shape="round" htmlType="submit" className="bg-dark text-white d-flex align-items-center me-2">
                                        Update
                                    </Button>
                                    <Button danger shape="round" className="d-flex align-items-center" onClick={() => setEditContactInfo(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                        : (
                            <div className="d-flex flex-column">
                                <div><b>Email:</b> {profile.email}</div>
                                <div><b>Phone:</b> {profile.phone}</div>
                                <Button className="ms-2 ps-2 pe-2 d-flex align-items-center align-self-end" style={{ width: "fit-content" }} icon={<EditOutlined />} onClick={() => setEditContactInfo(true)} />
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="card bg-glass w-50 mb-5">
                <h4 className="card-header bg-secondary bg-gradient text-white">Address</h4>
                <div className="card-body">
                    {type === 'buyer' && profile['addresses'].map((addr, idx) =>
                        <div className="card card-body mt-3 mb-3" key={addr.id}>
                            <h6 style={{ textDecoration: 'underline' }}>Address {idx + 1}</h6>

                            {editAddressId === addr.id ?
                                <Form layout="vertical" onFinish={handlEditAddressFinish} onFinishFailed={handleEditAddressFinishFail} initialValues={addr}>
                                    <Form.Item label="In Care Of" name="incareof" rules={[{ required: true, message: 'Cannot be empty' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Address Line 1" name="address1" rules={[{ required: true, message: 'Cannot be empty!' }]}>
                                        <Input showCount />
                                    </Form.Item>
                                    <Form.Item label="Address Line 2" name="address2" rules={[{ required: false }]}>
                                        <Input showCount />
                                    </Form.Item>
                                    <Form.Item label="City" name="city" rules={[{ required: true, message: 'Enter city name!' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="State" name="state" rules={[{ required: true, message: 'Enter state name!' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Zipcode" name="zipcode" rules={[{ required: true, message: 'Enter zipcode!' }, { len: 5, message: 'Must contain 5 digits!' }]}>
                                        <Input type="number" />
                                    </Form.Item>

                                    <Form.Item>
                                        <div className="d-flex flex-row">
                                            <Button shape="round" htmlType="submit" className="bg-dark text-white d-flex align-items-center me-2">
                                                Update
                                            </Button>
                                            <Button danger shape="round" className="d-flex align-items-center" onClick={() => setEditAddressId(null)}>
                                                Cancel
                                            </Button>
                                        </div>

                                    </Form.Item>
                                </Form>
                                :
                                (<>
                                    <div>{addr.incareof}</div>
                                    <div>{addr.address1}, {addr.address2}</div>
                                    <div>{addr.city}</div>
                                    <div>{addr.state} - {addr.zipcode}</div>
                                    <div className="d-flex flex-row justify-content-end">
                                        {idx !== 0 && <Button className="ms-2 ps-2 pe-2 d-flex align-items-center" style={{ width: "fit-content" }} icon={<EditOutlined />} onClick={() => setEditAddressId(addr.id)} />}
                                        {idx !== 0 && <Button danger className="ms-2 ps-2 pe-2 d-flex align-items-center" style={{ width: "fit-content" }} icon={<DeleteOutlined />} onClick={() => handleAddresDelete(addr.id)} />}
                                    </div>
                                </>)
                            }

                        </div>
                    )}
                    {type === 'seller' &&
                        <>
                            <div>{profile['business_address'].address1}, {profile['business_address'].address2}</div>
                            <div>{profile['business_address'].city}</div>
                            <div>{profile['business_address'].state} - {profile['business_address'].zipcode}</div>
                        </>
                    }

                    {type === 'buyer' ?
                        newAddressFlag ?
                            (
                                <div className="card card-body mt-3 mb-3">
                                    <h6 >Enter new address</h6>
                                    <Form layout="vertical" onFinish={handleNewAddressFinish} onFinishFailed={handleNewAddressFinishFail}>
                                        <Form.Item label="In Care Of" name="incareof" rules={[{ required: true, message: 'Cannot be empty' }]}>
                                            <Input placeholder="John Doe" />
                                        </Form.Item>
                                        <Form.Item label="Address Line 1" name="address1" rules={[{ required: true, message: 'Cannot be empty!' }]}>
                                            <Input placeholder="102 Boylston St" showCount />
                                        </Form.Item>
                                        <Form.Item label="Address Line 2" name="address2" rules={[{ required: false }]}>
                                            <Input placeholder="Apt 07" showCount />
                                        </Form.Item>
                                        <Form.Item label="City" name="city" rules={[{ required: true, message: 'Enter city name!' }]}>
                                            <Input placeholder="Boston" />
                                        </Form.Item>
                                        <Form.Item label="State" name="state" rules={[{ required: true, message: 'Enter state name!' }]}>
                                            <Input placeholder="MA" />
                                        </Form.Item>
                                        <Form.Item label="Zipcode" name="zipcode" rules={[{ required: true, message: 'Enter zipcode!' }, { len: 5, message: 'Must contain 5 digits!' }]}>
                                            <Input placeholder="02215" type="number" />
                                        </Form.Item>

                                        <Form.Item>
                                            <div className="d-flex flex-row">
                                                <Button shape="round" htmlType="submit" className="bg-dark text-white d-flex align-items-center me-2" >
                                                    Save
                                                </Button>
                                                <Button danger shape="round" className="d-flex align-items-center" onClick={() => setNewAddressFlag(false)}>
                                                    Cancel
                                                </Button>
                                            </div>

                                        </Form.Item>
                                    </Form>
                                </div>
                            ) : (
                                <Button type="primary" shape="round"
                                    className="bg-dark d-flex align-items-center"
                                    icon={<PlusOutlined />}
                                    onClick={() => setNewAddressFlag(true)}
                                >
                                    Add New
                                </Button>
                            )
                        : <></>
                    }
                </div>
            </div>

            <ToastContainer />

        </div >

    );
}

export default Profile;