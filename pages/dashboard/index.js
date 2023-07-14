import React, { useState } from 'react'
import styles from '@/styles/admin.module.css';
import { FiMenu } from 'react-icons/fi'
import { LiaSearchSolid } from 'react-icons/lia';
import { IoIosArrowBack } from 'react-icons/io'
import { BsChatLeftText } from 'react-icons/bs'
import { BsPlusSquare } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import Link from 'next/link';
import { useRouter } from 'next/router';
function Admin() {
    const router = useRouter();
    const [isToggle, setIsToggle] = useState();

    const handleToggle = () => {
        setIsToggle(!isToggle);
    }

    return (
        <div className={styles.admin_container}>
            <div className={`${styles.admin_sidebar} ${isToggle && styles.admin_sidebar_toggle}`}  >
                <div>
                    <Link href={'/'}>
                        <IoIosArrowBack className={`${styles.admin_sidebar_icon_back} `} />
                        {!isToggle && <p>Página Inicial</p>}
                    </Link>
                </div>
                <div>
                    <Link className={router.pathname === "/dashboard/new" ? styles.admin_sidebar_selected : ""} href={"#"}><BsPlusSquare className={styles.admin_sidebar_icon} />{!isToggle && 'Nova Postagem'}</Link>
                </div>
                <div>
                    <Link className={router.pathname === "/dashboard" ? styles.admin_sidebar_selected : ""} href={"#"}><RxDashboard className={styles.admin_sidebar_icon} />{!isToggle && 'Dashboard'}</Link>
                </div>
                <div>
                    <Link href={"#"}><BsChatLeftText className={styles.admin_sidebar_icon} />{!isToggle && 'Comentários'}</Link>
                </div>
            </div>
            <div className={`${styles.admin_main} ${isToggle && styles.admin_main_toggle}`}>
                <div className={styles.admin_main_navbar}>
                    <FiMenu className={styles.admin_main_navbar_menu_icon} onClick={handleToggle} />
                    <div className={styles.admin_main_search}>
                        <input type={'text'} name={'serch'} placeholder={'Pesquisar Postagens'} />
                        <a href=""><LiaSearchSolid className={styles.admin_main_search_icon} /></a>
                    </div>
                    <Link href="#"><img src="assets/images/profile_photo.webp" width={50} height={50} alt="" /></Link>
                </div>
            </div>
        </div>
    )
}

export default Admin