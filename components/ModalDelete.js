import React from 'react'
import styles from '@/styles/modalDelete.module.css'

const ModalDelete = ({ isOpen, children, handleCloseModal, deletePost }) => {
    return (
        <div>
            <div className={`${styles.modal_card} ${isOpen ? styles.modal_card_toggle : ''}`}>
                {children}
                <div className={styles.modal_options}>
                    <button onClick={handleCloseModal}>Cancelar</button>
                    <button onClick={deletePost}>Apagar</button>
                </div>
            </div>
            <div className={`${styles.modal_overlay} ${isOpen ? styles.modal_overlay_toggle : ''}`} onClick={handleCloseModal}></div>
        </div>
    )
}

export default ModalDelete