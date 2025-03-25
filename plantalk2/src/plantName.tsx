import { Link } from "react-router-dom"
import { plantnameAtom, planttypeAtom } from "./atoms/authAtoms"
import InputWithIcon from "./components/InputwithIcon/InputWithIcon"
import './PlantName.css'

const PlantName = () => {
  return (
    <div className="plantname-screen">
      <h2 className="new-registration-character">新規登録画面</h2>
        <div className="plantname-container">
            <InputWithIcon 
            label="植物につけたい名前をつけてね"
            type="plantname"
            atom={plantnameAtom}
            />
            <InputWithIcon
            label="植物の植物の種類を教えてね"
            type="planttype"
            atom={planttypeAtom}
            />                              
            <Link to='/Home'>OK</Link>
        </div>
    </div>
  )
}

export default PlantName