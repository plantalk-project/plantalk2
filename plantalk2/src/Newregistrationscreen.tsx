import { Link } from 'react-router-dom';
import { mailAtom, passwordAtom, usernameAtom } from './atoms/authAtoms'
import InputWithIcon from './components/InputwithIcon/InputWithIcon';
import './Newregistrationscreen.css'

const Newregistrationscreen = () => {
  const passwordnum: number = passwordAtom.toString.length;
  console.log(passwordnum);
  if (passwordnum<6){
    console.log('パスワードが短すぎます');
  }
  const handleRegister = () => {
    // ここに登録処理を実装
    if (usernameAtom && mailAtom && passwordAtom) {
      console.log('登録処理:', { usernameAtom, mailAtom, passwordAtom });
    }
  }
  return (
    <div className = 'new-registration-screen'>
      <h2 className = 'new-registration-character'>新規登録</h2>
      <div className="new-registration-container">
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
        <div className = 'password-container'>
          <InputWithIcon 
            label="パスワードを決めてね"
            type="password"
            atom={passwordAtom}
          />
        </div>
        <p className='password-emergency'>6文字以上で設定してね</p>
        <Link className="ok-button" onClick={handleRegister} to='/plantname'>次へ</Link>
      </div>
    </div>
  )
}

export default Newregistrationscreen