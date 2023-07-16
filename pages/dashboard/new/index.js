import React, { useState } from 'react'
import adminStyles from '@/styles/admin.module.css'
import SideBarAdmin from '@/components/SideBarAdmin'
import NavbarAdmin from '@/components/NavbarAdmin';
import { CustomEditor } from '@/components/CustomEditor';
import styles from '@/styles/adminNew.module.css'
import Modal from '@/components/Modal';

const PostRegister = () => {
    const [isToggle, setIsToggle] = useState(true);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const handleToggle = () => {
        setIsToggle(!isToggle);
    }
    const handleOnEditorChange = (content, editor) => {
        setContent(content);
    }
    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
        <div className={adminStyles.admin_container}>
            <SideBarAdmin isToggle={isToggle} />
            <NavbarAdmin isToggle={isToggle} handleOpenModal={handleOpenModal} isNew={true} handleToggle={handleToggle} />
        </div>
        <div className={`${styles.new_container} ${isToggle && styles.new_container_toggle}`}>
            <div className={styles.new_title}>
                <label>Título</label>
                <label>Seja específico e suscinto, imagine um título de um jornal (simples, mas chamativo)</label>
                <input type="text" onChange={handleTitle}/>
            </div>
            <div className={styles.new_content}>
                <label>Conteúdo</label>
                <label>Edite o conteúdo da forma que quiser</label>
                <CustomEditor handleOnEditorChange={handleOnEditorChange}/>
            </div>
        </div>
        <Modal isOpen={modalOpen} onRequestClose={handleCloseModal}>
            <h1>{title}</h1><br/>
            <div dangerouslySetInnerHTML={{ __html: '<div style="line-height:1.5;word-wrap:break-word">'+content+'</div>'} }/>
        </Modal>
        {content}
     </>
    )
}

export default PostRegister