import React from 'react';
import { Link } from 'react-router-dom';
import HomeButton from '../homebutton/HomeButton';
import ChatButton from '../chatButton/ChatButton';
import CalenderButton from '../calenderButton/CalenderButton';
import DictionaryButton from '../dictionaryButton/DictionaryButton';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <Link to="/home" className="footer-button">
        <HomeButton />
      </Link>
      <Link to="/chat" className="footer-button">
        <ChatButton />
      </Link>
      <Link to="/calendar" className="footer-button">
        <CalenderButton />
      </Link>
      <Link to="/dictionary" className="footer-button">
        <DictionaryButton />
      </Link>
    </div>
  );
};

export default Footer;