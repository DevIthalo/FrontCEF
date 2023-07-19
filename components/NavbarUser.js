/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { BsSend} from 'react-icons/bs'

import styles from '@/styles/adminNavbar.module.css'
const NavbarUser = (props) => {
    const handleClick = ()=>{
        console.log("Testando")
    }
    return (
        <div className={`${styles.admin_main} ${props.isToggle && styles.admin_main_toggle}`}>
            <div className={styles.admin_main_navbar}>
                <FiMenu className={styles.admin_main_navbar_menu_icon} onClick={props.handleToggle} />
                <p>Olá, Seja Bem-Vindo!</p>
                <button className={styles.admin_main_navbar_btn_publish} disabled={(props.isEditEndereco === false && props.isEditBasic === false && props.isEditCpf === false) ? true : false} onClick={handleClick}><BsSend/>Atualizar</button>
            </div>
        </div>
    )
}

export default NavbarUser