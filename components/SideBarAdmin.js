/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { BsChatLeftText } from 'react-icons/bs'
import { BsPlusSquare, BsSend, BsEye } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';
import { LiaSearchSolid } from 'react-icons/lia';
import styles from '@/styles/adminSideBar.module.css';
import stylesNavbar from '@/styles/adminNavbar.module.css';
import { useState, useEffect } from 'react'
const SideBarAdmin = (props) => {
    const router = useRouter();

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);


    const openCloseSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
        props.onValueChange(!isSideBarOpen);
    }


    const handleResize = () => {
        if(window.innerWidth <= 1024){
            setIsSideBarOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>

            <div className={`${stylesNavbar.admin_main} ${isSideBarOpen ? stylesNavbar.admin_main_toggle : ''}`}>
                <div className={stylesNavbar.admin_main_navbar}>
                    <FiMenu className={stylesNavbar.admin_main_navbar_menu_icon} onClick={openCloseSideBar} />
                    {!props.isNew ? <div className={stylesNavbar.admin_main_search}>
                        <input type={'text'} name={'serch'} placeholder={'Pesquisar Postagens'} />
                        <a href=""><LiaSearchSolid className={stylesNavbar.admin_main_search_icon} /></a>
                    </div>
                        : <button className={stylesNavbar.admin_main_navbar_btn_view} onClick={props.handleOpenModal}><BsEye />Visualizar</button>}
                    {
                        !props.isNew ?
                            <Link href="#"><img src="/assets/images/profile_photo.webp" width={50} height={50} alt="" /></Link>
                            : <button className={stylesNavbar.admin_main_navbar_btn_publish}><BsSend />Publicar</button>
                    }
                </div>
            </div>
            <div className={`${styles.admin_sidebar_container} ${isSideBarOpen ? styles.admin_sidebar_open : ''} : ''}`}>

            <div className={`${styles.admin_sidebar} `}  >
                <div>
                    <Link href={'/'}>
                        <IoIosArrowBack className={`${styles.admin_sidebar_icon_back} `} />
                         <p>Página Inicial</p>
                    </Link>
                </div>
                <div>
                    <Link className={router.pathname === "/dashboard/new" ? styles.admin_sidebar_selected : ""} href={"/dashboard/new"}><BsPlusSquare className={styles.admin_sidebar_icon} />Nova Postagem</Link>
                </div>
                <div>
                    <Link className={router.pathname === "/dashboard" ? styles.admin_sidebar_selected : ""} href={"/dashboard"}><RxDashboard className={styles.admin_sidebar_icon} />Dashboard</Link>
                </div>
                <div>
                    <Link href={"#"}><BsChatLeftText className={styles.admin_sidebar_icon} />Comentários</Link>
                </div>
            </div>
            <div className={styles.overlay} onClick={openCloseSideBar}></div>

            </div>
        </>
    )
}

export default SideBarAdmin