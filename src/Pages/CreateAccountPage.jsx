import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccountPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const fetchCreateAccount = async (event) => {
        event.preventDefault(); 

        // Cria uma nova instância de FormData
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        if (avatar) {
            formData.append('profilePicture', avatar); // Nome deve corresponder ao que o multer espera
        }

        try {
            const response = await fetch('http://127.0.0.1:8080/users', {
                method: 'POST',
                body: formData 
            });
            const data = await response.json();
            console.log(data); 

            if (response.status === 201) {
                console.log('Account created successfully');
                navigate('/login');

            } else if (response.status === 409) {
                console.error('Email address already exists');
                alert("Email address already exists");
            } else {
                console.error('Failed to create account');
                alert("Failed to create account");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={fetchCreateAccount}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*" // Aceita apenas arquivos de imagem
                    onChange={(event) => setAvatar(event.target.files[0])} // Armazena o arquivo selecionado
                />

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccountPage;
