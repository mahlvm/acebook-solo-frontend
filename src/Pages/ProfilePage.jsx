import { useContext } from 'react';
import tokenContext from '../context/tokenContext';
import ProfileUpdate from '../components/ProfileUpdate';

const ProfilePage = () => {
    const { username, email, avatar } = useContext(tokenContext); 
    const avatarUrl = `http://127.0.0.1:8080${avatar}`; // Avatar vem com o caminho "/uploads/filename.jpeg"


    return (
        <div>
            <h1>Profile Page</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <img 
                src={avatarUrl} 
                alt="Avatar" 
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/path/to/default/image.jpg'; // Substitua pela sua imagem padrão
                    console.error("Failed to load avatar image");
                }}
                style={{ width: '150px', height: '150px' }} // Ajuste o tamanho para ser visível
            />
            <ProfileUpdate />
        </div>
    );
};

export default ProfilePage;
