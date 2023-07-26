/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import SideBarAdmin from '@/components/SideBarAdmin';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';
import styles from '@/styles/adminDashboard.module.css'
import Image from 'next/image';
import { AiOutlineDelete } from 'react-icons/ai'
import { MdRemoveRedEye } from 'react-icons/md'
import { BiCommentDetail } from 'react-icons/bi'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

function Admin() {
    const [isToggle, setIsToggle] = useState(true);
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [options, setOptions] = useState(false);
    const { push } = useRouter();
    const router = useRouter();
    const currentPage = parseInt(router.query.page) || 1;
    const PAGES_PER_INTERVAL = 5;

    const handleValueChange = (value) => {
        setIsToggle(value);
    }

    useEffect(() => {
        fetchItems();
    }, [currentPage])

    useEffect(() => {
        if (!title)
            fetchItems();
    }, [title])




    const fetchItems = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/list_post/?page=${currentPage}&title=${title}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = response.data;
            console.log(data);
            setItems(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    }


    const handlePageClick = (pageNumber) => {
        push(`/dashboard/?page=${pageNumber}`);
    };

    const generatePageButtons = () => {
        const buttons = [];
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > PAGES_PER_INTERVAL) {
            const halfInterval = Math.floor(PAGES_PER_INTERVAL / 2);
            startPage = Math.max(currentPage - halfInterval, 1);
            endPage = startPage + PAGES_PER_INTERVAL - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(endPage - PAGES_PER_INTERVAL + 1, 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageClick(i)} className={styles.pagination_btn} disabled={i === currentPage}>
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            buttons.unshift(
                <button key="prev" className={styles.pagination_btn_prev_next} onClick={() => handlePageClick(startPage - 1)}>
                    &laquo;
                </button>
            );
        }

        if (endPage < totalPages) {
            buttons.push(
                <button key="next" className={styles.pagination_btn_prev_next} onClick={() => handlePageClick(endPage + 1)}>
                    &raquo;
                </button>
            );
        }

        return buttons;
    }

    const onSearchChange = (e) => {
        setTitle(e.target.value);
    }

    const handleOptions = () => {
        setOptions(!options);
    }

    return (
        <>
            <SideBarAdmin onValueChange={handleValueChange} search={fetchItems} onSearchChange={onSearchChange} />
            <div className={`${styles.dashboard_container} ${!isToggle ? styles.dashboard_container_toggle : ''}`}>
                {items.map((item) => {
                    return (
                        <div key={item.id} className={styles.dashboard_card}>
                            <Link style={{ textDecoration: 'none', color: '#222' }} href={`/dashboard/edit/${item.id}`}>
                                <div className={styles.dashboard_card_container}>
                                    <div className={styles.dashboard_image_container}>
                                        <img src={item.image_link != null ? item.image_link : '/assets/images/profile_photo.webp'} className={styles.dashboard_image} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} width={80} height={80} alt={'Image Dashboard'} />
                                        <div className={styles.dashboard_title_container}>
                                            <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                                            <p style={{ fontSize: 12 }}>{item.published_at === item.updated_at ? `Publicado • ${new Date(item.published_at).toLocaleString()}` : `Atualizado • ${new Date(item.updated_at).toLocaleString()}`}</p>
                                        </div>
                                    </div>
                                    <div className={styles.dashboard_options}>

                                        <div onMouseEnter={handleOptions} onMouseLeave={handleOptions} style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: "flex-end" }}>
                                            <div style={{ display: options ? 'flex' : 'none', alignItems: 'center', gap: '10px' }}>
                                                <MdRemoveRedEye className={styles.icon} />
                                                <AiOutlineDelete style={{ color: 'red' }} className={styles.icon} />
                                            </div>
                                            <p >{item.user.nome} {item.user.sobrenome} <img src="" alt="" /></p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: "flex-end" }}>
                                            <p style={{ fontSize: 20, display: 'flex', alignItems: 'center', gap: '5px' }}><BiCommentDetail /></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                },)
                }
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>{generatePageButtons()}</div>

            </div>
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
    return {
        props: {}
    }
}


export default Admin