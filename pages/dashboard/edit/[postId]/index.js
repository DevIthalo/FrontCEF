/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import adminStyles from '@/styles/admin.module.css'
import SideBarAdmin from '@/components/SideBarAdmin'
import NavbarAdmin from '@/components/NavbarAdmin';
import { CustomEditor } from '@/components/CustomEditor';
import styles from '@/styles/adminNew.module.css'
import Modal from '@/components/Modal';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';
import useAxios from '@/services/useAxios';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import axios from 'axios';

const PostEdit = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [isToggle, setIsToggle] = useState(true);
    const [errorTitle, setErrorTitle] = useState();
    const [errorContent, setErrorContent] = useState();
    const [error, setError] = useState('');
    const [messageOk, setMessageOk] = useState('');

    const api = useAxios();
    const { user } = useContext(AuthContext);
    const { push } = useRouter();
    const router = useRouter();
    const {postId} = router.query;

    useEffect(()=>{
        getPostById();
    },[])

    const getPostById = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/list_post_by_id/?id=${postId}`);
            setTitle(response.data.title);
            setContent(response.data.content)
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleOnEditorChange = (content, editor) => {
        setContent(content);
        setErrorContent("")
    }
    const handleTitle = (event) => {
        setTitle(event.target.value);
        setErrorTitle("")
    }

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleValueChange = (value) => {
        setIsToggle(value);
    }

    const onSubmit = async () => {
        if (!title && !content) {
            setErrorTitle("Campo obrigatório")
            setErrorContent("Campo obrigatório")
            return;
        }
        if (!title) {
            setErrorTitle("Campo obrigatório")
            return;
        }
        if (!content) {
            setErrorContent("Campo obrigatório")
            return;
        }
        if (user?.isAdmin === false) {
            setError("Você não possui permissão para realizar publicações");
            const timeOut = setTimeout(() => {
                setError('');
            }, 3000);
            return () => clearTimeout(timeOut);
        }
        try {
            const response = await api.patch(`/api/update_post/${postId}`, { title, content });
            setMessageOk("Post atualizado com sucesso!");

            const timeOut = setTimeout(() => {
                setMessageOk('');
                push('/dashboard');
            }, 1500);
            return () => clearTimeout(timeOut);
        } catch (error) {
            if (error.response) {
                setError(error.response.data?.error);
                const timeOut = setTimeout(() => {
                    setError('');
                }, 3000);
                return () => clearTimeout(timeOut);
            }
        }
    }

    return (
        <>
            <SideBarAdmin isNew={true} isEdit={true} handleOpenModal={handleOpenModal} onSubmit={onSubmit} onValueChange={handleValueChange} />

            <div className={`${styles.new_container} ${isToggle ? styles.new_container_toggle : ''}`}>
                {error && <p className={styles.new_error}>{error}</p>}
                {messageOk && <p className={styles.new_ok}>{messageOk}</p>}
                <div className={styles.new_title}>
                    <label>Título</label>
                    <label>Seja específico e suscinto, imagine um título de um jornal (simples, mas chamativo)</label>
                    {errorTitle && <label style={{ fontSize: 12, color: 'red' }}>{errorTitle}</label>}
                    <input type="text" value={title ? title : ''} onChange={handleTitle} />
                </div>
                <div className={styles.new_content}>
                    <label>Conteúdo</label>
                    <label>Utilize o botão de visualizar para ver como o conteúdo vai ficar quando for publicado</label>
                    {errorContent && <label style={{ fontSize: 12, color: 'red' }}>{errorContent}</label>}
                    <CustomEditor content={content? content : ''} handleOnEditorChange={handleOnEditorChange} />
                </div>
            </div>
            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal}>
                <h1>{title}</h1><br />
                <div dangerouslySetInnerHTML={{ __html: '<div style="line-height:1.4;word-wrap:break-word">' + content + '</div>' }} />
            </Modal>
        </>
    )
}


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
    const data = JSON?.parse(token);
    const tokenInfo = jwtDecode(data.access);
    if (!tokenInfo.isAdmin) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const {params} = ctx;
    const postId = params.postId;
    try{
        await axios.get(`http://127.0.0.1:8000/api/list_post_by_id/?id=${postId}`)
    }catch(error){
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}


export default PostEdit