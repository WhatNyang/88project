import Main from "../pages/Main";
import Header from "../components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Main />}></Route> */}
        <Route path="/:id" element={<Detail />}></Route>
        <Route path="/" element={<Mypage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
