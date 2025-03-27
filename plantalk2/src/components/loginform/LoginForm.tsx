import React from 'react';
import { useAtom } from 'jotai';
import InputWithIcon from '../InputwithIcon/InputWithIcon';
import { usernameAtom, passwordAtom, isLoggedInAtom, mailAtom } from '../../atoms/authAtoms';
import './LoginForm.css'

const LoginForm: React.FC = () => {
  const [username] = useAtom(usernameAtom);
  const [password] = useAtom(passwordAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const handleLogin = () => {
    // ここにログイン処理を実装
    if (username && password) {
      setIsLoggedIn(true);
      console.log('ログイン処理:', { username, password });
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
        type="mail"
        atom={mailAtom}
        placeholder='メールアドレス'
      />
      <InputWithIcon 
        type="password"
        atom={passwordAtom}
        placeholder='パスワード'
      />
      <button className="ok-button" onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default LoginForm; 