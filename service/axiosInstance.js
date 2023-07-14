import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import { parseCookies, setCookie } from 'nookies';

const baseUrl = "http://localhost:8000";

const { ['authTokens']: token } = parseCookies();
const authTokens = token ? JSON.parse(token) : null;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authTokens?.access}`
    }
});

axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        const { ['authTokens']: token } = parseCookies();
        const authTokens = token ? JSON.parse(token) : null;
        req.headers.Authorization = `Bearer ${authTokens?.access}`;
    }
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(isExpired);
    
    if(!isExpired) return req;
    
    const response = await axios.post(`${baseUrl}/api/token/refresh/`,{
        refresh: authTokens.refresh
    })
    
    setCookie(undefined, 'authTokens', JSON.stringify(response.data), {
        maxAge: 60 * 5 // 5 minutes
    });
    req.headers.Authorization = `Bearer ${response.data.access}`;


    return req;
})

export default axiosInstance;