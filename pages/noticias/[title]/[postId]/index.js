import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '@/styles/noticiaById.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const NoticiaById = () => {
  const [post, setPost] = useState();
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/list_post_by_id/?id=${postId}`);
      setPost(response.data);
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
              <p>{post.published_at === post.updated_at ? `Publicado • ${new Date(post.published_at).toLocaleString()}` : `Atualizado • ${new Date(post.updated_at).toLocaleString()}`}</p>
            </div>
          </div>
          <div style={{ display: 'inline-block' }} className={styles.noticia_content}>
            <div dangerouslySetInnerHTML={{ __html: '<div style="line-height:1.2;word-wrap:break-word">' + post?.content + '</div>' }} />
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