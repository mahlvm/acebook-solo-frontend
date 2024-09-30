
import { useState, useContext, useEffect } from 'react'
import tokenContext from '../context/tokenContext'
import NewFriends from './NewFriends';

const FriendsByUser = () => {
    const [friendsByUser, setFriendsByUser] = useState([]);
    const { userId} = useContext(tokenContext);
    const [arrayFriendsId, setArrayFriendsId] = useState([]);


    useEffect(() => {
        const fetchFriendByUser = async () => {
            const response = await fetch(`http://127.0.0.1:8080/users/${userId}/friends`);
            const data = await response.json();
    
            if (response.ok) {
                setFriendsByUser(data.friends); 
                console.log("Amigos:", data.friends); 
    
            } else {
                console.error("Erro ao buscar amigos:", data); 
            }
        };
        fetchFriendByUser(); 
    }, [userId]);


    useEffect(() => {
        if (friendsByUser.length > 0) {
            setArrayFriendsId(friendsByUser.map(friend => friend._id));
            console.log("IDs dos amigos:", arrayFriendsId);
        }
    }, [friendsByUser, arrayFriendsId]);


    return (
        <div>
            <h1>Friends List</h1>
            <div>
                {friendsByUser.map(friend => (
                    <div key={friend._id}>  
                    <img src={`http://127.0.0.1:8080${friend.avatar}`} alt={friend.username} style={{ width: '100px', height: '100px' }} />
                    <p>{friend.username}</p>
                </div>
                ))}
            </div>
            <div>
                <h2>Find New Friends</h2>
                <NewFriends arrayFriendsId={arrayFriendsId} />
            </div>
        </div>
    );  
}

export default FriendsByUser;