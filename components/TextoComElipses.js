import React from 'react'

const TextoComElipses = ({ texto, limitarCaracteres }) => {
    const adcionarElipses = (texto, limitarCaracteres) => {
        if (texto?.length > limitarCaracteres) {
            return texto?.substring(0, limitarCaracteres) + '...';
        } else {
            return texto;
        }
    }
    const textoComElipses = adcionarElipses(texto, limitarCaracteres);
    return (
        <p>{textoComElipses}</p>
    )
}

export default TextoComElipses