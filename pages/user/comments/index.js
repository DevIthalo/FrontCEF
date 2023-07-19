import SideBarUser from '@/components/SideBarUser'
import React from 'react'
import NavbarUser from '@/components/NavbarUser'
import { useState } from 'react'
import styles from '@/styles/adminSideBar.module.css'


const Comment = () => {
    const [isToggle, setIsToggle] = useState(false);

    const handleToggle = () => {
        setIsToggle(!isToggle);
    }
    return (
        <>
            <div className={styles.admin_container}>
                <SideBarUser isToggle={isToggle} />
                <NavbarUser isToggle={isToggle} isNew={false} handleToggle={handleToggle} />
            </div>

        </>
    )
}

export default Comment