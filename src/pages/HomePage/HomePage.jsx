import React from 'react';
import { useHistory } from 'react-router-dom';
import userService from '../../utils/userService';
import './HomePage.css'

function HomePage({ user }) {

    const history = useHistory();

    async function handleDeleteUser () {
        try {
            await userService.removeUser(user._id);
            userService.logout();
            history.push('/login')
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            {user.username}
            <div onClick={handleDeleteUser}>Delete User</div>
        </div>
    );
}

export default HomePage;