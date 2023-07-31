import SideBarUser from '@/components/SideBarUser'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import styles from '@/styles/userComments.module.css'
import axios from 'axios'
import AuthContext from '@/context/AuthContext'
import { parseCookies } from 'nookies'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'


const Comments = () => {
    const [isToggle, setIsToggle] = useState(false);
    const router = useRouter();
    const currentPage = parseInt(router.query.page) || 1;
    const [results, setResults] = useState();
    const [options, setOptions] = useState();
    const [totalPages, setTotalPages] = useState();
    const { push } = useRouter();

    useEffect(() => {
        fetchComments();
    }, []);

    const { user } = useContext(AuthContext);

    const handleValueChange = (value) => {
        setIsToggle(value);
    };

    const handleOptions = (id) => {
        setOptions(id);
    }
    const handleOptionsLeave = () => {
        setOptions();
    }

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/list_comments_by_user/${user?.user_id}?page=${currentPage}`)
            const data = response.data;
            setResults(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            push('404');
            console.log(error.response);
        }
    }

    return (
        <>
            <SideBarUser onValueChange={handleValueChange} />
            {results?.map((comment) => {
                return <div key={comment.id} onMouseEnter={() => handleOptions(comment.id)} onMouseLeave={handleOptionsLeave} className={styles.dashboard_card}>
                    <div className={styles.comment_card_container}>
                        <div className={styles.comment_card_title}>
                            <img src="/assets/images/profile_photo.webp" width={70} height={70} alt="" />
                            <div>
                                <p><strong>Você</strong> comentou em <strong>"{comment.post.title}"</strong></p>
                                <p>{comment.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

            })
            }
            <br /><br />
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