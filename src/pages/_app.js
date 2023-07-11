import '@/styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.css';

import TitleBar from '../../components/TitleBar'

export default function App({ Component, pageProps }) {
  return( 
  <>
    <TitleBar />
    <Component {...pageProps} />
  </>)
}
