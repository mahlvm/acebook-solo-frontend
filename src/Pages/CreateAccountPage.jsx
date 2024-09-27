import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccountPage.css';
import girlsImage from '../assets/girl.svg';



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
        <div className="accountContainer">
            

            <div className='form-account'>

                <div className='title-account'>
                    <h1>Create Account</h1>
                </div>
                <form onSubmit={fetchCreateAccount}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
    
                    <div className="form-group">
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={(event) => setAvatar(event.target.files[0])}
                        />
                    </div>
    
                    <button type="submit">Create Account</button>
                </form>
            </div>

            <div className='box-image'>
                <img src={girlsImage} alt="Description of the image" />
            </div>

        </div>
    </div>
    
    );
};

export default CreateAccountPage;
