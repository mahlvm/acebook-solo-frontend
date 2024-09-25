
import { useState, useContext } from "react";
import tokenContext from '../context/tokenContext';

const ProfileUpdate = () => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const { token, userId } = useContext(tokenContext);
    const [dataUpdate, setDataUpdate] = useState({});   



    const fetchProfileUpdate = async () => {
        const response = await fetch (`http://127.0.0.1:8080/users/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({dataUpdate})
        });
        if (response.status === 200) {
            const data = await response.json();
            setDataUpdate(data);

        } else {
            console.error("Failed to like post:", response.status);
        }
    }
    





    return (
        <div>
            <button type="button" onClick={()=> setOpenUpdate(!openUpdate)}>Update</button>
            {openUpdate && (
                <div>
                    <form onSubmit={fetchProfileUpdate}>
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </div>
    )
}   
export default ProfileUpdate;