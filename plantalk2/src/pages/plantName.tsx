import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  mailAtom,
  passwordAtom,
  plantnameAtom,
  planttypeAtom,
  usernameAtom,
} from "../atoms/authAtoms";
import InputWithIcon from "../components/InputwithIcon/InputWithIcon";
import "./PlantName.css";
import Select, { StylesConfig, CSSObjectWithLabel } from "react-select";
import { useState, useEffect } from "react";
import FlowerGreen from "../layout/Flower";
import FlowerPink from "../layout/FlowerPink";

type OptionType = {
  value: string;
  label: string;
};

type UserData = {
  email?: string;
  name?: string;
  password?: string;
  species?: string;
  speciesName?: string;
};

const PlantName = () => {
  const [plantType, setPlantType] = useAtom(planttypeAtom);
  const [plantName] = useAtom(plantnameAtom);
  const [username] = useAtom(usernameAtom);
  const [email] = useAtom(mailAtom);
  const [password] = useAtom(passwordAtom);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(plantName.trim().length > 0 && plantType.length > 0);
  }, [plantName, plantType]);

  const customStyles: StylesConfig<OptionType> = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      border: "none",
      boxShadow: "none",
    }),
  };

  const fetchPrivatePosts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("トークンがありません");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/post/private`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        return data;
      } else {
        console.log("失敗", data);
      }
    } catch (error) {
      console.error("エラー", error);
    }
  };

  

  const submitData = {
    email: email,
    password: password,
    species: plantName,
    speciesName: plantType,
    name:username
  };
  console.log("submitData",submitData)

  const clickNewUser = async (data: UserData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("data", data);
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        console.log("ログイン成功", result);

        const privateMessage = await fetchPrivatePosts();

        navigate("/home", { state: privateMessage });
      } else {
        console.log("ログイン失敗", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const plantselect = [
    { value: "blueberry", label: "ブルーベーリー" },
    { value: "radish", label: "ラディッシュ" },
    { value: "banyan tree", label: "ガジュマル" },
    { value: "pachira", label: "パキラ" },
    { value: "monstera", label: "モンステラ" },
    { value: "pothos", label: "ポトス" },
    { value: "asianatum", label: "アジアンタム" },
    { value: "pygmy waterlily", label: "サンスベリア" },
    { value: "cyclamen", label: "シクラメン" },
    { value: "begonia", label: "ベゴニア" },
    { value: "marguerite", label: "マーガレット" },
  ];

  return (
    <div className="plantname-screen">
      <div className="flower-container">
        <div className="Flowergreen">
          <FlowerGreen />
        </div>
        <div className="Flowerpink">
          <FlowerPink />
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
          value={
            plantselect.find((option) => option.value === plantType) || null
          }
          onChange={(newValue) => setPlantType(newValue?.value || "")}
          className="planttype"
          styles={customStyles}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
        <div className="ok-button-container">
          <button
            className="ok-button"
            style={{
              opacity: isValid ? 1 : 0.5,
              pointerEvents: isValid ? "auto" : "none",
            }}
            onClick={() => clickNewUser(submitData)}
          >
            OK
          </button>
          <Link to="/newregistrationscreen" className="back-button3">
            戻る
          </Link>
        </div>
      </div>
      <div className="flower-container2">
        <div className="Flowergreen2">
          <FlowerPink />
        </div>
        <div className="Flowerpink2">
          <FlowerGreen />
        </div>
      </div>
    </div>
  );
};

export default PlantName;
