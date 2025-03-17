import { plantnameAtom, planttypeAtom } from "./atoms/authAtoms"
import InputWithIcon from "./components/InputWithIcon"
import './PlantName.css'

const PlantName = () => {
  return (
    <div className="plantname-screen">
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
            <button>OK</button>
        </div>
    </div>
  )
}

export default PlantName