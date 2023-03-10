import Main from "../pages/Main";
import Header from "../components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyMenu from "../components/MyMenu";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <MyMenu />
      <Routes>
        <Route path="/index" element={<Home />} />
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
