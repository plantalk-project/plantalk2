import React from "react";
import Login from "./login";
import Dictionary from "./dictionary";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Clalender from "./Clalender";
import Slider from "./Slider";
import Modal from "./Modal";

import Title from "./Title";
import Newregistrationscreen from "./Newregistrationscreen";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="title-screen">
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calender" element={<Clalender />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/modal" element={<Modal />} />
          <Route
            path="/newregistrationscreen"
            element={<Newregistrationscreen />}
          />
          <Route path="/dictionary" element={<Dictionary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
