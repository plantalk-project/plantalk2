import React from 'react'
import Login from './Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Title from './components/title';


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div className="title-screen">
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
