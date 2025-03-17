import { mailAtom, passwordAtom, usernameAtom } from './atoms/authAtoms'
import InputWithIcon from './components/InputWithIcon';

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
      <div className="new-registration-container">
        <InputWithIcon 
          label="あなたの名前を教えてね"
          type="text"
          atom={usernameAtom}
        />
        <InputWithIcon
          label="メールアドレスを打ってね"
          type="mail"
          atom={mailAtom}
        />
        <div className = 'password-container'>
          <InputWithIcon 
            label="パスワードを打ってね"
            type="password"
            atom={passwordAtom}
          />
        </div>
        <p className='password-emergency'>6文字以上で設定してね</p>
        <button className="ok-button" onClick={handleRegister}>OK</button>
      </div>
    </div>
  )
}

export default Newregistrationscreen