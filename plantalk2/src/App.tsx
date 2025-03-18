import React from "react";
import Login from "./login";
import Dictionary from "./dictionary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Title from './Title';
import Newregistrationscreen from './Newregistrationscreen';
import PlantName from './plantName';
import Clalender from "./Clalender";
import Slider from "./Slider";
import Modal from "./Modal";


const App: React.FC = () => {
  return (
    <BrowserRouter>
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
          <Route path='plantname' element={<PlantName />} />
          <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
    </BrowserRouter>
  );
};

export default App;
