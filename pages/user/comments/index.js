/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import SideBarUser from '@/components/SideBarUser'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import styles from '@/styles/userComments.module.css'
import axios from 'axios'
import AuthContext from '@/context/AuthContext'
import { parseCookies } from 'nookies'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import CommentUser from '@/components/CommentUser'
import Pagination from '@/components/Pagination'
import ModalDelete from '@/components/ModalDelete'

const Comments = () => {
    const [isToggle, setIsToggle] = useState(true);
    const router = useRouter();
    const currentPage = parseInt(router.query.page) || 1;
    const [results, setResults] = useState();
    const [messageOk, setMessageOk] = useState('');
    const [messageError, setMessageError] = useState('');
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState();
    const [deleteId, setDeleteId] = useState(false);
    useEffect(() => {
        fetchComments();
    }, []);

    const { user } = useContext(AuthContext);

    const handleValueChange = (value) => {
        setIsToggle(value);
    };

    const handlePageClick = (pageNumber) => {
        push(`/user/comments/?page=${pageNumber}`);
    };

    const sendMessageOk = (data) => {
        setMessageOk(data);
        fetchComments();
        const timeout = setTimeout(() => {
            setMessageOk('');
        }, 2500)
        return () => clearTimeout(timeout);
    }

    const sendMessageError = (data) => {
        setMessageError(data);
        const timeout = setTimeout(() => {
            setMessageError('');
        }, 2500)
        return () => clearTimeout(timeout);
    }


    const fetchComments = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:8000/api/list_comments_by_user/${user?.user_id}?page=${currentPage}`)
            const data = response.data;
            setIsLoading(false);
            setResults(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            setIsLoading(false);
            console.log(error.response);
        }
    }

    const openModalDelete = (id) => {
        setIsOpen(true);
        setDeleteId(id);
    }
    const handleCloseModal = () => {
        setIsOpen(false);
    }


    return (
        <>
            <SideBarUser onValueChange={handleValueChange} isComment={true} />
            {messageError ? <p className={styles.messageError}>{messageError}</p> : ''}
            {messageOk ? <p className={styles.messageOk}>{messageOk}</p> : ''}
            {!isLoading ? results?.length > 0 ? <div className={`${styles.comment_card_container} ´
                ${!isToggle ? styles.comment_card_container_toggle : ''}`}>
                {results?.map((comment, index) => {
                    return <CommentUser key={index} index={index} isToggle={isToggle} openModalDelete={openModalDelete} sendMessageError={sendMessageError} sendMessageOk={sendMessageOk} comment={comment} />
                })}
                <ModalDelete isOpen={isOpen} handleCloseModal={handleCloseModal} deletePost={() => deletePost(deleteId)}>
                    <h2>Excluir postagem</h2>
                    <p>Tem certeza que deseja excluir essa postagem? </p>
                </ModalDelete>
                <Pagination handlePageClick={handlePageClick} currentPage={currentPage} totalPages={totalPages} />
            </div> : <div className={`${styles.without_comments} ´
                ${!isToggle ? styles.without_comments_toggle : ''}`}>Você ainda não comentou em nenhuma postagem</div>
                : ''
            }

        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const { ['authTokens']: token } = parseCookies(ctx);

    const { page } = ctx.query;

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
    if (tokenInfo.user_id) {
        try {
            await axios.get(`http://127.0.0.1:8000/api/list_comments_by_user/${tokenInfo?.user_id}?page=${page || 1}`)
        } catch (error) {
            return {
                redirect: {
                    destination: '/404',
                    permanent: false
                }
            }
        }
    } else {
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

export default Comments