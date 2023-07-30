/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import stylesHome from '@/styles/Home.module.css'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import styles from '@/styles/noticias.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextoComElipses from '@/components/TextoComElipses';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';

const Noticias = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [paragrafo, setParagrafo] = useState([]);
    const router = useRouter();
    const [title, setTitle] = useState('');
    const currentPage = parseInt(router.query.page) || 1;
    const [totalPages, setTotalPages] = useState();
    const { push } = useRouter();

    useEffect(() => {
        fetchData();
    }, [currentPage])

    const fetchData = async () => {
        setIsLoading(true);
        try {

            const response = await axios.get(`http://localhost:8000/api/list_post/?page=${currentPage}&title=${title}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

            const selecionarPrimeiroParagrafoComMaisDe200Caracteres = (html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const paragrafos = doc.querySelectorAll('p');

                for (const paragrafo of paragrafos) {
                    if (paragrafo.textContent.length > 100) {
                        return paragrafo.textContent;
                    }
                }

                return null;
            };

            setTotalPages(response.data.total_pages);

            const paragrafos = response.data.results.map((data) => {
                return selecionarPrimeiroParagrafoComMaisDe200Caracteres(data.content);
            })
            setParagrafo(paragrafos);
            setIsLoading(false);
            setData(response.data.results);

        } catch (error) {
            push(`/404`)
        }
    }

    const handlePageClick = (pageNumber) => {
        push(`/noticias/?page=${pageNumber}`);
    };


    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh' }}>
                <div className={styles.noticias_container}>
                    <div className={styles.noticias_title}>Listagem de notícias</div>
                    <div className={`${stylesHome.home_news_container} ${styles.noticias_container_posts}`}>
                        {isLoading ? <img src="/assets/images/loading.svg" height={50} width={50} alt="" /> :
                            data.map((post, index) => {
                                return <Link key={post.id} href={`/noticias/${post.title.replace(/ /g, '-').replace('?','')}/${post.id}`} className={stylesHome.home_news_card}>
                                    <div className={stylesHome.grid}>
                                        <div className={stylesHome.home_news_image}>
                                            <img src={`${post.image_link}`} alt="" />
                                        </div>
                                        <div className={stylesHome.home_news_content}>
                                            <TextoComElipses texto={post.title} limitarCaracteres={55} />
                                            <TextoComElipses texto={paragrafo[index]} limitarCaracteres={200} />
                                        </div>
                                        <div className={stylesHome.home_news_bottom}>
                                            <p>{post.published_at === post.updated_at ? `Publicado • ${new Date(post.published_at).toLocaleString()}` : `Atualizado • ${new Date(post.updated_at).toLocaleString()}`}</p>
                                            <p>Ver mais</p>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                    <Pagination handlePageClick={handlePageClick} totalPages={totalPages} currentPage={currentPage} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const { page } = ctx.query;
    const title = '';
    try {
        await axios.get(`http://127.0.0.1:8000/api/list_post/?page=${page || 1}&title=${title}`)
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

export default Noticias