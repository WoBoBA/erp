import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/404";
import Header from "./components/Header";
import Calender from "./components/Calendar";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Prod from "./components/Prod";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/404" element={<NoPage />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/Prod" element={<Prod />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
