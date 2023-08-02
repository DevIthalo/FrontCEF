import React from 'react'
import styles from '@/styles/threeDotMenu.module.css';
import {FaRegEdit} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'

const ThreeDotMenu = ({isVisible, onEdit, onDelete, isAdmin}) => {
  return (
    isVisible ? 
    <ul className={styles.menu}>
      {!isAdmin ? <li onClick={onEdit}><FaRegEdit style={{fontSize: 20}}/> Editar</li>:''}
      <li onClick={onDelete}><AiOutlineDelete style={{fontSize: 22}}/> Excluir</li>
    </ul>
    : 
    ''
    
  )
}

export default ThreeDotMenu