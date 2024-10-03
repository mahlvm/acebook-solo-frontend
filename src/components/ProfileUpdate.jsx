import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import tokenContext from '../context/tokenContext';
import './ProfileUpdate.css';

const ProfileUpdate = () => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const { token, userId, username, email, updateProfile } = useContext(tokenContext); 
    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email); 
    const [newPassword, setNewPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null); 
    const navigate = useNavigate();

    const fetchProfileUpdate = async (event) => {
        event.preventDefault();

        const updatedData = new FormData(); 
        if (newUsername) updatedData.append('username', newUsername);
        if (newEmail) updatedData.append('email', newEmail);
        if (newPassword) updatedData.append('password', newPassword);
        if (profilePicture) updatedData.append('profilePicture', profilePicture); 

        const response = await fetch(`http://127.0.0.1:8080/users/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: updatedData // Envia o FormData
        });

        if (response.ok) {
            const updatedProfile = await response.json();
            console.log("Profile updated successfully:", updatedProfile);
            setOpenUpdate(false);
            setNewUsername(updatedProfile.username);
            setNewEmail(updatedProfile.email);
            updateProfile(newUsername, newEmail);
            setNewPassword("");
            setProfilePicture(null);
            navigate('/login'); 
        } else {
            console.error("Failed to update profile:", response.status);
        }
    }

    return (
        <div>
            <div  className='update-form'>
            <i onClick={() => setOpenUpdate(!openUpdate)} className="bi bi-pencil-square"></i>
            {openUpdate && (
                <div className='update-inputs'>
                    <form onSubmit={fetchProfileUpdate}>
                        <div className='input-update'>
                        <input
                            type="text"
                            placeholder="New Username"
                            value={newUsername}
                            onChange={(event) => setNewUsername(event.target.value)}
                        />
                        </div>
                        <div className='input-update'>
                        <input
                            type="email"
                            placeholder="New Email"
                            value={newEmail}
                            onChange={(event) => setNewEmail(event.target.value)}
                        />
                        </div>
                        <div className='input-update'>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                        </div>

                        <div className='input-update'>
                        <input
                            type="file"
                            onChange={(event) => setProfilePicture(event.target.files[0])} 
                        />
                        </div>

                        

                        <div className='input-update'>
                        <p>Your new information will show after new login</p>
                        <button type="submit">Update</button>
                        </div>
                    </form>
                    
                </div>
            )}
            </div>
        </div>
    );
}

export default ProfileUpdate;
