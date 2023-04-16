import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {

    const { currentUser } = useSelector(state => state.currentUserData)

    console.log(currentUser)

    const getFormattedDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    return (

        <div>
            <div>
                <span> <b>First name:</b> </span>
                <span>{currentUser.first_name}</span>
            </div>
            <div>
                <span><b>Last name:</b> </span>
                <span>{currentUser.last_name}</span>
            </div>
            <div>
                <span><b>Date of Birth:</b> </span>
                <span>{getFormattedDate(currentUser.dob)}</span>
            </div>
            <div>
                <span><b>Email:</b> </span>
                <span>{currentUser.email}</span>
            </div>
            <div>
                <span><b>Gender:</b> </span>
                <span>{currentUser.gender}</span>
            </div>
            <div>
                <span><b>Phone:</b> </span>
                <span>{currentUser.phone}</span>
            </div>
            <br />
            <div>
                <span><b>Addresses: </b></span>
                <br /><br />
                {currentUser.addresses.map((addr, idx) =>
                    <div>
                        <h6 style={{textDecoration:'underline'}}>Address {idx + 1}</h6>

                        <span>{addr.incareof}</span>
                        <br />
                        <span>{addr.address1}, {addr.address2}</span>
                        <br />
                        <span>{addr.city}, {addr.state}, {addr.zipcode}</span>
                    </div>
                )}

            </div>
        </div>

    );
}

export default Profile;