import Navbar from '@/components/Navbar'
import styles from '../styles/Home.module.css'
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextoComElipses from '@/components/TextoComElipses';

function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [paragrafo, setParagrafo] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    setIsLoading(true);
    const response = await axios.get("http://localhost:8000/api/limit_posts/",
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

    const paragrafos = response.data.map((data) => {
      return selecionarPrimeiroParagrafoComMaisDe200Caracteres(data.content);
    })
    setParagrafo(paragrafos);
    setIsLoading(false);
    setData(response.data);
  }


  return (

    <>
      <Navbar />
      <div className={styles.home_container}>
        <Carousel />
        <div className={styles.home_news}>
          <div className={styles.home_news_title}>
            <p>Últimas Notícias</p>
            <p>Acompamenhe as últimas notícias no blog</p>
          </div>
          <div className={styles.home_news_container}>

            {isLoading ? <img src="/assets/images/loading.svg" height={50} width={50} alt="" /> :
              data.map((post, index) => {
                return <Link key={post.id} href={`/noticias/${post.id}`} className={styles.home_news_card}>
                  <div >
                    <div className={styles.home_news_image}>
                      <img src={`${post.image_link}`} alt="" />
                    </div>
                    <div className={styles.home_news_content}>
                      <p>{post.title}</p>
                      <TextoComElipses texto={paragrafo[index]} limitarCaracteres={200} />
                    </div>
                    <div className={styles.home_news_bottom}>
                      <p>{post.published_at === post.updated_at ? `Publicado • ${new Date(post.published_at).toLocaleString()}` : `Atualizado • ${new Date(post.updated_at).toLocaleString()}`}</p>
                      <p>Ver mais</p>
                    </div>
                  </div>
                </Link>
              })
            }
          </div>


        </div>
      </div>

      <Footer />
    </>
  )

}

export default Home

