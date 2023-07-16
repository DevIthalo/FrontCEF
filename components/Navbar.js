import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/styles/navbar.module.css'
import AuthContext from '@/context/AuthContext'
import { BiMenu } from 'react-icons/bi'
import Image from 'next/image'
import { AiOutlineHome } from 'react-icons/ai'
import { useRouter } from 'next/router'
const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  }

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  }
  const handleTouchMove = (event) => {
    const currentX = event.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      setMenuOpen(false); // Fechar a navbar lateral
    }
  }

  return (
    <>
      <ul onTouchMove={handleTouchMove} onTouchStart={handleTouchStart} className={`${styles.menu_lateral} ${isMenuOpen ? styles.menu_open : ''}`}>
        <div className={styles.show}>
          <li className={styles.menu_image}><Link href={`/`}><Image src={`/assets/images/logo.png`} alt="Logo" width={186} height={72} /></Link></li>
          <div className={styles.menu_link}>
            <div className={styles.menu_links}>
              <li><Link className={`${router.pathname === '/' ? styles.menu_links_backgroud : ''}`} href={`/`}><AiOutlineHome className={styles.iconHome} />  Página Inicial</Link></li>
            </div>
            <div className={styles.menu_container}>
              
              <Link className={styles.menu_login} href={`/login`}>Login</Link>
              <br/>
              <li>Ainda não possui cadastro? <a className={styles.menu_register} href="#">Registre-se</a></li>
            </div>
          </div>


        </div>
        <div className={styles.overlay} onClick={toggleMenu}></div>

      </ul>

      <ul className={styles.ul}>
        <div className={styles.logo}>
          <li><Link href={`/`}><Image src={`/assets/images/logo.png`} alt="Logo" width={186} height={72} /></Link></li>
        </div>
        <div className={styles.links}>
          <li className={`${router.pathname === '/' ? styles.menu_links_border_bottom : ''}`}><Link className={styles.hover} href={`/`}>Página Inicial</Link></li>
          <li className={`${router.pathname === '/posts' ? styles.menu_links_border_bottom : ''}`}><Link className={styles.hover} href={`/posts`}>Notícias</Link></li>
        </div>
        <div className={styles.user}>
          {user ? (
            <div>
              <li>Bem-vindo {user.email}</li>
              <li><a href='#' onClick={logoutUser}>Logout</a></li>
            </div>
          )
            : (
              <div>
                <li className={styles.login}><Link href={`/login`}>Login</Link></li>
                <li className={styles.register}><a href="#">Registre-se</a></li>
              </div>
            )
          }
        </div>
        <BiMenu className={styles.menu_btn} onClick={toggleMenu} />
      </ul>
    </>
  )
}

export default Navbar