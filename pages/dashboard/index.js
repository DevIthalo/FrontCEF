/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import SideBarAdmin from '@/components/SideBarAdmin';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';
import styles from '@/styles/adminDashboard.module.css'
import Image from 'next/image';
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import Link from 'next/link';

function Admin() {
    const [isToggle, setIsToggle] = useState(true);

    const handleValueChange = (value) => {
        setIsToggle(value);
    }
    return (
        <>
            <SideBarAdmin onValueChange={handleValueChange} />
            <div className={`${styles.dashboard_container} ${!isToggle ? styles.dashboard_container_toggle : ''}`}>
                <div className={styles.dashboard_card}>
                    <Link style={{ textDecoration: 'none', color: '#222' }} href={'/dashboard/edit/02914092147'}>
                        <div className={styles.dashboard_card_container}>
                            <div className={styles.dashboard_image_container}>
                                <Image src={'/assets/images/students.jpeg'} className={styles.dashboard_image} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} width={80} height={80} alt={'Image Dashboard'} />
                                <div className={styles.dashboard_title_container}>
                                    <h3>Hello World</h3>
                                    <p style={{ fontSize: 12 }}>Publicada&nbsp;&bull; 9 de Julho </p>
                                </div>
                            </div>
                            <div className={styles.dashboard_options}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <AiOutlineEye className={styles.icon} style={{ fontSize: '25px', color: '#333' }} />
                                    <AiFillDelete className={styles.icon} style={{ fontSize: '25px', color: '#333' }} />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <p style={{ fontSize: 15, display: 'flex', alignItems: 'center', gap: '5px' }}>1 <BiCommentDetail /></p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
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
    if (!tokenInfo.isAdmin) {
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