import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            if (!user) {
                const { data } = await axios.get("/profile");
                setUser(data);
                setReady(true);
            }
        };

        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, ready }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider