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

// export const getServerSideProps = async (ctx) => {
//   const { ['authTokens']: token } = parseCookies(ctx);
//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }