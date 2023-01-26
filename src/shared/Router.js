import Main from "../pages/Main";
import Header from "../components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import List from "../pages/List.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/index" element={<Home />} />
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
