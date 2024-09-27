import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import tokenContext from '../context/tokenContext';

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
            <button type="button" onClick={() => setOpenUpdate(!openUpdate)}>Update</button>
            {openUpdate && (
                <div>
                    <form onSubmit={fetchProfileUpdate}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={newUsername}
                            onChange={(event) => setNewUsername(event.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newEmail}
                            onChange={(event) => setNewEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                        <input
                            type="file"
                            onChange={(event) => setProfilePicture(event.target.files[0])} // Captura a imagem
                        />
                        <button type="submit">Update</button>
                    </form>
                    <p>Your new information will show afte new login</p>
                </div>
            )}
        </div>
    );
}

export default ProfileUpdate;
