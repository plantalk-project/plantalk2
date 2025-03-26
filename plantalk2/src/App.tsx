import React from "react";
import Login from "./Login";
import Dictionary from "./dictionary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Title from "./Title";
import Newregistrationscreen from "./Newregistrationscreen";
import PlantName from "./plantName";
import Clalender from "./components/calender/Clalender";
import Slider from "./pages/Slider";
import Modal from "./components/modal/Modal";
import "@fontsource/m-plus-rounded-1c/400.css";
import Users from "./pages/Users";
import Top from "./pages/Top";
import Mypage from "./pages/Mypage";
import ChatApp from "./pages/ChatApp";
import Popota from "./components/Popota";
import Flower from "./layout/Flower";
import FlowerGreen from "./layout/Flower";
import FlowerPink from "./layout/FlowerPink";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/modal" element={<Modal />} />
        <Route
          path="/newregistrationscreen"
          element={<Newregistrationscreen />}
        />
        <Route path="plantname" element={<PlantName />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/user" element={<Users />} />
        <Route path="/top" element={<Top />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/popota" element={<Popota />} />
        <Route path="/flowergreen" element={<FlowerGreen />} />
        <Route path="/flowerpink" element={<FlowerPink />} />
        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
