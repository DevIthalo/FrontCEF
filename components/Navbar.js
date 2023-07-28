/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/styles/navbar.module.css'
import AuthContext from '@/context/AuthContext'
import { BiMenu } from 'react-icons/bi'
import Image from 'next/image'
import { AiOutlineHome } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { BiEdit } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { BiCommentDetail, BiSolidDashboard } from 'react-icons/bi'
import { MdLogout } from 'react-icons/md'

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  }

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
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
          <li className={styles.menu_image}><Link href={`/`}><img src="/assets/images/logo.png" alt="Logo" width="186" height="72" /></Link></li>
          <div className={styles.menu_link}>
            <div className={styles.menu_links}>
              <li><Link className={`${router.pathname === '/' ? styles.menu_links_backgroud : ''}`} href={`/`}><AiOutlineHome className={styles.iconHome} />  Página Inicial</Link></li>
            </div>
            <div className={styles.menu_container}>
              <Link className={styles.menu_login} href={`/login`}>Login</Link>
              <br />
              <li>Ainda não possui cadastro? <Link className={styles.menu_register} href={`/register`}>Registre-se</Link></li>
            </div>
          </div>
        </div>
        <div className={styles.overlay} onClick={toggleMenu}></div>

      </ul>

      <ul className={styles.ul}>
        <div className={styles.logo}>
          <li><Link href={`/`}><img src='/assets/images/logo.png' alt="Logo" width="186" height="72" /></Link></li>
        </div>
        <div className={styles.links}>
          <li className={`${router.pathname === '/' ? styles.menu_links_border_bottom : ''}`}><Link className={styles.hover} href={`/`}>Página Inicial</Link></li>
          <li className={`${router.pathname === '/noticias' ? styles.menu_links_border_bottom : ''}`}><Link className={styles.hover} href={`/noticias`}>Notícias</Link></li>
        </div>
        <div className={styles.user}>
          {user ? (
            <div>
              <Image onClick={toggleDropDown} className={`${styles.profile_photo}`} src={`/assets/images/profile_photo.webp`} width={50} height={50} alt='Profile Photo' />
              <div className={`${styles.dropdown_container} ${isDropDownOpen ? styles.toggle_dropdown_open : ''}`} style={user.isAdmin ? { height: '220px' } : { height: '180px' }}>
                <div className={styles.dropdown_info} >
                  <br />
                  <div className={styles.dropdown_info_container}>
                    <Link href={`/user/perfil`}>
                      <div className={styles.dropdown_info_separated}>
                        <CgProfile className={styles.dropdown_info_separated_icon} />
                        <p>Ver perfil</p>
                      </div>
                    </Link>
                    <Link href={'/user/comments'}>
                      <div className={styles.dropdown_info_separated}>
                        <BiCommentDetail className={styles.dropdown_info_separated_icon} />
                        <p>Seus comentários</p>
                      </div>
                    </Link>
                    {user.isAdmin && (
                      <Link href={'/dashboard'}>
                        <div className={styles.dropdown_info_separated}>
                          <BiSolidDashboard className={styles.dropdown_info_separated_icon} />
                          <p>Dashboard</p>
                        </div>
                      </Link>
                    )}
                    <a onClick={logoutUser} style={{ cursor: 'pointer' }}>
                      <div className={`${styles.dropdown_info_separated} ${styles.dropdown_info_logout}`}>
                        <MdLogout className={styles.dropdown_info_separated_icon} />
                        <p>Logout</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
            : (
              <div className={styles.user_login_register}>
                <li className={styles.login}><Link href={`/login`}>Login</Link></li>
                <li className={styles.register}><Link href={`/register`}>Registre-se</Link></li>
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