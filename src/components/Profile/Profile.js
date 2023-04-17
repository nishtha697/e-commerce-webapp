import React from "react";
import { useSelector } from "react-redux";

import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd'

const Profile = () => {

    const { profile, type } = useSelector(state => state.user)

    const getFormattedDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }


    return (

        <div>
            <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<UserOutlined />}
            />

            {type === 'seller' &&
                <div>
                    <span> <b>Seller Name:</b> </span>
                    <span>{profile.name}</span>
                </div>
            }

            {type === 'buyer' && <>
                <div>
                    <span> <b>First name:</b> </span>
                    <span>{profile.first_name}</span>
                </div>
                <div>
                    <span><b>Last name:</b> </span>
                    <span>{profile.last_name}</span>
                </div>
                <div>
                    <span><b>Date of Birth:</b> </span>
                    <span>{getFormattedDate(profile.dob)}</span>
                </div>
                <div>
                    <span><b>Gender:</b> </span>
                    <span>{profile.gender}</span>
                </div>
            </>
            }

            <div>
                <span><b>Email:</b> </span>
                <span>{profile.email}</span>
            </div>
            <div>
                <span><b>Phone:</b> </span>
                <span>{profile.phone}</span>
            </div>

            {type === "buyer" &&
                <div>
                    <span><b>Addresses: </b></span>
                    <br /><br />
                    {profile.addresses.map((addr, idx) =>
                        <div>
                            <h6 style={{ textDecoration: 'underline' }}>Address {idx + 1}</h6>

                            <span>{addr.incareof}</span>
                            <br />
                            <span>{addr.address1}, {addr.address2}</span>
                            <br />
                            <span>{addr.city}, {addr.state}, {addr.zipcode}</span>
                        </div>
                    )}

                </div>}


            {type === "seller" &&
                <div>
                    <span><b>Business Address: </b></span>
                    <br />
                    <span>{profile.business_address.address1}, {profile.business_address.address2}</span>
                    <br />
                    <span>{profile.business_address.city}, {profile.business_address.state}, {profile.business_address.zipcode}</span>
                </div>}


        </div >

    );
}

export default Profile;