import tokenContext from '../context/tokenContext';
import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import "./NewFriends.css"

const NewFriends = ({ arrayFriendsId }) => {
    const [allUsers, setAllUsers] = useState([]);
    const { userId } = useContext(tokenContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://127.0.0.1:8080/users/all');
            const data = await response.json();
            const users = data.users;

            console.log("userId:", userId);
            console.log("Array de IDs dos amigos:", arrayFriendsId);

            const filteredUsers = users.filter(user => {
                return user._id !== userId && !arrayFriendsId.includes(user._id);
            });

            setAllUsers(filteredUsers);
        };

        fetchUsers();
    }, [userId, arrayFriendsId]);  

    const addFriend = async (friendId) => {
        const response = await fetch(`http://127.0.0.1:8080/users/${userId}/add-friend/${friendId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            console.log('Friend added successfully');
            window.location.reload();
        } else if (response.status === 400) {
            console.error('Friend already added');
        } else {
            console.error('Failed to add friend');
        }
    
    };

    return (
        <div>
            <div className='new-friends-box'>
                <h1>Find New Friends</h1>
                <div className='new-friends-grid'>
                    {allUsers.length > 0 ? (
                        allUsers.map(user => (
                            <div className="new-friend-card" key={user._id}>  
                                <img src={`http://127.0.0.1:8080${user.avatar}`} alt={user.username} />
                                <p>{user.username}</p>
                                <button type='button' onClick={() => addFriend(user._id)}>Follow</button> 
                            </div>
                        ))
                    ) : (
                        <p>No new friends available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

NewFriends.propTypes = {
    arrayFriendsId: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewFriends;
