"use client";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

const baseUrl = "http://localhost:8000"

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

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


    const loginUser = async (e, isRegister = false) => {
        setIsLoading(true);
        e.preventDefault();
        const errors = {}
        if (e.target.email.value === '' || e.target.email.value === undefined) {
            errors.email = "O campo e-mail não pode estar em branco!"
        }
        if (e.target.password.value === '' || e.target.email.value === undefined) {
            errors.password = "O campo senha não pode estar em branco!"
        }
        if (!validateEmail(e.target.email.value) && e.target.email.value !== '' || e.target.email.value === undefined) {
            errors.email = "Digite um e-mail valido! Ex.: fulano@gmail.com"
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsLoading(false);
        } else {
            try {
                const response = await api.post('/api/token/', { 'email': e.target.email.value, 'password': e.target.password.value }, {
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
                    if (isRegister) push('/confirmation');
                    else push('/')
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data) {
                        if (error.response.data?.email !== undefined) {
                            errors.email = error.response.data?.email[0];
                        } if (error.response.data?.password !== undefined) {
                            errors.password = error.response.data?.password[0];
                        }
                        if (Object.keys(errors).length > 0) {
                            setFormErrors(errors);
                        } else {
                            errors.details = "Nenhuma conta ativa encontrada com as credenciais fornecidas";
                            setFormErrors(errors);
                            const timeout = setTimeout(() => {
                                setFormErrors('')
                            }, 5000)
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

    const registerUser = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const errors = {}

        const registerData = {
            'email': e.target.email.value,
            'password': e.target.password.value,
            'confirm_password': e.target.confirm_password.value
        }

        if (e.target.email.value === '' || e.target.email.value === undefined) {
            errors.email = "O campo e-mail não pode estar em branco!"
        }
        if (e.target.password.value === '' || e.target.email.value === undefined) {
            errors.password = "O campo senha não pode estar em branco!"
        }
        if (e.target.password.value !== e.target.confirm_password.value) {
            errors.confirm_password = "As senhas estão diferentes!"
        }
        if (!validateEmail(e.target.email.value) && e.target.email.value !== '' || e.target.email.value === undefined) {
            errors.email = "Digite um e-mail valido! Ex.: fulano@gmail.com"
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsLoading(false);
        } else {
            try {
                const response = await api.post('/api/register/', registerData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 201) {
                    loginUser(e, true);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data) {
                        console.log(error.response.data);
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
        destroyCookie(null, 'authTokens',{expires: new Date(0)});

        if(window.location.reload()){
            setAuthTokens(null)
            setUser(null);
            push('/');
        }
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
        setFormErrors: setFormErrors,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}
