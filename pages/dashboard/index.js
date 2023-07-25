/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styles from '@/styles/admin.module.css';
import SideBarAdmin from '@/components/SideBarAdmin';
import NavbarAdmin from '@/components/NavbarAdmin';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';

function Admin() {
    const [isToggle, setIsToggle] = useState(true);

    const handleValueChange = (value) => {
        setIsToggle(value);
    }
    return (
        <>
            <SideBarAdmin onValueChange={handleValueChange} />
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const { ['authTokens']: token } = parseCookies(ctx);
    
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const data = JSON?.parse(token);
    const tokenInfo = jwtDecode(data.access);
    if(!tokenInfo.isAdmin){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}


export default Admin