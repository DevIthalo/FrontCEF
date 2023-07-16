import React from 'react'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { BsChatLeftText } from 'react-icons/bs'
import { BsPlusSquare } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { useRouter } from 'next/router';

import styles from '@/styles/adminSideBar.module.css'
const SideBarAdmin = (props) => {
    const router = useRouter();

    return (
        <div className={`${styles.admin_sidebar} ${props.isToggle && styles.admin_sidebar_toggle}`}  >
            <div>
                <Link href={'/'}>
                    <IoIosArrowBack className={`${styles.admin_sidebar_icon_back} `} />
                    {!props.isToggle && <p>Página Inicial</p>}
                </Link>
            </div>
            <div>
                <Link className={router.pathname === "/dashboard/new" ? styles.admin_sidebar_selected : ""} href={"/dashboard/new"}><BsPlusSquare className={styles.admin_sidebar_icon} />{!props.isToggle && 'Nova Postagem'}</Link>
            </div>
            <div>
                <Link className={router.pathname === "/dashboard" ? styles.admin_sidebar_selected : ""} href={"/dashboard"}><RxDashboard className={styles.admin_sidebar_icon} />{!props.isToggle && 'Dashboard'}</Link>
            </div>
            <div>
                <Link href={"#"}><BsChatLeftText className={styles.admin_sidebar_icon} />{!props.isToggle && 'Comentários'}</Link>
            </div>
        </div>
    )
}

export default SideBarAdmin