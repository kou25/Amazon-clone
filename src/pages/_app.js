import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import "../styles/custom.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import { Provider as AuthProvider } from 'next-auth/client'


const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer transition={Zoom} />
    </Provider>
    </AuthProvider>
  )
}

export default MyApp
