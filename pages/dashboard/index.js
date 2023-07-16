/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styles from '@/styles/admin.module.css';
import SideBarAdmin from '@/components/SideBarAdmin';
import NavbarAdmin from '@/components/NavbarAdmin';

function Admin() {
    const [isToggle, setIsToggle] = useState(true);

    const handleToggle = () => {
        setIsToggle(!isToggle);
    }

    return (
        <div className={styles.admin_container}>
            <SideBarAdmin isToggle={isToggle}/>
            <NavbarAdmin isToggle={isToggle} isNew={false} handleToggle={handleToggle}/>
        </div>
    )
}

export default Admin