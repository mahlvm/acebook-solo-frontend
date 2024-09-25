import { PropTypes } from 'prop-types';
import { useState } from 'react';
import tokenContext from "../context/tokenContext"

const TokenProvider = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [userId, setUserId] = useState(() => localStorage.getItem('userId') || null);
    const [username, setUsername] = useState(() => localStorage.getItem('username') || null);
    const [email, setEmail] = useState(() => localStorage.getItem('email') || null);
    const [avatar, setAvatar] = useState(() => localStorage.getItem('avatar') || null);


    const login = (token, userId, username, email, avatar) => {
        setToken(token);
        setUserId(userId);
        setUsername(username);
        setEmail(email);
        setAvatar(avatar);
        
        
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('avatar', avatar);




    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        setUsername(null);
        setEmail(null);
        setAvatar(null);
        
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar'); 
    };

    return(
        <tokenContext.Provider value={{ token, userId, username, email, avatar, login, logout }}>
            {children}
        </tokenContext.Provider>
    );
};

TokenProvider.propTypes = {
    children: PropTypes.node,
}

export default TokenProvider;


