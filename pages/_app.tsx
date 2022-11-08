import Navbar from "../components/Navbar";
import "../styles.scss";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../lib/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </AuthContextProvider>
  );
}

export default MyApp;
