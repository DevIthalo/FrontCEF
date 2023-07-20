/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import SideBarUser from '@/components/SideBarUser'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import styles from '@/styles/perfilUser.module.css'
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'
import { LuEdit } from 'react-icons/lu'
import useAxios from '@/services/useAxios'
import InputMask from 'react-input-mask';

const PerfilUser = () => {
  const { user } = useContext(AuthContext);
  const [isEditBasic, setIsEditBasic] = useState(false);
  const [isEditEndereco, setIsEditEndereco] = useState(false);
  const [isToggle, setIsToggle] = useState(true);
  const [isEditCpf, setIsEditCpf] = useState(false);
  const [isEditContato, setIsEditContato] = useState(false);
  const [data, setData] = useState({});
  const [dataSend, setDataSend] = useState({});

  const api = useAxios();

  const handleEditBasic = () => {
    setIsEditBasic(!isEditBasic);
  }
  const handleEditEndereco = () => {
    setIsEditEndereco(!isEditEndereco);
  }
  const handleEditCpf = () => {
    setIsEditCpf(!isEditCpf);
  }
  const handleEditContato = () => {
    setIsEditContato(!isEditContato);
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }


  const handleValueChange = (value) => {
    setIsToggle(value);
  };

  useEffect(() => {
    getUserByEmail()
  }, [])

  const getUserByEmail = async () => {
    const response = await api.get(`/api/user/?email=${user?.email}`);
    setData(response.data);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = { ...dataSend, [name]: value }
    if (name === 'cpf') {
      if (validarCPF(value)) {
        console.log("CPF Válido");
      } else {
        console.log("CPF Inválido!");
      }
    }
    setDataSend(newData);
  }

  const sendData = () => {
    console.log(data);
  }


  return (
    <>

      <SideBarUser onValueChange={handleValueChange} data={dataSend} sendData={sendData} />
      <div className={`${styles.user_container} ${!isToggle ? styles.user_container_closed : ''}`}>
        <div className={styles.user_container_title}>
          <h3>Informações Básicas</h3>
          <a style={{ cursor: 'pointer' }} onClick={handleEditBasic}><LuEdit className={styles.user_container_edit_icon} /></a>
        </div>
        <br /><hr /><br />
        <div className={styles.user_basic_information}>
          <Link href="#"><img src="/assets/images/profile_photo.webp" width={120} height={120} alt="" /></Link>
          <div className={styles.user_basic_information_container}>
            <div >
              {!isEditBasic ? (<div className={styles.user_basic_information_container_name}>
                <div className={styles.user_basic_information_grid}>
                  <p>Nome</p>
                  <p>{data.nome ? data.nome : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Sobrenome</p>
                  <p>{data.sobrenome ? data.sobrenome : "Não informado ainda"}</p>
                </div>
              </div>)
                :
                <div className={styles.user_basic_information_container_name}>
                  <div className={styles.user_basic_information_grid}>
                    <p>Nome</p>
                    <input type="text" name="nome" onChange={handleChange} placeholder='Digite seu nome' />
                  </div>
                  <div className={styles.user_basic_information_grid}>
                    <p>Sobrenome</p>
                    <input type="text" name="sobrenome" onChange={handleChange} placeholder='Digite seu sobrenome' />
                  </div>
                </div>
              }
            </div>
            <div className={styles.user_basic_information_grid}>
              <p>Email</p>
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
        <br />
        <div className={styles.user_container_title}>
          <h3>Endereço</h3>
          <a style={{ cursor: 'pointer' }} onClick={handleEditEndereco}><LuEdit className={styles.user_container_edit_icon} /></a>
        </div>
        <br /><hr /><br />
        <div >
          {!isEditEndereco ? (
            <div className={styles.user_endereco_container_grid}>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>Logradouro (Rua, Conjunto ou outro)</p>
                  <p>{data.logradouro ? data.logradouro : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Bairro</p>
                  <p>{data.bairro ? data.bairro : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Número</p>
                  <p>{data.numero ? data.numero : "Não informado ainda"}</p>
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>CEP</p>
                  <p>{data.cep ? data.cep : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Cidade</p>
                  <p>{data.cidade ? data.cidade : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Estado</p>
                  <p>{data.estado ? data.estado : "Não informado ainda"}</p>
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>Complemento</p>
                  <p>{data.complemento ? data.complemento : "Não informado ainda"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.user_endereco_container_grid}>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>Logradouro (Rua, Conjunto ou outro)</p>
                  <input type="text" name="logradouro" onChange={handleChange} placeholder='Informe o logradouro' />
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Bairro</p>
                  <input type="text" name="bairro" onChange={handleChange} placeholder='Informe o bairro' />
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Número</p>
                  <input type="text" name="numero" onChange={handleChange} placeholder='Informe o número' />
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>CEP</p>
                  <InputMask mask="99999-999" name="cep" onChange={handleChange} placeholder='Informe o CEP' />
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Cidade</p>
                  <input type="text" name="cidade" onChange={handleChange} placeholder='Informe a cidade onde mora' />
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Estado</p>
                  <input type="text" name="estado" onChange={handleChange} placeholder='Informe o estado onde mora' />
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>Complemento</p>
                  <input type="text" name="complemento" onChange={handleChange} placeholder='Complemento, Ex.: Apto Nº 240 4º Andar' />
                </div>
              </div>
            </div>
          )
          }
        </div>
        <br /><br />
        <div className={styles.user_container_title}>
          <h3>Contato</h3>
          <a style={{ cursor: 'pointer' }} onClick={handleEditContato}><LuEdit className={styles.user_container_edit_icon} /></a>
        </div><br />
        <hr /><br />
        {!isEditContato ? (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone 1</p>
                <p>{data.telefone ? data.telefone : "Não informado ainda"}</p>
              </div>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone 2</p>
                <p>{data.telefone2 ? data.telefone2 : "Não informado ainda"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone 1</p>
                <InputMask mask="(99) 99999-9999" name="telefone1" onChange={handleChange} placeholder='Informe seu telefone' />
              </div>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone 2</p>
                <InputMask mask="(99) 99999-9999" name="telefone2" onChange={handleChange} placeholder='Informe seu telefone' />
              </div>
            </div>
          </div>
        )
        }
        <br /><br />
        <div className={styles.user_container_title}>
          <h3>CPF</h3>
          <a style={{ cursor: 'pointer' }} onClick={handleEditCpf}><LuEdit className={styles.user_container_edit_icon} /></a>
        </div>
        <p style={{ fontSize: 12 }}>Obs.: Uma vez atualizado o CPF, você não conseguirá mais editar. Então, insira-o corretamente!</p>
        <hr /><br />
        {!isEditCpf ? (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>CPF</p>
                <p>{data.cpf ? data.cpf : "Não informado ainda"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>CPF</p>
                <InputMask mask="999.999.999-99" name="cpf" onChange={handleChange} placeholder='Informe seu cpf' />
              </div>
            </div>
          </div>
        )
        }
        <br /><br /><br /><br />
      </div>
    </>
  )
}

export default PerfilUser