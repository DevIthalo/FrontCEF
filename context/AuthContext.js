"use client";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import axios from "axios";
import axiosInstance from "@/services/axiosInstance";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
    useEffect(() => {
        const { ['authTokens']: token } = parseCookies();
        setUser(token ? jwt_decode(token) : null);
        setAuthTokens(token ? JSON.parse(token) : null);

    }, [])
    const [user, setUser] = useState();
    const [authTokens, setAuthTokens] = useState();
    const [errors, setFormErrors] = useState();
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();


    const loginUser = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const errors = {}
        if(e.target.email.value === '' || e.target.email.value === undefined){
            errors.email = "O campo e-mail não pode estar em branco!" 
        }
        if(e.target.password.value === '' || e.target.email.value === undefined){
            errors.password = "O campo senha não pode estar em branco!"
        }
        if(Object.keys(errors).length > 0){
            setFormErrors(errors);
            setIsLoading(false);
        }else{
            try {
                const response = await axios.post('http://localhost:8000/api/token/', { 'email': e.target.email.value, 'password': e.target.password.value }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = response.data;
                if (response.status === 200) {
                    setAuthTokens(data);
                    setUser(jwt_decode(data.access));
                    setCookie(undefined, 'authTokens', JSON.stringify(data), {
                        maxAge: 2 * 86400// 5 minutes
                    });
                    push('/');
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data) {
                        if(error.response.data?.email !== undefined){
                            errors.email = error.response.data?.email[0];
                        }if(error.response.data?.password !== undefined){
                            errors.password= error.response.data?.password[0];
                        }
                        if(Object.keys(errors).length>0){
                            setFormErrors(errors);
                        }else{
                            errors.details = "Nenhuma conta ativa encontrada com as credenciais fornecidas";
                            setFormErrors(errors);
                            const timeout = setTimeout(()=>{
                                setFormErrors('')
                            },5000)
                            setIsLoading(false);
                            return () => clearTimeout(timeout);
                        }
                        setIsLoading(false);
                    }
                } else if (error.request) {
                    // A requisição foi feita, mas não houve resposta
                    console.log(error.request);
                } else {
                    // Ocorreu um erro ao configurar a requisição

                    console.log('Erro', error.message);
                }
            }      
        }

    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null);
        destroyCookie(undefined, 'authTokens');
        push('/');
    }


    useEffect(() => {

        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false);
    }, [authTokens, loading])


    const contextData = {
        user: user,
        authTokens: authTokens,
        isLoading: isLoading,
        errors: errors,
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
