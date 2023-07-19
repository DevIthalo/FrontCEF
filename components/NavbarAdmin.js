/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { LiaSearchSolid } from 'react-icons/lia'
import { BsEye, BsSend } from 'react-icons/bs'
import Link from 'next/link'
import styles from '@/styles/adminNavbar.module.css'
const NavbarAdmin = (props) => {
    return (
        <div className={`${styles.admin_main} ${props.isToggle && styles.admin_main_toggle}`}>
            <div className={styles.admin_main_navbar}>
                <FiMenu className={styles.admin_main_navbar_menu_icon} onClick={props.handleToggle} />
                {!props.isNew ? <div className={styles.admin_main_search}>
                    <input type={'text'} name={'serch'} placeholder={'Pesquisar Postagens'} />
                    <a href=""><LiaSearchSolid className={styles.admin_main_search_icon} /></a>
                </div>
                    : <button className={styles.admin_main_navbar_btn_view} onClick={props.handleOpenModal}><BsEye />Visualizar</button>}
                {
                    !props.isNew ?
                        <Link href="#"><img src="/assets/images/profile_photo.webp" width={50} height={50} alt="" /></Link>
                        : <button className={styles.admin_main_navbar_btn_publish}><BsSend />Publicar</button>
                }
            </div>
        </div>
    )
}

export default NavbarAdmin