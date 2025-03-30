import { Link } from "react-router-dom"
import { useAtom } from 'jotai'
import { plantnameAtom, planttypeAtom } from "../atoms/authAtoms"
import InputWithIcon from "../components/InputwithIcon/InputWithIcon"
import './PlantName.css'
import Select, { StylesConfig, CSSObjectWithLabel } from 'react-select'

type OptionType = {
  value: string;
  label: string;
};

const PlantName = () => {
  const [plantType, setPlantType] = useAtom(planttypeAtom);

  const customStyles: StylesConfig<OptionType> = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      border: "none",  // 枠線を消す
      boxShadow: "none", // フォーカス時の枠線を消す
    }),
  };
  

  const plantselect = [
    { value: 'blueberry', label: 'ブルーベーリー' },
    { value: 'radish', label: 'ラディッシュ' },
    { value: 'banyan tree', label: 'ガジュマル' },
    { value: 'pachira', label: 'パキラ' },
    { value: 'monstera', label: 'モンステラ' },
    { value: 'pothos', label: 'ポトス' },
    { value: 'asianatum', label: 'アジアンタム'},
    { value: 'pygmy waterlily', label: 'サンスベリア'},
    { value: 'cyclamen', label: 'シクラメン'},
    { value: 'begonia', label: 'ベゴニア'},
    { value: 'marguerite', label: 'マーガレット'},
  ]

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
            <Select<OptionType>
              options={plantselect}
              placeholder="育てる植物の種類"
              value={plantselect.find(option => option.value === plantType) || null}
              onChange={(newValue) => setPlantType(newValue?.value || '')}
              className="planttype"
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
            <Link to='/home' className="ok-button">OK</Link>
        </div>
    </div>
  )
}

export default PlantName