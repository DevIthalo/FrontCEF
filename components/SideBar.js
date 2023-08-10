/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import styles from '@/styles/sideBar.module.css';
import AuthContext from '@/context/AuthContext';
import { CiHome, CiViewList, CiUser, CiChat1, CiGrid42 } from 'react-icons/ci'
import Link from 'next/link';
import { useRouter } from 'next/router';
const SideBar = ({ isOpen, isAdmin, handleCloseSideBar }) => {
    const { user, logoutUser } = useContext(AuthContext);
    const router = useRouter();

    return (
        <>
            <div className={`${styles.sidebar_container} ${isOpen ? styles.sidebar_container_toggle : ''}`}>
                <div>
                    <img src="/assets/images/logo2.jpg" width="240" height="86" alt="" />
                </div>
                <div className={styles.options}>
                    <Link href={'/'}>
                        <div className={`${router.pathname === '/' ? styles.selected : ''}`}>
                            <CiHome style={{ fontSize: 40 }} />
                            <p>Página Inicial</p>
                        </div>
                    </Link>
                    <Link href={'/noticias'}>
                        <div className={`${router.pathname === '/noticias' ? styles.selected : ''}`}>
                            <CiViewList style={{ fontSize: 40 }} />
                            <p>Notícias</p>
                        </div>
                    </Link>
                    {user?.isAdmin ?
                        <Link href={'/dashboard'}>
                            <div className={`${router.pathname === '/dashboard' ? styles.selected : ''}`}>
                                <CiGrid42 style={{ fontSize: 40 }} />
                                <p>Dashboard</p>
                            </div>
                        </Link> : ''
                    }
                    {user?.email ?
                        <>
                            <Link href={'/user/perfil'}>
                                <div className={`${router.pathname === '/user/perfil' ? styles.selected : ''}`}>
                                    <CiUser style={{ fontSize: 40 }} />
                                    <p>Perfil</p>
                                </div>
                            </Link>
                            <Link href={'/user/comments'}>
                                <div className={`${router.pathname === '/user/comments' ? styles.selected : ''}`}>
                                    <CiChat1 style={{ fontSize: 40 }} />
                                    <p>Seus Comentários</p>
                                </div>
                            </Link>
                            <a className={styles.button} onClick={logoutUser}>
                                <p>Logout</p>
                            </a>
                        </> :
                        <>
                            <Link className={styles.button} href={'/login'}>
                                <p>Login</p>
                            </Link>
                            <p style={{ textAlign: 'center' }}>Ainda sem cadastro? <Link style={{ color: '#013F7C' }} href={'/register'}>
                                Registre-se
                            </Link>
                            </p>
                        </>
                    }
                </div>
            </div>
            <div className={`${styles.overlay} ${isOpen ? styles.overlay_toggle : ''}`} onClick={handleCloseSideBar}></div>
        </>
    )
}

export default SideBar