import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/reset_password.module.css'
import Image from 'next/image'
import axios from 'axios'
import { parseCookies } from 'nookies'

const ResetPasswordConfirm = () => {
    const router = useRouter();
    const { push } = useRouter();
    const { token } = router.query;
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState();
    const [error, setError] = useState();
    const [messageOk, setMessageOk] = useState();
    const [isLoading, setIsLoading] = useState();

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setConfirmPasswordError("");
    }

    const handlePasswordConfirm = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError("");

    }

    const updatePassword = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            setConfirmPasswordError("As senhas estão diferentes");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:8000/api/reset/password/confirm/", { token, password, confirmPassword }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            

            if (response.status === 204){
                setError("Preencha os campos em branco");
                setIsLoading(false);
                const interval = setTimeout(() => {
                    setError('');
                }, 2500)
                return () => clearTimeout(interval);
            }else{
                setMessageOk(response.data.success);
                const timeout = setTimeout(() => {
                    setMessageOk('');
                    setIsLoading(false);
                    push('/login');
                }, 2500);
                return () => clearTimeout(timeout);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                setError(error.response.data.error);
                const interval = setTimeout(() => {
                    setError('');
                }, 2500)
                return () => clearTimeout(interval);
            }
        }
    }

    return (
        <div className={styles.reset_container}>
            <div className={styles.reset_card}>
                <h3 style={{ textAlign: 'center' }}>Redefinição de Senha</h3>
                <Image src={'/assets/images/forgot.svg'} width={200} height={200} alt='Password Image' />
                {error ? <p className={styles.reset_error}>{error}</p> : ''}
                {messageOk ? <p className={styles.reset_ok}>{messageOk}</p> : ''}
                <form onSubmit={updatePassword}>
                    <input type="password" onChange={handlePassword} placeholder='Digite sua nova senha' />
                    <input type="password" onChange={handlePasswordConfirm} placeholder='Confirme sua nova senha' />
                    {confirmPasswordError ? <p style={{ fontSize: 12, color: 'red' }}>{confirmPasswordError}</p> : ''}
                    {!isLoading ? <button type='submit' disabled={password && confirmPassword ? false : true}>Alterar</button> : <Image style={{ marginTop: '10px' }} src={"/assets/images/loading.svg"} height={30} width={30} alt='Loading' />}
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const { ['authTokens']: authToken } = parseCookies(ctx);
    if (authToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const { token } = ctx.params;
    try {
        await axios.post("http://127.0.0.1:8000/api/reset/password/confirm/",  {token} , {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default ResetPasswordConfirm