import { plantnameAtom, planttypeAtom } from "./atoms/authAtoms"
import InputWithIcon from "./components/InputwithIcon/InputWithIcon"
import './PlantName.css'

const PlantName = () => {
  return (
    <div className="plantname-screen">
      <h2 className="new-registration-character">新規登録画面</h2>
        <div className="plantname-container">
            <InputWithIcon 
            type="plantname"
            atom={plantnameAtom}
            placeholder="育てる植物の名前"
            />
            <InputWithIcon 
            type="planttype"
            atom={planttypeAtom}
            placeholder="育てる植物の種類"
            />                              
            <button>OK</button>
        </div>
    </div>
  )
}

export default PlantName