import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
