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

// class MyApp extends React.Component<{ Component; pageProps }> {
//   render() {
//     return (
//       <AuthContextProvider>
//         <Navbar />
//         <this.props.Component {...this.props.pageProps} />
//         <Toaster />
//       </AuthContextProvider>
//     );
//   }
// }

export default MyApp;
