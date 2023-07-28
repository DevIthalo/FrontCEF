/* eslint-disable @next/next/no-img-element */
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from '@/styles/carousel.module.css';
import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react'
import Link from "next/link";
import { FaCircle } from 'react-icons/fa';


const CarouselComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/limit_posts/10`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        setIsLoading(false);
        setData(response.data);
    }

    const renderCustomIndicator = (onClickHandler, isSelected) => {
        const customStyles = {
            fontSize: '13px', // Defina o tamanho do ícone conforme desejado
            color: isSelected ? '#888' : '#ccc', // Defina a cor do ícone selecionado e não selecionado
            cursor: 'pointer',
            marginRight: '10px',
            marginBottom: '40px'
        };

        return (
            <FaCircle
                onClick={onClickHandler}
                style={customStyles}
            />
        );
    };

    return (
        <Carousel renderIndicator={renderCustomIndicator} className={styles.carousel} autoPlay={true} interval={7000} showThumbs={false} infiniteLoop={true}>
            {isLoading ? <img style={{ height: 500, width: 40 }} src="/assets/images/loading.svg" width={50} height={50} alt="" /> :
                data.map((post) => {
                    return (
                        <div key={post.id} className={styles.carousel_container}>
                            <div>
                                <img src={`${post.image_link}`} alt="Image 1" />
                            </div>
                            <div className={styles.carousel_title}>
                                <p>{post.title}</p>
                                <p>Veja mais informações no link abaixo</p>
                                <Link href={`/noticias/${post.title.replace(/ /g, '-')}/${post.id}`}>Ver mais</Link>
                            </div>
                        </div>
                    )
                })

            }
        </Carousel>
    )
}

export default CarouselComponent