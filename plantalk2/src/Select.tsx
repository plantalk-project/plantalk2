//import { useAtom } from 'jotai'
import { Link } from 'react-router-dom'
//import { isLoggedInAtom } from './atoms/authAtoms'
import './Select.css'

function Select() {
 // const [isLoggedIn] = useAtom(isLoggedInAtom)

  

  return (
    <div className="login-screen">
      <Link className="login-form-button" to="/login" >ログイン</Link>
      <Link className="register-section-button" to="/newregistrationscreen">新規登録</Link>
    </div>
  )
}

export default Select