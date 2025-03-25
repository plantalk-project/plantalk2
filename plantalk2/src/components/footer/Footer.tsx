import CalenderButton from '../calenderButton/calenderButton'
import ChatButton from '../chatButton/ChatButton'
import DictionaryButton from '../dictionaryButton/DictionaryButton'
import HomeButton from '../homebutton/HomeButton'
import './Footer.css'
import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
        <HomeButton/>
        <ChatButton/>
        <CalenderButton/>
        <DictionaryButton/>
    </div>
  )
}

export default Footer