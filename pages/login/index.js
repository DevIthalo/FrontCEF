/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/login.module.css'
import Image from 'next/image'
import Input from '@/components/Input'
import { IoIosArrowBack } from 'react-icons/io'
import Link from 'next/link'
import { parseCookies } from 'nookies'
const LoginPage = () => {
  const { loginUser, isLoading, setIsLoading, errors, setFormErrors } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(false);
    setFormErrors({});
  }, [setIsLoading])



  return (
    <>
      <div className={styles.login_navbar}>
        <div> <Link href={`/`}><IoIosArrowBack className={styles.login_back_icon} /></Link></div>
        <Link className={styles.register} href={'/register'}>Registre-se</Link>
      </div>
      <div className={styles.login_container}>
        <div className={styles.login_svg}>
          <img src={'/assets/images/welcome.svg'} />
          <h1>Seja bem-vindo!</h1>
        </div>
        <div className={styles.login_card}>
          <form className={styles.login_form} onSubmit={loginUser}>
            <Image className={styles.login_logo} src={"/assets/images/logo.png"} width={186} height={72} alt='Logo' />
            {errors?.details ? <div className={styles.error_credentials}>{errors.details}</div> : ""}
            <div>
              <label>Email</label>
              <input type={"email"} name={"email"} className={`${styles.input_email} ${errors?.email && styles.error_input}`} placeholder={"Digite seu email"} />
              {errors?.email && (<label className={styles.error_label}>{errors?.email}</label>)}
            </div>
            <div>
              <label>Senha</label>
              <input type={"password"} name={"password"} className={`${styles.input_password} ${errors?.password && styles.error_input}`} placeholder={"Digite sua senha"} />
              {errors?.password && (<label className={styles.error_label}>{errors?.password}</label>)}
            </div>
            <div>
              <Link className={styles.login_forgot_password} href={'/login/reset/'}>Esqueceu sua senha?</Link>
            </div>
            <button type='submit' className={!isLoading ? styles.input_btn : styles.input_btn_none} disabled={isLoading}>Logar</button>
            {isLoading && <img src='assets/images/loading.svg' style={{ padding: '5px', margin: '0 auto' }} width={60} height={60} />}
            <p className={styles.login_register}>Ainda não possui cadastro? <Link href={'/register'}>Registre-se</Link></p>
          </form>
        </div>

      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { ['authTokens']: token } = parseCookies(ctx);
  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default LoginPage