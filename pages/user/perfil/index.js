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
import jsonData from '@/json/estados-cidades.json'
import { consultarCep } from 'correios-brasil/dist'

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

  const handleValueChange = (value) => {
    setIsToggle(value);
  };

  useEffect(() => {
    getUserByEmail()
  }, [])

  useEffect(() => {
    if (dataSend.cep) {
      validateCEP(dataSend.cep);
    }
  }, [dataSend?.cep])

  const getUserByEmail = async () => {
    const response = await api.get(`/api/user/?email=${user?.email}`);
    setVerifyData(response.data);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = { ...dataSend, [name]: value }
    if (newData[name] == "") {
      delete newData[name];
    }

    console.log(newData);
    setDataSend(newData);
  }

  const sendData = () => {
    if (dataSend.cpf)
      isValidCPF(dataSend?.cpf) ? setIsValidCpf(true) : setIsValidCpf(false);

    if (!dataSend.logradouro && !dataSend.bairro && !dataSend.cidade && !dataSend.estado && !dataSend.numero && !dataSend.cep) {
      console.log("Atualizar o resto");
    } else if (dataSend.logradouro && dataSend.bairro && dataSend.cidade && dataSend.estado && dataSend.numero && dataSend.cep) {
      console.log("Campos de endereço preenchidos, atualizar")
    } else {
      console.log("Erro tem algum campo de endereço preenchido e outros não!")
      console.log(dataSend);
    }

  }

  const validateCEP = async (cep) => {
    cep = cep.replace(/\D/g, '');
    if (cep.length === 8) {
      const response = await consultarCep(cep);
      if (response.erro) {
        setIsValidFields({ "cep": { "error": "CEP Inválido, tente novamente!" } });
      } else {
        setDataSend({
          "logradouro": response.logradouro,
          "bairro": response.bairro,
          "estado": response.uf,
          "complemento": response.complemento,
          "cidade": response.localidade,
          "cep": response.cep,
          "numero": dataSend?.numero,
          "nome": dataSend?.nome,
          "sobrenome": dataSend?.sobrenome,
          "telefone1": dataSend?.telefone1,
          "telefone2": dataSend?.telefone2,
          "cpf": dataSend?.cpf,
        });
        setIsValidFields({ "cep": { "error": "" } });
      }
    } else if (cep.length !== 8) {
      delete dataSend["logradouro"];
      delete dataSend["bairro"];
      delete dataSend["complemento"];
      delete dataSend["cidade"];
      delete dataSend["estado"];
      delete dataSend["numero"];
      if (!dataSend["nome"])
        delete dataSend["numero"];
      if (!dataSend["sobrenome"])
        delete dataSend["sobrenome"];
      if (!dataSend["telefone1"])
        delete dataSend["telefone1"];
      if (!dataSend["telefone2"])
        delete dataSend["telefone2"];
      if (!dataSend["cpf"])
        delete dataSend["cpf"];

      setIsValidFields({ "cep": { "error": "" } });
    }
  }

  const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove non-digit characters

    // Validate length
    if (cpf.length !== 11) return false;

    // Validate repetitive numbers
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Calculate the first verification digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    // Calculate the second verification digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
  };


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
                  <p>{verifyData.nome ? verifyData.nome : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Sobrenome</p>
                  <p>{verifyData.sobrenome ? verifyData.sobrenome : "Não informado ainda"}</p>
                </div>
              </div>)
                :
                <div className={styles.user_basic_information_container_name}>
                  <div className={styles.user_basic_information_grid}>
                    <p>Nome</p>
                    <input type="text" value={dataSend?.nome ? dataSend?.nome : ''} name="nome" onChange={handleChange} placeholder='Digite seu nome' />
                  </div>
                  <div className={styles.user_basic_information_grid}>
                    <p>Sobrenome</p>
                    <input type="text" value={dataSend?.sobrenome ? dataSend?.sobrenome : ''} name="sobrenome" onChange={handleChange} placeholder='Digite seu sobrenome' />
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
                  <p>{verifyData.logradouro ? verifyData.logradouro : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Bairro</p>
                  <p>{verifyData.bairro ? verifyData.bairro : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Número</p>
                  <p>{verifyData.numero ? verifyData.numero : "Não informado ainda"}</p>
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>CEP</p>
                  <p>{verifyData.cep ? verifyData.cep : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Estado</p>
                  <p>{data.estado ? data.estado : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Cidade</p>
                  <p>{verifyData.cidade ? verifyData.cidade : "Não informado ainda"}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Estado</p>
                  <p>{data.estado ? data.estado : "Não informado ainda"}</p>
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>Complemento</p>
                  <p>{verifyData.complemento ? verifyData.complemento : "Não informado ainda"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.user_endereco_container_grid}>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>Logradouro (Rua, Conjunto ou outro)</p>
                  <input type="text" name="logradouro" value={dataSend?.logradouro ? dataSend?.logradouro : ''} onChange={handleChange} placeholder='Informe o logradouro' />
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Bairro</p>
                  <input type="text" name="bairro" value={dataSend?.bairro ? dataSend?.bairro : ''} onChange={handleChange} placeholder='Informe o bairro' />
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Número</p>
                  <input type="text" name="numero" value={dataSend?.numero ? dataSend?.numero : ''} onChange={handleChange} placeholder='Informe o número' />
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>CEP</p>
                  <InputMask mask="99999-999" className={isValidFields.cep?.error && styles.input_cep} name="cep" onChange={handleChange} placeholder='Informe o CEP' />
                  {isValidFields.cep?.error ? <p style={{ color: 'red', fontSize: 12 }}>{isValidFields.cep?.error}</p> : ''}
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Estado</p>
                  <select name="estado" onChange={handleChange} value={dataSend?.estado ? dataSend?.estado : ''}>
                    <option value="" key=""></option>
                    {jsonData.estados.map((state) => (
                      <option value={state.sigla} key={state.sigla}>{state.sigla}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Cidade</p>
                  {dataSend?.estado && <select name="cidade" onChange={handleChange} value={dataSend?.cidade}>
                    <option value="" key=""></option>
                    {jsonData.estados.filter((state) => (state.sigla === dataSend?.estado)).map((data) => data.cidades.map(
                      (cidades) => {
                        return (<option value={cidades} key={cidades}>{cidades}</option>)
                      }
                    ))}
                  </select>}
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>Complemento</p>
                  <input type="text" name="complemento" value={dataSend?.complemento ? dataSend?.complemento : ''} onChange={handleChange} placeholder='Complemento, Ex.: Apto Nº 240 4º Andar' />
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
                <p>{verifyData.telefone ? verifyData.telefone : "Não informado ainda"}</p>
              </div>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone 2</p>
                <p>{verifyData.telefone2 ? verifyData.telefone2 : "Não informado ainda"}</p>
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
                <p>{verifyData.cpf ? verifyData.cpf : "Não informado ainda"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>CPF</p>
                <InputMask mask="999.999.999-99" name="cpf" value={dataSend.cpf ? dataSend.cpf : ''} onChange={handleChange} placeholder='Informe seu cpf' />
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