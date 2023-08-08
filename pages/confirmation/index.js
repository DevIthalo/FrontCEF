'use client';
import React, { useContext, useEffect, useState } from 'react'
import styles from '@/styles/emailConfirmation.module.css'
import Image from 'next/image'
import { useRef } from 'react'
import axios from 'axios'
import AuthContext from '@/context/AuthContext'
import { parseCookies } from 'nookies';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

const EmailConfirmation = () => {

    const { user } = useContext(AuthContext);
    const [numbers, setNumbers] = useState();
    const [count, setCount] = useState(15);
    const [isDisabled, setIsDisabled] = useState(true);
    const [invalidCodeMsg, setInvalidCodeMsg] = useState();
    const { push } = useRouter();


    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const inputRef5 = useRef(null);
    const inputRef6 = useRef(null);

    const handleInputChange1 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef2.current.focus();
        }
        setNumbers(
            inputRef1.current.value
            + "" + inputRef2.current.value + "" +
            inputRef3.current.value + "" +
            inputRef4.current.value + "" +
            inputRef5.current.value + "" +
            inputRef6.current.value
        );

    };
    const handleInputChange2 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef3.current.focus();
        }
        setNumbers(
            inputRef1.current.value
            + "" + inputRef2.current.value + "" +
            inputRef3.current.value + "" +
            inputRef4.current.value + "" +
            inputRef5.current.value + "" +
            inputRef6.current.value
        );
    };
    const handleInputChange3 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef4.current.focus();
        }
        setNumbers(
            inputRef1.current.value
            + "" + inputRef2.current.value + "" +
            inputRef3.current.value + "" +
            inputRef4.current.value + "" +
            inputRef5.current.value + "" +
            inputRef6.current.value
        );
    };
    const handleInputChange4 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef5.current.focus();
        }
        setNumbers(
            inputRef1.current.value
            + "" + inputRef2.current.value + "" +
            inputRef3.current.value + "" +
            inputRef4.current.value + "" +
            inputRef5.current.value + "" +
            inputRef6.current.value
        );
    };
    const handleInputChange5 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef6.current.focus();
        }
        setNumbers(
            inputRef1.current.value + "" +
            inputRef2.current.value + "" +
            inputRef3.current.value + "" +
            inputRef4.current.value + "" +
            inputRef5.current.value + "" +
            inputRef6.current.value
        );
    };
    const handleInputChange6 = (event) => {
        const inputValue = event.target.value;
        setNumbers(
            inputRef1.current.value
            + "" + inputRef2.current.value + "" +
            inputRef3.current.value + "" +
            inputRef4.current.value + "" +
            inputRef5.current.value + "" +
            inputValue
        );
    }

    const handleInput = (event) => {
        const pasteData = event.clipboardData.getData('text/plain');
        const numericValue = pasteData.trim();

        if (/^\d+$/.test(numericValue)) {
            const digits = numericValue.split('');

            if (digits.length >= 6) {
                inputRef1.current.value = digits[0];
                inputRef2.current.value = digits[1];
                inputRef3.current.value = digits[2];
                inputRef4.current.value = digits[3];
                inputRef5.current.value = digits[4];
                inputRef6.current.value = digits[5];
                setNumbers(pasteData);
            }
        }

    }

    function generateRandomNumber() {
        const min = 100000;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }


    const verify_code = async () => {
        const data = {
            "email": user?.email,
            "code": numbers
        }
        try {
            const response = await axios.post('http://localhost:8000/api/verify_email/', data, {
                headers: {
                    "Content-Type": "application.json"
                }
            });
            push(`/`);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                setInvalidCodeMsg(error.response.data.message);
                const timeOut = setTimeout(() => {
                    setInvalidCodeMsg('');
                }, 3000);
                return () => clearTimeout(timeOut);
            }
        }
    }


    const send_verification_code = async () => {
        const data = {
            "email": user?.email,
            "random_number": generateRandomNumber()
        }
        const response = await axios.post('http://localhost:8000/api/send_verification_code/', data, {
            headers: {
                "Content-Type": "application.json"
            }
        });
        console.log(response.data)
    }

    const reSendCode = async () => {
        setCount(15);
        setIsDisabled(true);
        send_verification_code()
    }

    useEffect(() => {
        send_verification_code()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsDisabled(false);
        }
    }, [count]);



    return (
        <div className={styles.confirmation_container}>
            <div className={styles.confirmation_card}>
                <div className={styles.confirmation_title}>
                    <Image src={`/assets/images/logo2.jpg`} width={100} height={40} alt='Logo' />
                    <h3>Confirmação de e-mail</h3>
                    <p>Enviamos um código para o e-mail cadastrado, acesse-o e digite o código nos campos abaixo</p>
                    <Image src={`/assets/images/confirmation.svg`} width={200} height={200} alt={`Confirmation SVG`} />
                    <p>Obs.: Caso você não veja o código na caixa de entrada, verifique na caixa de spam</p>
                    {invalidCodeMsg && <p className={styles.confirmation_msg}>{invalidCodeMsg}</p>}
                    <div className={styles.confirmation_inputs}>
                        <input type="text" ref={inputRef1} onChange={handleInputChange1} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef2} onChange={handleInputChange2} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef3} onChange={handleInputChange3} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef4} onChange={handleInputChange4} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef5} onChange={handleInputChange5} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef6} onChange={handleInputChange6} onPaste={handleInput} maxLength={1} />
                    </div>
                    <button className={styles.confirmation_btn} onClick={verify_code} disabled={numbers?.length === 6 ? false : true}>Verificar</button>
                    <div className={styles.confirmation_resend}>
                        <p>Não recebeu o e-mail? </p>
                        <button className={styles.confirmation_btn_resend} onClick={reSendCode} disabled={isDisabled}>Reenviar Código </button>
                        <p className={count === 0 ? styles.confirmation_resend_none : styles.confirmation_resend_count}>{count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmation

export const getServerSideProps = async (ctx) => {
    const { ['authTokens']: token } = parseCookies(ctx);
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const user = jwtDecode(token);
    const response = await axios.get(`http://127.0.0.1:8000/api/get_isValidated/?email=${user?.email}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.data === true) {
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