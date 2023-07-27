import Navbar from '@/components/Navbar'
import styles from '../styles/Home.module.css'
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';

function Home() {

  return (

    <>
      <Navbar />
      <div className={styles.home_container}>
        <Carousel />
      </div>

      <Footer />
    </>
  )

}

export default Home

