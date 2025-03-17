import React from 'react'
import Login from './login'
import Dictionary from './dictionary'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Title from './Title';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dictionary' element={<Dictionary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
