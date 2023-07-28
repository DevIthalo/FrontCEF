import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '@/styles/noticiaById.module.css'

const NoticiaById = () => {
  return (
    <>
    <Navbar/>
        <div style={{minHeight: '120vh'}}>
            <div className={styles.noticia_container}>
                <div className={styles.noticia_title}>Listagem de notícia</div>
            </div>
        </div>
    <Footer/>
    </>
  )
}

export default NoticiaById