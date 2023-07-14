import React from 'react'
import styles from '@/styles/input.module.css'
const Input = (props) => {
    return (
        <input className={styles.input} type={props.type} name={props.name} placeholder={props.placeholder} />
    )
}

export default Input