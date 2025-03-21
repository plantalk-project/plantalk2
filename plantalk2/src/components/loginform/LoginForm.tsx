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
      <h2 className='login-character'>ログイン</h2>
      <InputWithIcon 
        label="あなたの名前を教えてね"
        type="username"
        atom={usernameAtom}
      />
      <InputWithIcon
        label="メールアドレスを打ってね"
        type="mail"
        atom={mailAtom}
      />
      <InputWithIcon 
        label="パスワードを打ってね"
        type="password"
        atom={passwordAtom}
      />
      <button className="ok-button" onClick={handleLogin}>OK</button>
    </div>
  );
};

export default LoginForm; 