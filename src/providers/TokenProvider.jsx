import { PropTypes } from 'prop-types';
import { useState } from 'react';
import tokenContext from "../context/tokenContext"

const TokenProvider = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };
    
      // Função para remover o token ao fazer logout
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return(
        <tokenContext.Provider value={{ token, login, logout }}>
            {children}
        </tokenContext.Provider>
    );
};

TokenProvider.propTypes = {
    children: PropTypes.node,
}

export default TokenProvider;


