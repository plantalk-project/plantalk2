import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterSection.css';

const RegisterSection: React.FC = () => {
  return (
    <div className="register-container">
      <p>新しくきた人はこっちで登録してね</p>
      <Link to="/Newregistrationscreen" className="next-button">次へ</Link>
    </div>
  );
};

export default RegisterSection; 