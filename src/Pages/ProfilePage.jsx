import { useContext } from 'react';
import tokenContext from '../context/tokenContext';
import ProfileUpdate from '../components/ProfileUpdate';

const ProfilePage = () => {
    const { username, email, avatar } = useContext(tokenContext);

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <img src={avatar} alt="Avatar" />
            <ProfileUpdate />
        </div>
    );
};

export default ProfilePage;
