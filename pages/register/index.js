/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState, useEffect } from 'react'
import styles from '@/styles/login.module.css'
import Image from 'next/image'
import Input from '@/components/Input'
import { IoIosArrowBack } from 'react-icons/io'
import Link from 'next/link'
import { parseCookies } from 'nookies'

const Register = () => {
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
          <form className={styles.login_form}>
            <Image className={styles.login_logo} src={"/assets/images/logo.png"} width={186} height={72} alt='Logo' />
            <label>Email</label>
            <Input type={"text"} name={"email"} placeholder={"Digite seu email"} />
            <label>
              Senha
            </label>
            <Input type={"password"} name={"password"} placeholder={"Digite sua senha"} />
            <label>
              Repita sua senha
            </label>
            <Input type={"password"} name={"repeadPassword"} placeholder={"Digite sua senha novamente"} />
            <input className={styles.input_btn} type={"submit"} value={"Cadastrar"} />
            <div className={styles.login_register}>Já possui um cadastro? <Link href="/login">Faça login</Link></div>
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