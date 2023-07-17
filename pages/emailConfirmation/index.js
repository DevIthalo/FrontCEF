import React from 'react'
import styles from '@/styles/emailConfirmation.module.css'
import Image from 'next/image'
import { useRef } from 'react'
const EmailConfirmation = () => {
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
    };
    const handleInputChange2 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef3.current.focus();
        }
    };
    const handleInputChange3 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef4.current.focus();
        }
    };
    const handleInputChange4 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef5.current.focus();
        }
    };
    const handleInputChange5 = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 1) {
            inputRef6.current.focus();
        }
    };

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
            }

        }
    }

    return (
        <div className={styles.confirmation_container}>
            <div className={styles.confirmation_card}>
                <div className={styles.confirmation_title}>
                    <Image src={`/assets/images/logo.png`} width={100} height={40} alt='Logo' />
                    <h3>Confirmação de e-mail</h3>
                    <p>Para realizar algumas ações na plataforma você irá precisar confirmar seu e-mail antes</p>
                    <Image src={`/assets/images/confirmation.svg`} width={200} height={200} />
                    <p>Enviamos um código para o e-mail, acesse-o e cole o código nos campos abaixo</p>
                    <div className={styles.confirmation_inputs}>
                        <input type="text" ref={inputRef1} onChange={handleInputChange1} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef2} onChange={handleInputChange2} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef3} onChange={handleInputChange3} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef4} onChange={handleInputChange4} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef5} onChange={handleInputChange5} onPaste={handleInput} maxLength={1} />
                        <input type="text" ref={inputRef6} onPaste={handleInput} maxLength={1} />
                    </div>
                    <button></button>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmation