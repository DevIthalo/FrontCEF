/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '@/styles/noticiaById.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaRegComments } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import IconInfo from '@/components/IconInfo'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import AuthContext from '@/context/AuthContext'
import useAxios from '@/services/useAxios'

const NoticiaById = () => {
  const [post, setPost] = useState();
  const [userData, setUserData] = useState();
  const router = useRouter();
  const { postId } = router.query;
  const [isToggle, setIsToggle] = useState(false);
  const { user } = useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    fetchData();
    if (user?.email)
      fetchUser();
  }, [])

  const handleComments = () => {
    setIsToggle(!isToggle);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/list_post_by_id/?id=${postId}`);
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUser = async () => {
    try {
      const response = await api.get(`http://localhost:8000/api/user/?email=${user?.email}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Navbar />
      <div style={{ minHeight: '120vh' }}>

        <div className={styles.noticia_container}>
          <div className={styles.noticia_title}>
            <h1>{post?.title}</h1>
          </div>
          <br />
          <div className={styles.noticia_autor}>
            <img src="/assets/images/profile_photo.webp" height={50} width={50} alt="" />
            <div>
              <p>{post?.user.nome} {post?.user.sobrenome} </p>
              <p>{post?.published_at === post?.updated_at ?
                `Publicado • ${new Date(post?.published_at).toLocaleString()}` :
                `Atualizado • ${new Date(post?.updated_at).toLocaleString()}`}</p>
            </div>
          </div>
          <div className={styles.noticia_comments}>
            <div onClick={handleComments}>
              <FaRegComments style={{ fontSize: 20 }} />
              <p>0 Comentários</p>
            </div>
          </div>
          <div className={styles.noticia_content}>
            <div dangerouslySetInnerHTML={{ __html: '<div style="line-height:1.2;word-wrap:break-word">' + post?.content + '</div>' }} />
          </div>
        </div>
      </div>
      <div className={styles.noticia_sidebar_comments}>
        <div onClick={handleComments} className={`${styles.overlay} ${isToggle ? styles.overlay_toggle : ''}`}></div>
        <div className={`${styles.content} ${isToggle ? styles.content_toggle : ''}`}>
          <div className={styles.grid}>
            <div className={styles.close}>
              <p>Comentários</p>
              <GrClose onClick={handleComments} style={{ fontSize: '25px' }} />
            </div>
            <br />
            <div>
              {user?.email ?
                (<div>
                  <div className={styles.info_user}>
                    <div className={styles.info_user_name}>
                      <img src="/assets/images/profile_photo.webp" width={40} height={40} alt="" />
                      <p style={{fontWeight: 'bold/;'}}>{userData?.nome} {userData?.sobrenome}</p>
                    </div>
                    <div>
                      <button className={styles.info_btn} disabled>Publicar</button>
                    </div>
                  </div>
                  <textarea type="text" style={{ width: '100%', marginTop: '10px' }} placeholder='Digite um comentário' />
                </div>) :
                <p style={{ fontSize: 12, textAlign:'center' }}>Você precisa estar logado para comentar!</p>
              }
            </div>
            <br />

            <div className={styles.grid_comments}>
              <div className={styles.flex}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="/assets/images/profile_photo.webp" width={40} height={40} alt="" />
                  <div>
                    <p style={{ fontWeight: 'bold' }}>Paulo Bruno</p>
                    <p>Paulo Bruno</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <IconInfo icon={<FiEdit className={styles.icon} />} iconText="Editar" />
                  <IconInfo icon={<AiOutlineDelete className={styles.icon} onClick={() => handleOpenModal(item.id)} />} iconText="Apagar" />
                </div>
              </div>
              <div style={{ fontSize: '14px', textAlign: 'justify', color: '#333' }}>Reprehenderit non ipsum non consequat elit. Pariatur irure laborum Lorem ea exercitation tempor. Fugiat commodo ipsum proident eu ullamco sint deserunt labore nostrud proident et laborum Lorem non.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export const getServerSideProps = async (ctx) => {
  const { params } = ctx;
  const postId = params.postId;
  try {
    await axios.get(`http://127.0.0.1:8000/api/list_post_by_id/?id=${postId}`)
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
export default NoticiaById