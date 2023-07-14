"use client";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import axios from "axios";
const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
    useEffect(()=> {
        const { ['authTokens']: token } = parseCookies();
        setUser(token ? jwt_decode(token) : null);
        setAuthTokens(token ? JSON.parse(token) : null);
        
    },[])
    const [user, setUser] = useState();
    const [authTokens, setAuthTokens] = useState();
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const router = useRouter();
    

    const loginUser = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/token/',{ 'email': e.target.email.value, 'password': e.target.password.value }, {
            headers: {
                "Content-Type": "application/json",
            },
            
        });
        const data = response.data;
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            setCookie(undefined, 'authTokens', JSON.stringify(data), {
                maxAge: 60 * 5 // 5 minutes
            });
            push('/');
            
               
        } else {
            console.log("Something went wrong!")
        }

    }

    const logoutUser = () =>{
        setAuthTokens(null)
        setUser(null);
        destroyCookie(undefined, 'authTokens');
        push('/');
    }


    useEffect(()=>{
        
        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false);
    }, [authTokens, loading])
    

    const contextData = {
        user: user,
        authTokens: authTokens,
        isLoading: isLoading,
        setAuthTokens: setAuthTokens,
        setIsLoading: setIsLoading,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}
