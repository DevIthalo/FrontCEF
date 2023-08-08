import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { setCookie, destroyCookie, parseCookies } from 'nookies';


const baseUrl = "https://backcef.up.railway.app"

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext)
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authTokens?.access}`
        }
    });

    axiosInstance.interceptors.request.use(async req => {

        const user = jwt_decode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;
        const response = await axios.post(`${baseUrl}/api/token/refresh/`, {
            refresh: authTokens.refresh
        })
        setCookie(undefined, 'authTokens', JSON.stringify(response.data), {
            maxAge: 2 * 86400,
            path: '/' // 2 dias
        });
        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))
        req.headers.Authorization = `Bearer ${response.data.access}`;


        return req;
    })

    return axiosInstance
}

export default useAxios;