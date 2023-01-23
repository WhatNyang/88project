import Main from "../pages/Main";
import Header from "../components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";

import Mypage from "../pages/Mypage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MypageHonggu from "../pages/MypageHonggu";
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/index" element={<Home />} />
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/MypageHonggu" element={<MypageHonggu />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
