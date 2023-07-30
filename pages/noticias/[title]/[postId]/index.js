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
import AuthContext from '@/context/AuthContext'
import useAxios from '@/services/useAxios'
import Comment from '@/components/Comment'

const NoticiaById = () => {
  const [post, setPost] = useState();
  const [userData, setUserData] = useState();
  const [comments, setComments] = useState();
  const [commentData, setCommentData] = useState();
  const [commentError, setCommentError] = useState();
  const [commentOk, setCommentOk] = useState();
  const [idCommentDelete, setIdCommentDelete] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { postId } = router.query;
  const [isToggle, setIsToggle] = useState(false);
  const [isToggleDelete, setIsToggleDelete] = useState(false);
  const { user } = useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    fetchData();
    if (user?.email)
      fetchUser();
    fetchComments();
  }, [])

  const handleComments = () => {
    setIsToggle(!isToggle);
    setIsToggleDelete(false);
  }

  const fetchComments = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/list_comments_by_post/${postId}`);
      setComments(response.data);
    }catch(error){
      console.log(error.response.data?.error)
    }
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8000/api/list_post_by_id/?id=${postId}`);
      setIsLoading(false);
      setPost(response.data);
    } catch (error) {
      setIsLoading(false);
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

  const handleInputComment = (event) => {
    setCommentData(event.target.value);
    setCommentError('');
  }

  const submitComment = async () => {
    if (!commentData) {
      setCommentError("Campo obrigatório")
      return;
    }

    const data = {
      "user": user?.user_id,
      "post": post?.id,
      "description": commentData
    }
    try{
      const response = await api.post(`http://localhost:8000/api/insert_comment/`,data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      setCommentOk(response.data.message);
      fetchComments();
      setCommentData('');
      const timeout = setTimeout(()=> {
        setCommentOk('');
      },2500)
      return ()=> clearTimeout(timeout);
    }catch(error){
      if(error.response){
        setCommentError(error.response.data?.error);
      }
    }

  }

  const deleteComment = async () =>{
    try{
      await api.delete(`http://localhost:8000/api/delete_comment/${idCommentDelete}`);
      setCommentOk("Comentário excluído com sucesso!");
      const timeout = setTimeout(()=> {
        setCommentOk('');
      },2500)
      fetchComments();
      setIsToggleDelete(false);
      setIdCommentDelete('');
      return ()=> clearTimeout(timeout);
    }catch(error){
      console.log(error.response.data?.error);
    }
  }

  const handleShowMessage = (value) => {
    setCommentOk(value);
    const timeout = setTimeout(()=> {
      setCommentOk('');
    },2500)
    fetchComments();
    return ()=> clearTimeout(timeout);
  }

  const handleDelete = async (value) => {
    setIsToggleDelete(true);
    setIdCommentDelete(value);
  }
  const handleDeleteClose = () => {
    setIsToggleDelete(false);
  }


  return (
    <>
      <Navbar />
      
      <div style={{ minHeight: '120vh' }}>
      
        {
          !isLoading ? <div className={styles.noticia_container}>
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
              <p>{comments?.length != 1 ? comments?.length + " Comentários" : comments?.length + " Comentário"} </p>
            </div>
          </div>
          <div className={styles.noticia_content}>
            <div dangerouslySetInnerHTML={{ __html: '<div style="line-height:1.2;word-wrap:break-word">' + post?.content + '</div>' }} />
          </div>
        </div> : 
        <div style={{display:'flex',alignItems:'center',height:'80vh', justifyContent:'center'}}>
          <img src="/assets/images/loading.svg"  width={50} height={50} alt="" />
        </div>
        }
        
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
            {commentOk ? <div className={styles.messageOk}>
              {commentOk}
            </div> : ''}
            {commentError ? <div className={styles.commentError}>
              {commentError}
            </div> : ''}
            <div>
              {user?.email ?
                (<div>
                  <div className={styles.info_user}>
                    <div className={styles.info_user_name}>
                      <img src="/assets/images/profile_photo.webp" width={40} height={40} alt="" />
                      <p style={{ fontWeight: 'bold' }}>{userData?.nome} {userData?.sobrenome}</p>
                    </div>
                    <div>
                      <button className={styles.info_btn} disabled={commentData ? false : true} onClick={submitComment}>Publicar</button>
                    </div>
                  </div>
                  <textarea value={commentData ? commentData : ''} type="text" name="comentario" onChange={handleInputComment}
                    style={commentError ? { border: '1px solid red', width: '100%', marginTop: '10px' }
                      : { border: '1px solid black', width: '100%', marginTop: '10px' }} placeholder='Digite um comentário' />
                  {commentError ? <p style={{ fontSize: 12, color: 'red' }}>{commentError}</p> : ''}
                </div>) :
                <p style={{ fontSize: 12, textAlign: 'center' }}>Você precisa estar logado para comentar!</p>
              }
            </div>
            <br />
            {
              comments?.length > 0 ?
              comments.map((comment,index) => {
                  return <Comment id={index} key={comment.id} handleDelete={handleDelete} commentUdpated={handleShowMessage} comment={comment}/>
                })
                : <div className={styles.grid_comments}>
                  <p style={{ fontSize: 12, textAlign: 'center', fontWeight: 'lighter' }}>Sem comentários!</p>
                </div>
            }
          </div>
        </div>
      </div>
      <div className={`${styles.delete_comment_container} ${isToggleDelete ? styles.delete_comment_container_toggle: ''}`}>
            <div className={styles.delete_card}> 
              <h2>Excluir Comentário</h2>
              <p>Tem certeza que você quer excluir esse comentário?</p>
              <div>
                <a onClick={()=>setIsToggleDelete(false)}>Cancelar</a>
                <a onClick={deleteComment}>Apagar Comentário</a>
              </div>
            </div>
            <div className={styles.delete_overlay} onClick={handleDeleteClose}></div>

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