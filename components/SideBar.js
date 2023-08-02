/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import styles from '@/styles/sideBar.module.css';
import AuthContext from '@/context/AuthContext';
import {CiHome,CiViewList} from 'react-icons/ci'
import Link from 'next/link';
import { useRouter } from 'next/router';
const SideBar = ({isOpen, isAdmin, handleCloseSideBar}) => {
    const {user} = useContext(AuthContext);
    const router = useRouter();

    return (
        <>
            <div className={`${styles.sidebar_container} ${isOpen ? styles.sidebar_container_toggle : ''}`}>
                <div>
                    <img src="/assets/images/logo2.jpg" width="240" height="86" alt="" />
                </div>
                <div className={styles.options}>
                    <Link  href={'/'}>
                        <div className={`${router.pathname === '/' ? styles.selected : ''}`}>
                            <CiHome style={{fontSize: 40}}/>
                            <p>Página Inicial</p>
                        </div>
                    </Link>
                    <Link href={'/noticias'}>
                        <div className={`${router.pathname === '/noticias' ? styles.selected : ''}`}>
                            <CiViewList style={{fontSize: 40}}/>
                            <p>Notícias</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={`${styles.overlay} ${isOpen ? styles.overlay_toggle : ''}`} onClick={handleCloseSideBar}></div>
        </>
    )
}

export default SideBar