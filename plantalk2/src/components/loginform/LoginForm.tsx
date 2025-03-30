import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import InputWithIcon from "../InputwithIcon/InputWithIcon";
import {
  usernameAtom,
  passwordAtom,
  isLoggedInAtom,
  mailAtom,
} from "../../atoms/authAtoms";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import FlowerGreen from "../../layout/Flower";
import FlowerPink from "../../layout/FlowerPink";

interface submitDataType {
  email: string;
  password: string;
  name: string;
}

const LoginForm: React.FC = () => {
  const [username] = useAtom(usernameAtom);
  const [password] = useAtom(passwordAtom);
  const [email] = useAtom(mailAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  // 登録済みの値と比較
  const registeredUser = {
    username: localStorage.getItem("registeredUsername"),
    email: localStorage.getItem("registeredEmail"),
    password: localStorage.getItem("registeredPassword"),
  };

  useEffect(() => {
    const checkCredentials = () => {
      setIsValid(
        username === registeredUser.username &&
          email === registeredUser.email &&
          password === registeredUser.password
      );
    };

    checkCredentials();
  }, [username, email, password]);

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
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        console.error("HTTPエラー:", response.status, responseText);
        return;
      }

      const data = JSON.parse(responseText);
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
    name: username,
  };

  const handleLogin = async (data: submitDataType) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        console.log("ログイン成功", result);

        const privateMessage = await fetchPrivatePosts();

        console.log("privateMessage",privateMessage)

        navigate("/home", { state: privateMessage });
      } else {
        console.log("ログイン失敗", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="login-container">
      <div className="flower-container">
        <div className="Flowergreen">
          <FlowerGreen />
        </div>
        <div className="Flowerpink">
          <FlowerPink />
        </div>
      </div>
      <InputWithIcon
        type="username"
        atom={usernameAtom}
        placeholder="ユーザー名"
      />
      <InputWithIcon
        type="email"
        atom={mailAtom}
        placeholder="メールアドレス"
      />
      <InputWithIcon
        type="password"
        atom={passwordAtom}
        placeholder="パスワード"
      />
      {/* <Link 
        to={isValid ? '/home' : '#'} 
        className="ok-button2" 
        onClick={() => handleLogin(submitData)}

      >
        ログイン
      </Link> */}

      <div className="ok-button-container">
        <button
          className="ok-button"

          onClick={() => handleLogin(submitData)}
        >
          ログイン
        </button>
      </div>

      <Link to="/select" className="back-button">
        戻る
      </Link>
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

export default LoginForm;
