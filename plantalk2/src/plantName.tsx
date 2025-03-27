import { Link } from "react-router-dom"
import { plantnameAtom, planttypeAtom } from "./atoms/authAtoms"
import InputWithIcon from "./components/InputwithIcon/InputWithIcon"
import './PlantName.css'

const PlantName = () => {
  return (
    <div className="plantname-screen">
      <img src="/plantalk2.png" alt="PlantTalk Logo" className="logo-image3" />
        <div className="plantname-container">
            <InputWithIcon 
            type="plantname"
            atom={plantnameAtom}
            placeholder="育てる植物の名前"
            />
            <p className="name">好きな名前をつけて下さい</p>
            <InputWithIcon 
            type="planttype"
            atom={planttypeAtom}
            placeholder="育てる植物の種類"
            />                              
            <Link to='/home' className="ok-button">OK</Link>
        </div>
    </div>
  )
}

export default PlantName