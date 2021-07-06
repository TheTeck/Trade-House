import React from 'react';
import './HomePage.css'

function HomePage({ user }) {
    return (
        <div>
            {user.username}
        </div>
    );
}

export default HomePage;