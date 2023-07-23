/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { BiEdit } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { BiCommentDetail } from 'react-icons/bi'
import { useRouter } from 'next/router';
import stylesNavbar from '@/styles/adminNavbar.module.css';
import { BsSend } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi'
import styles from '@/styles/adminSideBar.module.css'
const SideBarUser = (props) => {
    const router = useRouter();

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [isEditable, setIsEditable] = useState(false);

    const openCloseSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
        props.onValueChange(!isSideBarOpen);
    }


    const handleResize = () => {
        if (window.innerWidth <= 1024) {
            setIsSideBarOpen(false);
            props.onValueChange(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        ((props.data?.nome ||
            props.data?.sobrenome ||
            props.data?.logradouro ||
            props.data?.cep ||
            props.data?.bairro ||
            props.data?.cidade ||
            props.data?.estado ||
            props.data?.numero ||
            props.data?.complemento ||
            props.data?.fixo ||
            props.data?.celular ||
            props.data?.cpf) && (props.isEditCpf != false || props.isEditContato != false || props.isEditEndereco != false || props.isEditBasic != false)) ? setIsEditable(true) : setIsEditable(false);
    }, [props.data, props.isEditBasic, props.isEditContato, props.isEditEndereco, props.isEditCpf])


    return (
        <>
            <div>
                <div className={`${stylesNavbar.admin_main} ${!isSideBarOpen ? stylesNavbar.admin_main_toggle : ''}`}>
                    <div className={stylesNavbar.admin_main_navbar}>
                        <FiMenu className={stylesNavbar.admin_main_navbar_menu_icon} onClick={openCloseSideBar} />
                        <p>Olá, Seja Bem-Vindo!</p>
                        <button className={stylesNavbar.admin_main_navbar_btn_publish} onClick={props.sendData} disabled={!isEditable}><BsSend />Atualizar</button>
                    </div>
                </div>
            </div>
            <div className={`${styles.admin_sidebar_container} ${isSideBarOpen ? styles.admin_sidebar_open : ''} : ''}`}>
                <div className={`${styles.admin_sidebar}`}>
                    <div>
                        <Link href={'/'}>
                            <IoIosArrowBack className={`${styles.admin_sidebar_icon_back} `} />
                            {!props.isToggle && <p>Página Inicial</p>}
                        </Link>
                    </div>
                    <div>
                        <Link className={router.pathname === "/user/perfil" ? styles.admin_sidebar_selected : ""} href={"/user/perfil"}><CgProfile className={styles.admin_sidebar_icon} />{!props.isToggle && 'Perfil'}</Link>
                    </div>
                    <div>
                        <Link className={router.pathname === "/user/comments" ? styles.admin_sidebar_selected : ""} href={"/user/comments"}><BiCommentDetail className={styles.admin_sidebar_icon} />{!props.isToggle && 'Seus Comentários'}</Link>
                    </div>
                </div>
                <div className={styles.overlay} onClick={openCloseSideBar}></div>
            </div>

        </>

    )
}

export default SideBarUser