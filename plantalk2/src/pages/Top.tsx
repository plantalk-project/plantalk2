import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Input from "../layout/Input";
import { modalTokenAtom } from "../atoms/tokenAtoms";
import { useAtom } from "jotai";


function Top() {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useAtom(modalTokenAtom)

    const formName = useForm();

    const fetchPrivatePosts = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
          console.log("トークンがありません");
          return;
        }
        try {
          const response = await fetch("http://localhost:3003/post/private", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          });
          const data = await response.json();
    
          if (response.ok) {
            return data
          } else {
            console.log("失敗", data);
          }
        } catch (error) {
          console.error("エラー", error);
        }
      };

    const handleClick = async (data:string) => {
        try {
          const response = await fetch("http://localhost:3003/auth/register", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            
          });
          console.log("data",data)
          const result = await response.json();
          if (response.ok) {
            localStorage.setItem("token", result.token);
            console.log("ログイン成功", result);
            setToken(result.token);

            const privateMessage = await fetchPrivatePosts();
            
            navigate("/mypage",{state:privateMessage})
          } else {
            console.log("ログイン失敗", result);
          }
        } catch (error) {
          console.log("error", error);
        }
      };

    const defaultValues = [
        { label: "メール", fieldName: "email", id: "email" },
        { label: "名前", fieldName: "name", id: "name" },
        { label: "種類", fieldName: "species", id: "species" },
        { label: "植物の名前", fieldName: "speciesName", id: "speciesName" },
        { label: "パスワード", fieldName: "password", id: "password" }
      ];

    return (
      <div>

        <form onSubmit={formName.handleSubmit(handleClick)}>
        {defaultValues.map((value) => (
          <Input
            key={value.id}
            label={value.label}
            fieldName={value.fieldName}
            id={value.id}
            register={formName.register}
          />
        ))}
        <div>
          <button type="submit">サインアップ</button>
        </div>
      </form>
      </div>
    )
}

export default Top;
