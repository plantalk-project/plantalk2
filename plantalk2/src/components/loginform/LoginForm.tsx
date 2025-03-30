import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import InputWithIcon from '../InputwithIcon/InputWithIcon';
import { usernameAtom, passwordAtom, isLoggedInAtom, mailAtom } from '../../atoms/authAtoms';
import './LoginForm.css'
import { Link } from 'react-router-dom';

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
        className="ok-button" 
        onClick={handleLogin}
        style={{ 
          opacity: isValid ? 1 : 0.5,
          pointerEvents: isValid ? 'auto' : 'none'
        }}
      >
        ログイン
      </Link>
    </div>
  );
};

export default LoginForm; 