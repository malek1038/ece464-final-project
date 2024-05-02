import React from "react";

const Profile = ({ username }) => {
    return (
        <div>
            <h2>Welcome, {username}!</h2>
            <p>Profile page</p>
        </div>
    );
};

export default Profile