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
import { BsInfoCircle } from 'react-icons/bs'
import { parseCookies } from 'nookies'

const PerfilUser = () => {
  const { user } = useContext(AuthContext);
  const [isEditBasic, setIsEditBasic] = useState(false);
  const [isEditEndereco, setIsEditEndereco] = useState(false);
  const [isToggle, setIsToggle] = useState(true);
  const [isEditCpf, setIsEditCpf] = useState(false);
  const [isEditContato, setIsEditContato] = useState(false);
  const [isValidCpf, setIsValidCpf] = useState();
  const [isCpfAlreadySet, setIsCpfAlreadySet] = useState();
  const [verifyData, setVerifyData] = useState({});
  const [dataSend, setDataSend] = useState({});
  const [isValidFields, setIsValidFields] = useState({});
  const [isValidNome, setIsValidNome] = useState();
  const [isValidSobrenome, setIsValidSobrenome] = useState();
  const [isValidFixo, setIsValidFixo] = useState();
  const [isValidCelular, setIsValidCelular] = useState();
  const [messageOk, setMessageOk] = useState();
  const [messageError, setMessageError] = useState();
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const api = useAxios();

  const handleEditBasic = () => {
    setIsEditBasic(!isEditBasic);
    setIsValidNome(true);
    setIsValidSobrenome(true);
  }
  const handleEditEndereco = () => {
    setIsEditEndereco(!isEditEndereco);
    setIsValidFields({ "endereco": { "verify": false } })
  }
  const handleEditCpf = () => {
    setIsEditCpf(!isEditCpf);
  }
  const handleEditContato = () => {
    setIsEditContato(!isEditContato);
    setIsValidFixo(true);
    setIsValidCelular(true);
  }

  const handleValueChange = (value) => {
    setIsToggle(value);
  };

  useEffect(() => {
    getUserByEmail()
  }, [])
  useEffect(() => {
    setDataSend({
      "nome": verifyData.nome,
      "email": user?.email,
      "sobrenome": verifyData.sobrenome,
      "cep": verifyData?.cep?.replace(/\D/g, ''),
      "logradouro": verifyData.logradouro,
      "bairro": verifyData.bairro,
      "numero": verifyData.numero,
      "estado": verifyData.estado,
      "cidade": verifyData.cidade,
      "complemento": verifyData.complemento,
      "fixo": verifyData.fixo,
      "celular": verifyData.celular,
      "cpf": verifyData.cpf?.replace(/\D/g, '')
    });
  }, [verifyData])

  useEffect(() => {
    if (!dataSend.nome) delete dataSend["nome"];
    if (!dataSend.sobrenome) delete dataSend["sobrenome"];
    if (!dataSend.cep) delete dataSend["cep"];
    if (!dataSend.logradouro) delete dataSend["logradouro"];
    if (!dataSend.cidade) delete dataSend["cidade"];
    if (!dataSend.estado) delete dataSend["estado"];
    if (!dataSend.complemento) delete dataSend["complemento"];
    if (!dataSend.numero) delete dataSend["numero"];
    if (!dataSend.fixo) delete dataSend["fixo"];
    if (!dataSend.celular) delete dataSend["celular"];
    if (!dataSend.cpf) delete dataSend["cpf"];
    if (!dataSend.bairro) delete dataSend["bairro"];
  }, [dataSend])

  useEffect(() => {
    if (dataSend.cep) {
      validateCEP(dataSend.cep);
    }
  }, [dataSend?.cep])

  const getUserByEmail = async () => {
    setIsLoading(true);
    const response = await api.get(`/api/user/?email=${user?.email}`);
    setIsLoading(false);
    setVerifyData(response.data);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = { ...dataSend, [name]: value }
    if (newData[name] === "" || newData[name] === null) {
      delete newData[name];
    }
    verifyFieldsEndereco(newData);
    setDataSend(newData);
    setIsValidCpf(true);
    if (name === "fixo")
      setIsValidFixo(true);
    if (name === "celular")
      setIsValidCelular(true);
    if (name === "nome")
      setIsValidNome(true)
    if (name === "sobrenome")
      setIsValidSobrenome(true)
  }

  const verifyFieldsEndereco = (data) => {
    if (!data?.logradouro && !data?.bairro && !data?.cep &&
      !data?.cidade && !data?.estado && !data?.numero) {
      setIsValidFields({ "endereco": { "verify": false } })
    }
  }


  const sendData = async () => {
    verifyFieldsEndereco();
    console.log(dataSend);
    if (dataSend.cep?.replace(/\D/g, '').length < 8) {
      setIsValidFields({ "cep": { "error": "Cep incompleto!" } })
      return;
    }

    if (dataSend.fixo?.replace(/\D/g, '').length < 10 && dataSend.celular?.replace(/\D/g, '').length < 11) {
      setIsValidFixo(false);
      setIsValidCelular(false);
      return;
    }

    if (dataSend.fixo?.replace(/\D/g, '').length < 10) {
      setIsValidFixo(false);
      return;
    }

    if (dataSend.celular?.replace(/\D/g, '').length < 11) {
      setIsValidCelular(false);
      return;
    }

    if (!dataSend.nome && !dataSend.sobrenome) {
      setIsValidNome(false);
      setIsValidSobrenome(false);
      return;
    }

    if (!dataSend.nome) {
      setIsValidNome(false);
      return;
    }

    if (!dataSend.sobrenome) {
      setIsValidSobrenome(false);
      return;
    }

    if (verifyData.cpf) {
      delete dataSend["cpf"];
    }

    if (dataSend.cpf) {
      if (isValidCPF(dataSend.cpf)) {
        setIsValidCpf(true)
      } else {
        setIsValidCpf(false);
        return;
      }
    }

    if (Object.keys(dataSend).length === 1) {
      setMessageError("Nenhum campo preenchido!");
      const timeOut = setTimeout(() => {
        setMessageError('');
      }, 3000);
      return () => clearTimeout(timeOut);
    }
    else {
      if (!dataSend.logradouro && !dataSend.bairro && !dataSend.cidade && !dataSend.estado && !dataSend.numero && !dataSend.cep) {
        try {
          const response = await api.patch("/api/update_user/", dataSend);
          getUserByEmail();
          setIsEditBasic(false);
          setIsEditContato(false);
          setIsEditEndereco(false);
          setIsEditCpf(false);
          setMessageOk("Informações atualizadas com sucesso!");
          const timeOut = setTimeout(() => {
            setMessageOk('');
          }, 3000);
          return () => clearTimeout(timeOut);
        } catch (error) {
          if (error.response) {
            setIsEditCpf(true);
            // setMessageError(error.response.data?.error);
            // const timeOut = setTimeout(() => {
            //   setMessageError('');
            // }, 3000);
            setIsCpfAlreadySet(error.response.data?.error);
            return () => clearTimeout(timeOut);
          }
        }
      } else if (dataSend.logradouro && dataSend.bairro && dataSend.cidade && dataSend.estado && dataSend.numero && dataSend.cep) {
        try {
          const response = await api.patch("/api/update_user/", dataSend);
          getUserByEmail();
          setIsEditBasic(false);
          setIsEditContato(false);
          setIsEditEndereco(false);
          setIsEditCpf(false);
          setMessageOk("Informações atualizadas com sucesso!");
          const timeOut = setTimeout(() => {
            setMessageOk('');
          }, 3000);
          return () => clearTimeout(timeOut);
        } catch (error) {
          if (error.response) {
            setIsEditCpf(true);
            // setMessageError(error.response.data?.error);
            // const timeOut = setTimeout(() => {
            //   setMessageError('');
            // }, 3000);
            setIsCpfAlreadySet(error.response.data?.error);
            return () => clearTimeout(timeOut);
          }
        }
      } else {
        setIsEditEndereco(true);
        setIsValidFields({ "endereco": { "verify": true } })
      }
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
          "email": user?.email,
          "bairro": response.bairro,
          "estado": response.uf,
          "complemento": response.complemento,
          "cidade": response.localidade,
          "cep": response.cep,
          "numero": dataSend?.numero,
          "nome": dataSend?.nome,
          "sobrenome": dataSend?.sobrenome,
          "fixo": dataSend?.fixo,
          "celular": dataSend?.celular,
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
      if (!dataSend["numero"])
        delete dataSend["numero"];
      if (!dataSend["nome"])
        delete dataSend["numero"];
      if (!dataSend["sobrenome"])
        delete dataSend["sobrenome"];
      if (!dataSend["fixo"])
        delete dataSend["fixo"];
      if (!dataSend["celular"])
        delete dataSend["celular"];
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

  const handleInfo = () => {
    setShowInfo(true);
  }
  const handleInfoLeave = () => {
    setShowInfo(false);
  }

  return (
    <>

      <SideBarUser onValueChange={handleValueChange} isEditBasic={isEditBasic} isEditContato={isEditContato} isEditCpf={isEditCpf} isEditEndereco={isEditEndereco} data={dataSend} sendData={sendData} />
      <div className={`${styles.user_container} ${!isToggle ? styles.user_container_closed : ''}`}>
        {messageOk ? (<p className={styles.user_message_ok}>{messageOk}</p>) : ''}
        {messageError ? (<p className={styles.user_message_error}>{messageError}</p>) : ''}
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
                  <p>{isLoading === false ? verifyData.nome ? verifyData.nome : "Não informado ainda" : 'Carregando...'}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Sobrenome</p>
                  <p>{isLoading === false ? verifyData.sobrenome ? verifyData.sobrenome : "Não informado ainda" : 'Carregando...'}</p>
                </div>
              </div>)
                :
                <div className={styles.user_basic_information_container_name}>
                  <div className={styles.user_basic_information_grid}>
                    <p>Nome</p>
                    <input type="text" value={dataSend?.nome ? dataSend?.nome : ''} name="nome" onChange={handleChange} placeholder='Digite seu nome' />
                    {isValidNome === false ? <p style={{ color: 'red', fontSize: 12 }}>Campo nome é obrigatório</p> : ''}
                  </div>
                  <div className={styles.user_basic_information_grid}>
                    <p>Sobrenome</p>
                    <input type="text" value={dataSend?.sobrenome ? dataSend?.sobrenome : ''} name="sobrenome" onChange={handleChange} placeholder='Digite seu sobrenome' />
                    {isValidSobrenome === false ? <p style={{ color: 'red', fontSize: 12 }}>Campo sobrenome é obrigatório</p> : ''}
                  </div>
                </div>
              }
            </div>
            <div className={styles.user_basic_information_grid}>
              <div className={styles.user_email_verification}>
                <div className={styles.user_email_verification_grid}>
                  <p>Email {isLoading === false && showInfo ? <p className={styles.user_message_email_verification}>Obs.: Email ainda não verificado</p> : ''}
                    {isLoading === false && !verifyData.is_validated ? <BsInfoCircle style={{ color: 'rgb(133, 29, 29)' }} onMouseEnter={handleInfo} onMouseLeave={handleInfoLeave} /> : ''}
                  </p>
                  <p>{user?.email}</p>
                </div>
                <div>
                  {isLoading === false && !verifyData.is_validated ? <Link className={styles.user_email_verification_btn} href={'/confirmation'}>Verificar email</Link> : ''}
                </div>
              </div>
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
                  <p>CEP</p>
                  <p>{isLoading === false ? verifyData.cep ? verifyData.cep : "Não informado ainda" : 'Carregando...'}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Logradouro (Rua, Conjunto ou outro)</p>
                  <p>{isLoading === false ? verifyData.logradouro ? verifyData.logradouro : "Não informado ainda" : 'Carregando...'}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Bairro</p>
                  <p>{isLoading === false ? verifyData.bairro ? verifyData.bairro : "Não informado ainda" : 'Carregando...'}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Número</p>
                  <p>{isLoading === false ? verifyData.numero ? verifyData.numero : "Não informado ainda" : 'Carregando...'}</p>
                </div>
              </div>
              <div className={styles.user_endereco_container}>

                <div className={styles.user_basic_information_grid}>
                  <p>Estado</p>
                  <p>{isLoading === false ? verifyData.estado ? verifyData.estado : "Não informado ainda" : 'Carregando...'}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Cidade</p>
                  <p>{isLoading === false ? verifyData.cidade ? verifyData.cidade : "Não informado ainda" : 'Carregando...'}</p>
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Complemento</p>
                  <p>{isLoading === false ? verifyData.complemento ? verifyData.complemento : "Não informado ainda" : 'Carregando...'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.user_endereco_container_grid}>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>CEP</p>
                  <InputMask mask="99999-999" className={isValidFields.cep?.error && styles.input_cep} value={dataSend?.cep ? dataSend?.cep : ''} name="cep" onChange={handleChange} placeholder='Informe o CEP' />
                  {isValidFields.cep?.error ? <p style={{ color: 'red', fontSize: 12 }}>{isValidFields.cep?.error}</p> : ''}
                  {isValidFields.endereco?.verify && !dataSend?.cep ? (<p style={{ color: 'red', fontSize: 12 }}>Campo obrigatório!</p>) : ("")}
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Logradouro (Rua, Conjunto ou outro)</p>
                  <input type="text" name="logradouro" value={dataSend?.logradouro ? dataSend?.logradouro : ''} onChange={handleChange} placeholder='Informe o logradouro' />
                  {isValidFields.endereco?.verify && !dataSend?.logradouro ? (<p style={{ color: 'red', fontSize: 12 }}>Campo obrigatório!</p>) : ("")}
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Bairro</p>
                  <input type="text" name="bairro" value={dataSend?.bairro ? dataSend?.bairro : ''} onChange={handleChange} placeholder='Informe o bairro' />
                  {isValidFields.endereco?.verify && !dataSend?.bairro ? (<p style={{ color: 'red', fontSize: 12 }}>Campo obrigatório!</p>) : ("")}
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Número</p>
                  <input type="text" name="numero" value={dataSend?.numero ? dataSend?.numero : ''} onChange={handleChange} placeholder='Informe o número' />
                  {isValidFields.endereco?.verify && !dataSend?.numero ? (<p style={{ color: 'red', fontSize: 12 }}>Campo obrigatório!</p>) : ("")}
                </div>
              </div>
              <div className={styles.user_endereco_container}>
                <div className={styles.user_basic_information_grid}>
                  <p>Estado</p>
                  <select name="estado" onChange={handleChange} value={dataSend?.estado ? dataSend?.estado : ''}>
                    <option value="" key=""></option>
                    {jsonData.estados.map((state) => (
                      <option value={state.sigla} key={state.sigla}>{state.sigla}</option>
                    ))}
                  </select>
                  {isValidFields.endereco?.verify && !dataSend?.estado ? (<p style={{ color: 'red', fontSize: 12 }}>Campo obrigatório!</p>) : ("")}
                </div>
                <div className={styles.user_basic_information_grid}>
                  <p>Cidade</p>
                  {dataSend?.estado ?
                    <>
                      <select name="cidade" onChange={handleChange} value={dataSend?.cidade}>
                        <option value="" key=""></option>
                        {jsonData.estados.filter((state) => (state.sigla === dataSend?.estado)).map((data) => data.cidades.map(
                          (cidades) => {
                            return (<option value={cidades} key={cidades}>{cidades}</option>)
                          }
                        ))}
                      </select>
                      {isValidFields.endereco?.verify && !dataSend?.cidade ? (<p style={{ color: 'red', fontSize: 12 }}>Campo obrigatório!</p>) : ("")}
                    </>
                    :
                    <>
                      <select>
                        <option value="" key="">Selecione um estado primeiro</option>
                      </select>
                      {isValidFields.endereco?.verify && !dataSend?.cidade ? (<p style={{ color: 'red', fontSize: 12 }}>Campo obrigatório!</p>) : ("")}
                    </>
                  }
                </div>
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
          <h3>Contatos</h3>
          <a style={{ cursor: 'pointer' }} onClick={handleEditContato}><LuEdit className={styles.user_container_edit_icon} /></a>
        </div><br />
        <hr /><br />
        {!isEditContato ? (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone Fixo</p>
                <p>{isLoading === false ? verifyData.fixo ? verifyData.fixo : "Não informado ainda" : 'Carregando...'}</p>
              </div>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone Celular</p>
                <p>{isLoading === false ? verifyData.celular ? verifyData.celular : "Não informado ainda" : 'Carregando...'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone Fixo</p>
                <InputMask mask="(99) 9999-9999" name="fixo" value={dataSend?.fixo ? dataSend?.fixo : ''} onChange={handleChange} placeholder='Informe seu telefone fixo' />
                {isValidFixo === false ? <p style={{ color: 'red', fontSize: 12 }}>Telefone Fixo Incompleto</p> : ''}
              </div>
              <div className={styles.user_basic_information_grid}>
                <p>Telefone Celular</p>
                <InputMask mask="(99) 99999-9999" name="celular" value={dataSend?.celular ? dataSend?.celular : ''} onChange={handleChange} placeholder='Informe seu telefone celular' />
                {isValidCelular === false ? <p style={{ color: 'red', fontSize: 12 }}>Telefone Celular Incompleto</p> : ''}
              </div>
            </div>
          </div>
        )
        }
        <br /><br />
        <div className={styles.user_container_title}>
          <h3>CPF</h3>
          {verifyData.cpf ? '' : <a style={{ cursor: 'pointer' }} onClick={handleEditCpf}><LuEdit className={styles.user_container_edit_icon} /></a>}
        </div>
        <p style={{ fontSize: 12 }}>Obs.: Uma vez atualizado o CPF, você não conseguirá mais editar. Então, insira-o corretamente!</p>
        <hr /><br />
        {!isEditCpf ? (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>CPF</p>
                <p>{isLoading === false ? verifyData.cpf ? verifyData.cpf : "Não informado ainda" : 'Carregando...'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.user_endereco_container_grid}>
            <div className={styles.user_endereco_container}>
              <div className={styles.user_basic_information_grid}>
                <p>CPF</p>
                <InputMask mask="999.999.999-99" name="cpf" style={isValidCpf === false ? { border: '1px solid red' } : { border: '1px solid black' }} value={dataSend.cpf ? dataSend.cpf : ''} onChange={handleChange} placeholder='Informe seu cpf' />
                {isCpfAlreadySet ? <p style={{ color: 'red', fontSize: 12 }}>{isCpfAlreadySet}</p> : ''}
                {isValidCpf === false ? <p style={{ color: 'red', fontSize: 12 }}>Cpf inválido</p> : ''}
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

export const getServerSideProps = (ctx) => {
  const { ['authTokens']: token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}