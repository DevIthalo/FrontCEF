import SideBarUser from '@/components/SideBarUser'
import React from 'react'
import { useState } from 'react'
import styles from '@/styles/adminSideBar.module.css'


const Comment = () => {
    const [isToggle, setIsToggle] = useState(false);

    const handleValueChange = (value) => {
        setIsToggle(value);
      };
    return (
        <>
            <div className={styles.admin_container}>
                <SideBarUser onValueChange={handleValueChange}/>
            </div>
            
        </>
    )
}

export default Comment