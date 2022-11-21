import { GlobalStyles } from "../src/styles/GlobalStyles";
import Header from "./components/Header/Header";
import Orders from "./components/Orders/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <>
      <ToastContainer position="bottom-center" />
      <GlobalStyles />
      <Header />
      <Orders />
    </>
  );
}
