import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { BiEdit } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { BiCommentDetail } from 'react-icons/bi'
import { useRouter } from 'next/router';

import styles from '@/styles/adminSideBar.module.css'
const SideBarUser = (props) => {
    const router = useRouter();

    const [isSideBarOpen, setIsSideBarOpen] = useState(props.isSideBarOpen);

    const closeSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    }

    return (
        <>
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
                <div className={styles.overlay} onClick={closeSideBar}></div>
            </div>
        </>

    )
}

export default SideBarUser