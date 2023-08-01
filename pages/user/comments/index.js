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
const Comments = () => {
    const [isToggle, setIsToggle] = useState(true);
    const router = useRouter();
    const currentPage = parseInt(router.query.page) || 1;
    const [results, setResults] = useState();
    const [messageOk, setMessageOk] = useState('');
    const [messageError, setMessageError] = useState('');
    useEffect(() => {
        fetchComments();
    }, []);

    const { user } = useContext(AuthContext);

    const handleValueChange = (value) => {
        setIsToggle(value);
    };

    const sendMessageOk = (data) => {
        setMessageOk(data);
        fetchComments();
        const timeout = setTimeout(()=> {
            setMessageOk('');
        },2500)
        return ()=> clearTimeout(timeout);
    }

    const sendMessageError = (data) => {
        setMessageError(data);
        const timeout = setTimeout(()=> {
            setMessageError('');
        },2500)
        return ()=> clearTimeout(timeout);
    }


    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/list_comments_by_user/${user?.user_id}?page=${currentPage}`)
            const data = response.data;
            setResults(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.log(error.response);
        }
    }


    return (
        <>
            <SideBarUser onValueChange={handleValueChange} />
            {messageError ? <p className={styles.messageError}>{messageError}</p>: ''}
            {messageOk ? <p className={styles.messageOk}>{messageOk}</p>: ''}
            {results?.map((comment, index) => {
                return <CommentUser key={index} index={index} isToggle={isToggle} sendMessageError={sendMessageError} sendMessageOk={sendMessageOk} comment={comment}/>
            })
            }
            <br/><br/><br/><br/><br/><br/>
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