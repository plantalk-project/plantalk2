import { useEffect, useRef, useState } from "react";
import "./ChatApp.css";

import { SlidePrevButton } from "../components/calender/SlideprevButton";
import { useForm } from "react-hook-form";
import Input from "../layout/Input";
import { ReactSVG } from "react-svg";

export default function ChatApp() {
  const [chatHistoryModel, setChatHistoryModel] = useState<
    {
      id: string;
      userId: string;
      message: string;
      sender: string;
      recordedAt: Date;
    }[]
  >([]);
  const [chatHistoryUser, setChatHistoryUser] = useState<
    {
      id: string;
      userId: string;
      message: string;
      sender: string;
      recordedAt: Date;
    }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [token, setToken] = useState(localStorage.getItem("token") || ""); //トークンの値を取得
  const [sendmessage,setSendmessage] = useState("")

  const [currentData, setCurrentData] = useState<
    {
      sender: string;
      message: string;
    }[]
  >([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistoryModel, chatHistoryUser, currentData]);

  useEffect(() => {
    const fetchChatResponse = async () => {
      try {
        const chatResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/chat/start`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify(sendData),
          }
        );

        const result = await chatResponse.json(); 
        console.log("result", result);

        if (result.text) {
          setCurrentData((prev) => [
            ...prev,
            { sender: "model", message: result.text },
          ]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchChatResponse();
  }, []);

  const [sendData, setSendData] = useState<string[]>([]);

  const handleMessageChage = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setSendmessage(event.target.value)
  }

  //メッセージを送信する関数
  const postLogin = async () => {
    //メッセージを送信するデータを作成

   
    const sendData = {
      message: sendmessage,
    };


    console.log("送信データ:", sendmessage);
    console.log("メッセージ:", sendmessage);

    setSendmessage("");
    event.preventDefault(); 

    setCurrentData((prev) => [
      ...prev,
      { sender: "user", message:sendmessage },
    ]);

    try {
      const chatResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/chat/chat`,
        {
          //チャットのAPIを呼び出す
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(sendData),
        }
      );

      const result = await chatResponse.json();
      console.log("result", result);

      if (result.text) {
        //仮のデータ//useStateで仮の値設定した場合リロードしたらuseStateの値は初期化、データベースの処理が反映される
        setCurrentData((prev) => [
          ...prev,
          { sender: "model", message: result.text },
        ]);
      }
    } catch (error) {
      console.log("error", error);
    }


  };

  //ローカルストレージからトークンの値を取得
  useEffect(() => {
    console.log("import.meta.env.VITE_API_URL", import.meta.env.VITE_API_URL);
    console.log(`${import.meta.env.VITE_API_URL}/chat/getChatHistory`);

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/chat/getChatHistory`,
          {
            //チャットのAPIを呼び出す
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text(); // JSONでない可能性があるので text() で確認
          console.error("Error response:", response.status, errorText);
          throw new Error(`API request failed with status ${response.status}`);
        }

        if (response.ok) {
          console.log("ok");
          const data = await response.json();
          console.log("取得したチャット履歴:", data);

          setChatHistoryModel(data.chatHistoryModel);
          console.log("messages", data.chatHistoryModel);

          setChatHistoryUser(data.chatHistoryUser);
          console.log("messages", data.chatHistoryUser);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    fetchChatHistory();
  }, []);


  console.log("token", token);



  //[...chatHistoryUser, ...chatHistoryModel]で2つの値を結合
  //.sortで日付順にソート
  const sortedMessages = [...chatHistoryUser, ...chatHistoryModel].sort(
    (a, b) =>
      new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  );



  return (
    <div className="chat-app">
      {/* メッセージの履歴 */}
      <header className="chat-hed">
          <div className="slider-prev-button">
              <SlidePrevButton />
          </div>
        <div className="chat-hed-name">ブルベ冬</div>
      </header>
      <div className="messages-list">
        <div>
        {sortedMessages.map((msg, index) => (
          <div
            className={
              msg.sender === "user" ? "user-chat-area" : "ai-chat-area"
            }
            key={index}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 送信したメッセージ */}
      <div className="messages-list">
        {currentData.map((msg, index) => (
          <div>
            
            <div
              key={index}
              className={
                msg.sender === "user" ? "user-chat-area" : "ai-chat-area"
              }
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      
          {/* 入力エリア */}
      <div className="send-area">
        <form className="chat-form" onSubmit={postLogin}>          
          <textarea className = "chat-sent-message"
          placeholder="メッセージ"
          onChange={handleMessageChage}
          value={sendmessage}
          >
          </textarea>
          <button type="submit" className="sendbutton">
            <ReactSVG src="/img/send.svg"/>
          </button>
        </form>
      </div>
      {/* <img src="/img/popota.svg"  className="background-popota" width={450} /> */}
    </div>
  );
}
