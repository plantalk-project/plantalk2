//import { useAtom } from 'jotai'
import { Link } from 'react-router-dom'
//import { isLoggedInAtom } from './atoms/authAtoms'
import './Select.css'
import FlowerGreen from '../layout/Flower'
import FlowerPink from '../layout/FlowerPink'

function Select() {
 // const [isLoggedIn] = useAtom(isLoggedInAtom)

  

  return (
    <div className="login-screen">
      <div className='flower-container'>
        <div className='Flowergreen'>
          <FlowerGreen/>
        </div>
        <div className='Flowerpink'>
          <FlowerPink/>
        </div>
      </div>

      <img src="/plantalk2.png" alt="PlantTalk Logo" className="logo-image2" />
      <Link className="login-form-button" to="/login" >ログイン</Link>
      <Link className="register-section-button" to="/newregistrationscreen">新規登録</Link>
      
      <div className='flower-container2'>
        <div className='Flowergreen2'>
          <FlowerPink/>
        </div>
        <div className='Flowerpink2'>
          <FlowerGreen/>
        </div>
      </div>
    </div>
  )
}

export default Select