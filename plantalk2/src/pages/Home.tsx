import "./Home.css"
import React from 'react'
import { useAtom } from 'jotai'
import { usernameAtom } from "../atoms/authAtoms"
import Footer from "../components/footer/Footer"

const Home = () => {
  const [username] = useAtom(usernameAtom)
  return (
    <>
        <div>{username}</div>
        <div>日照度</div>
        <div>水分量</div>
        <div>湿度</div>
        <div>温度</div>
        <Footer/>
    </>
  )
}

export default Home