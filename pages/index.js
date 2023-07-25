import Navbar from '@/components/Navbar'
import styles from '../styles/Home.module.css'
import Footer from '@/components/Footer';

function Home() {

  return (

    <>
      <Navbar />

      <div className={styles.editor}>
      </div>

      <Footer />
    </>
  )

}

export default Home

