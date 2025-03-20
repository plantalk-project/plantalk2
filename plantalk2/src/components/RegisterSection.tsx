import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterSection.css';

const RegisterSection: React.FC = () => {
  return (
    <div className="register-container">
      <Link to="/newregistrationscreen" className="next-button">新規登録</Link>
    </div>
  );
};

export default RegisterSection; 