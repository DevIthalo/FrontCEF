import React from 'react'
import styles from '@/styles/footer.module.css'
import Link from 'next/link'
import { BsSend } from 'react-icons/bs'
import { BiLink } from 'react-icons/bi'
import { TbSend } from 'react-icons/tb'
import Image from 'next/image'
const Footer = () => {
    return (
        <div className={styles.footer}>
            <ul className={styles.ul}>
                <div className={styles.logo}>
                    <li><Link href={`/`}><Image src={`/assets/images/logo2.jpg`} alt="Logo" width="240" height="86" /></Link></li>
                </div>
                <div className={styles.novidades}>
                    <li><BsSend className={styles.icon} /> Receba Novidades</li>
                    <li>Inscreva-se e receba todas as novidades sobre concursos e seleções por e-mail.</li>
                    <div className={styles.send}>
                        <input type="text" placeholder='Digite seu email' />
                        <a href="#"><TbSend /> Inscreva-se</a>
                    </div>
                </div>
                <div className={styles.links}>
                    <div className={styles.title}><BiLink className={styles.icon} /> Navegue na Página</div>
                    <ul>
                        <div>
                            <li>Sobre nós</li>
                            <li>Concursos e Seleções    </li>
                            <li>Área do Candidato</li>
                            <li>Atendimento</li>
                        </div>
                        <div>
                            <li>Perguntas Frequentes</li>
                            <li>Trabalhe Conosco</li>
                            <li>Fale Conosco</li>
                            <li>Notícias</li>
                        </div>
                    </ul>
                    
                </div>
                <div className={styles.bottom_mobile}>
                    <p>&copy; 2023 Todos os direitos reservados</p>
                </div>
            </ul>
            <div className={styles.bottom_pc}>
                <p>&copy; 2023 Todos os direitos reservados</p>
            </div>
        </div>
    )
}

export default Footer