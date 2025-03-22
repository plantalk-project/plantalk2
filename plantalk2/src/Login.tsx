import { useAtom } from 'jotai'
import LoginForm from './components/loginform/LoginForm'
import RegisterSection from './components/RegisterSection/RegisterSection'
import { isLoggedInAtom } from './atoms/authAtoms'
import './Login.css'

function Login() {
  const [isLoggedIn] = useAtom(isLoggedInAtom)

  if (isLoggedIn) {
    return (
      <div className="login-screen">
        <h2>ログインしました！</h2>
      </div>
    )
  }

  return (
    <div className="login-screen">
      <LoginForm />
      <RegisterSection />
    </div>
  )
}

export default Login 