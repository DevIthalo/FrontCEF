import React, { useState } from 'react'
import adminStyles from '@/styles/admin.module.css'
import SideBarAdmin from '@/components/SideBarAdmin'
import NavbarAdmin from '@/components/NavbarAdmin';
import { CustomEditor } from '@/components/CustomEditor';
import styles from '@/styles/adminNew.module.css'
import Modal from '@/components/Modal';

const PostRegister = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [isToggle, setIsToggle] = useState(true);

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
    const handleValueChange = (value) =>{
        setIsToggle(value);
    }

    return (
        <>
            <SideBarAdmin isNew={true} handleOpenModal={handleOpenModal} onValueChange={handleValueChange}/>

            <div className={`${styles.new_container} ${isToggle ? styles.new_container_toggle : ''}`}>
                <div className={styles.new_title}>
                    <label>Título</label>
                    <label>Seja específico e suscinto, imagine um título de um jornal (simples, mas chamativo)</label>
                    <input type="text" onChange={handleTitle} />
                </div>
                <div className={styles.new_content}>
                    <label>Conteúdo</label>
                    <label>Utilize o botão de visualizar para ver como o conteúdo vai ficar quando for publicado</label>
                    <CustomEditor handleOnEditorChange={handleOnEditorChange} />
                </div>
                {content}
            </div>
            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal}>
                <h1>{title}</h1><br />
                <div dangerouslySetInnerHTML={{ __html: '<div style="line-height:1.4;word-wrap:break-word">' + content + '</div>' }} />
            </Modal>
        </>
    )
}

export default PostRegister