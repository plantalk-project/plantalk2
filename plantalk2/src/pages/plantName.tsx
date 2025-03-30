import { Link } from "react-router-dom"
import { useAtom } from 'jotai'
import { plantnameAtom, planttypeAtom } from "../atoms/authAtoms"
import InputWithIcon from "../components/InputwithIcon/InputWithIcon"
import './PlantName.css'
import Select, { StylesConfig, CSSObjectWithLabel } from 'react-select'
import { useState, useEffect } from 'react'
import FlowerGreen from "../layout/Flower"
import FlowerPink from "../layout/FlowerPink"

type OptionType = {
  value: string;
  label: string;
};

const PlantName = () => {
  const [plantType, setPlantType] = useAtom(planttypeAtom);
  const [plantName] = useAtom(plantnameAtom);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      plantName.trim().length > 0 &&
      plantType.length > 0
    );
  }, [plantName, plantType]);

  const customStyles: StylesConfig<OptionType> = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      border: "none",
      boxShadow: "none",
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
      <div className='flower-container'>
        <div className='Flowergreen'>
          <FlowerGreen/>
        </div>
        <div className='Flowerpink'>
          <FlowerPink/>
        </div>
      </div>
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
            <div className="ok-button-container">
              <Link 
                to={isValid ? '/home' : '#'} 
                className="ok-button"
                style={{ 
                  opacity: isValid ? 1 : 0.5,
                  pointerEvents: isValid ? 'auto' : 'none'
                }}
              >
                OK
              </Link>
              <Link to='/newregistrationscreen' className="back-button3">戻る</Link>
            </div>
        </div>
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

export default PlantName