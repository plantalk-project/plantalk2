import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import InputWithIcon from '../InputwithIcon/InputWithIcon';
import { usernameAtom, passwordAtom, isLoggedInAtom, mailAtom } from '../../atoms/authAtoms';
import './LoginForm.css'
import { Link } from 'react-router-dom';
import FlowerGreen from '../../layout/Flower';
import FlowerPink from '../../layout/FlowerPink';

const LoginForm: React.FC = () => {
  const [username] = useAtom(usernameAtom);
  const [password] = useAtom(passwordAtom);
  const [email] = useAtom(mailAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isValid, setIsValid] = useState(false);

  // 登録済みの値と比較
  const registeredUser = {
    username: localStorage.getItem('registeredUsername'),
    email: localStorage.getItem('registeredEmail'),
    password: localStorage.getItem('registeredPassword')
  };

  useEffect(() => {
    const checkCredentials = () => {
      setIsValid(
        username === registeredUser.username &&
        email === registeredUser.email &&
        password === registeredUser.password
      );
    };

    checkCredentials();
  }, [username, email, password]);

  const handleLogin = () => {
    if (isValid) {
      setIsLoggedIn(true);
      console.log('ログイン成功');
    } else {
      console.log('ログイン失敗');
    }
  };

  return (
    <div className="login-container">
      <div className='flower-container'>
        <div className='Flowergreen'>
          <FlowerGreen/>
        </div>
        <div className='Flowerpink'>
          <FlowerPink/>
        </div>
      </div>
      <InputWithIcon 
        type="username"
        atom={usernameAtom}
        placeholder='ユーザー名'
      />
      <InputWithIcon
        type="email"
        atom={mailAtom}
        placeholder='メールアドレス'
      />
      <InputWithIcon 
        type="password"
        atom={passwordAtom}
        placeholder='パスワード'
      />
      <Link 
        to={isValid ? '/home' : '#'} 
        className="ok-button2" 
        onClick={handleLogin}
        style={{ 
          opacity: isValid ? 1 : 0.5,
          pointerEvents: isValid ? 'auto' : 'none'
        }}
      >
        ログイン
      </Link>
      <Link to='/select' className='back-button'>戻る</Link>
      <div className='flower-container2'>
        <div className='Flowergreen2'>
          <FlowerPink/>
        </div>
        <div className='Flowerpink2'>
          <FlowerGreen/>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 