/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import styles from '@/styles/admin.module.css';
import SideBarAdmin from '@/components/SideBarAdmin';
import NavbarAdmin from '@/components/NavbarAdmin';

function Admin() {
    const [isToggle, setIsToggle] = useState(true);

    const handleValueChange = (value) => {
        setIsToggle(value);
    }
    return (
        <>
            <SideBarAdmin onValueChange={handleValueChange} />
        </>
    )
}

export default Admin