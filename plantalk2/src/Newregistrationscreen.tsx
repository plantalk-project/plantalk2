import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mailAtom, passwordAtom, usernameAtom } from './atoms/authAtoms';
import { useAtom } from 'jotai';
import InputWithIcon from './components/InputwithIcon/InputWithIcon';
import './Newregistrationscreen.css';

const Newregistrationscreen = () => {
  const [username] = useAtom(usernameAtom);
  const [email] = useAtom(mailAtom);
  const [password] = useAtom(passwordAtom);
  const [isValid, setIsValid] = useState(false);

  // バリデーションチェック
  useEffect(() => {
    const validateForm = () => {
      // ユーザー名が空白でないか
      const isUsernameValid = username.trim().length > 0;
      
      // メールアドレスの形式チェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailRegex.test(email);
      
      // パスワードが6文字以上か
      const isPasswordValid = password.length >= 6;

      // すべての条件を満たしているか
      setIsValid(isUsernameValid && isEmailValid && isPasswordValid);
    };

    validateForm();
  }, [username, email, password]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト送信を防止
    if (isValid) {
      console.log('登録処理:', { username, email, password });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Enterキーのデフォルト動作を防止
    }
  };

  return (
    <div className="new-registration-screen">
      <img src="/plantalk2.png" alt="PlantTalk Logo" className="logo-image3" />
      <form onSubmit={handleRegister} className="new-registration-container">  
        <InputWithIcon 
          type="username"
          atom={usernameAtom}
          placeholder='ユーザー名'
          onKeyDown={handleKeyDown}
        />
        <InputWithIcon
          type="email"
          atom={mailAtom}
          placeholder='メールアドレス'
          onKeyDown={handleKeyDown}
        />
        <InputWithIcon 
          type="password"
          atom={passwordAtom}
          placeholder='パスワード'
          onKeyDown={handleKeyDown}
        />
        <p className='password-emergency'>6文字以上で設定してね</p>
        <Link 
          className={`ok-button ${!isValid ? 'disabled' : ''}`}
          to={isValid ? '/plantname' : '#'}
          style={{ 
            opacity: isValid ? 1 : 0.5,
            pointerEvents: isValid ? 'auto' : 'none'
          }}
        >
          新規登録
        </Link>
      </form>
    </div>
  );
};

export default Newregistrationscreen;