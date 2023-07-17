/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState, useEffect } from 'react'
import styles from '@/styles/login.module.css'
import Image from 'next/image'
import Input from '@/components/Input'
import { IoIosArrowBack } from 'react-icons/io'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import AuthContext from '@/context/AuthContext'

const Register = () => {
  const { registerUser, isLoading, setIsLoading, errors, setFormErrors } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(false);
    setFormErrors({});
  }, [setIsLoading])

  return (
    <>
      <div className={styles.login_navbar}>
        <div> <Link href={`/`}><IoIosArrowBack className={styles.login_back_icon} /></Link></div>
        <Link className={styles.register} href={'login'}>Login</Link>
      </div>
      <div className={styles.login_container}>
        <div className={styles.login_svg}>
          <img src={'/assets/images/sign_up.svg'} />
          <h1>Faça o cadastro <br />e seja bem-vindo!</h1>
        </div>
        <div className={styles.login_card}>
          <form className={styles.login_form} onSubmit={registerUser}>
            <Image className={styles.login_logo} src={"/assets/images/logo.png"} width={186} height={72} alt='Logo' />
            <div>
              <label>Email</label>
              <input type={"text"} name={"email"} className={`${styles.input_email} ${errors?.email && styles.error_input}`} placeholder={"Digite seu email"} />
              {errors?.email && (<label className={styles.error_label}>{errors?.email}</label>)}
            </div>
            <div>
              <label>Senha</label>
              <input type={"password"} name={"password"} className={`${styles.input_password} ${errors?.password && styles.error_input}`} placeholder={"Digite sua senha"} />
              {errors?.password && (<label className={styles.error_label}>{errors?.password}</label>)}
            </div>
            <div>
              <label>Repita sua senha</label>
              <input type={"password"} name={"confirm_password"} className={`${styles.input_confirm_password} ${errors?.confirm_password && styles.error_input}`} placeholder={"Digite sua senha novamente"} />
              {errors?.confirm_password && (<label className={styles.error_label}>{errors?.confirm_password}</label>)}
            </div>
            <button type='submit' className={!isLoading ? styles.input_btn : styles.input_btn_none} disabled={isLoading}>Cadastrar</button>
            {isLoading && <img src='assets/images/loading.svg' style={{ padding: '5px', margin: '0 auto' }} width={60} height={60} />}
            <p className={styles.login_register}>Já possui um cadastro? <Link href="/login">Faça login</Link></p>
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

export default Register