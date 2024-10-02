import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react'
import tokenContext from '../context/tokenContext'
import boyImage from '../assets/boys.svg';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(tokenContext);
    const navigate = useNavigate();

    const fetchLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:8080/tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log(data);

        if(response.status === 201) {
            console.log("Login successful");
            login(data.token, data.userId, data.username, data.email, data.avatar, data.friends);
            console.log(data.username);
            console.log(data.email);
            console.log(data.avatar);
            console.log(data.token);
            console.log(data.userId);
            console.log(data.friends);
            navigate('/feed');
        } else if (response.status === 401) {
            console.log("Invalid credentials");
        } else if(response.status === 402) {
            console.log("Incorrect Password");
        }
    }

    return (
        <div className='login-container'>
            
            <div className='login-form'>
            <div className='box-login'>
                <div className='logo-login'>
                    <h1>ACEBOOK</h1>
                </div>
                <div className='title-login'>
                    <h2>Login</h2>
                </div>
                <form onSubmit={fetchLogin}>
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
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className='button-login'>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            </div>

            <div className='login-image'>
                <img src={boyImage} alt="boy login" />
            </div>
        </div>
    )
}   

export default LoginPage;