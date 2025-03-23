import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../layout/Input";


function Users() {
    
    const form2 = useForm();
    const navigate = useNavigate();
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
  
    const postLogin = async (data) => {
      try {
        const response = await fetch("http://localhost:3003/auth/login", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
  
        if (response.ok) {
          localStorage.setItem("token", result.token);
          console.log("ログイン成功", result);
  
          const privateMessage = await fetchPrivatePosts();
  
          navigate("/mypage",{state:privateMessage})
          
        } else {
          console.log("ログイン失敗", result);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const hondleGet = async (link: string) => {
      return fetch(link, { method: "GET" })
        .then((res) => res.json()) //json方式でデータを受け取る
        .then((data) => {
          console.log("data:", data);
          return data;
        })
  
        .catch((err) => console.error("Error fetching data:", err));
    };
  
    const defaultValues = [
      { label: "メール", fieldName: "email", id: "email" },
      { label: "名前", fieldName: "name", id: "name" },
      { label: "パスワード", fieldName: "password", id: "password" },
    ];
  
    return (
      <div className="App">
        <button onClick={() => hondleGet("http://localhost:3003/auth")}>
          get
        </button>
        <button onClick={() => hondleGet("http://localhost:4001/post/public")}>
          public
        </button>
        <button onClick={() => fetchPrivatePosts()}>plivate</button>
  
        <form onSubmit={form2.handleSubmit(postLogin)}>
          {defaultValues.map((value) => (
            <Input
              key={value.id}
              label={value.label}
              fieldName={value.fieldName}
              id={value.id}
              register={form2.register}
            />
          ))}
          <div>
            <button type="submit">サインイン</button>
          </div>
        </form>
      </div>
    );
}

export default Users