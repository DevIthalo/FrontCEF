import React from 'react'
import styles from '@/styles/threeDotMenu.module.css';
import {FaRegEdit} from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
import {BsEye} from 'react-icons/bs'

const ThreeDotMenuDashboard = ({isVisible, onEdit, onDelete, onView}) => {
  return (
    isVisible ? 
    <ul className={styles.menu}>
      <li onClick={onEdit}><FaRegEdit style={{fontSize: 20}}/> Editar</li>
      <li onClick={onDelete}><AiOutlineDelete style={{fontSize: 22}}/> Apagar</li>
      <li onClick={onView}><BsEye style={{fontSize: 22}}/> Visualizar</li>
    </ul>
    : 
    ''
    
  )
}

export default ThreeDotMenuDashboard