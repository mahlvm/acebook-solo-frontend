import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react'
import tokenContext from '../context/tokenContext'

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
            login(data.token, data.userId, data.username, data.email, data.avatar);
            // console.log(data.username);
            // console.log(data.email);
            // console.log(data.avatar);
            // console.log(data.token);
            // console.log(data.userId);
            navigate('/feed');
        } else if (response.status === 401) {
            console.log("Invalid credentials");
        } else if(response.status === 402) {
            console.log("Incorrect Password");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={fetchLogin}>
                <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}  />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}   

export default LoginPage;