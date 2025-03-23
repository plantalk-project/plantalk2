import { useEffect, useState } from "react";
import "./ChatApp.css";

import { useForm } from "react-hook-form";
import Input from "../layout/Input";

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

  const [token, setToken] = useState(localStorage.getItem("token") || ""); //トークンの値を取得

  //ローカルストレージからトークンの値を取得
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/chat/getChatHistory",
          {
            //チャットのAPIを呼び出す
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const data = await response.json();
        console.log("取得したチャット履歴:", data);

        setChatHistoryModel(data.chatHistoryModel);
        console.log("messages", data.chatHistoryModel);

        setChatHistoryUser(data.chatHistoryUser);
        console.log("messages", data.chatHistoryUser);
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

  const form2 = useForm();

  //メッセージを送信する関数
  const postLogin = async () => {
    //メッセージを送信するデータを作成
    const sendData = {
      message: form2.getValues("message") || "",
    };

    console.log("送信データ:", sendData);
    console.log("メッセージ:", sendData.message);

    try {
      const chatResponse = await fetch("http://localhost:3003/chat/chat", {
        //チャットのAPIを呼び出す
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(sendData),
      });

      const result = await chatResponse.json();
      console.log("result", result);

      if (result.text) {
        //仮のデータ//useStateで仮の値設定した場合リロードしたらuseStateの値は初期化、データベースの処理が反映される
        setChatHistoryUser((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            userId: "currentUser",
            message: sendData.message,
            sender: "user",
            recordedAt: new Date(),
          },
        ]);

        // AI のレスポンスを追加
        setChatHistoryModel((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            userId: "currentUser",
            message: result.text,
            sender: "model",
            recordedAt: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const defaultValues = [
    { label: "メッセージ", fieldName: "message", id: "message" },
  ];

  //[...chatHistoryUser, ...chatHistoryModel]で2つの値を結合
  //.sortで日付順にソート
  const sortedMessages = [...chatHistoryUser, ...chatHistoryModel].sort(
    (a, b) =>
      new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  );

  return (
    <div className="chat-app">
      {/* メッセージリスト */}
      <div className="messages-list">
        {sortedMessages.map((msg, index) => (
          <div key={index}>
            <div
              className={
                msg.sender === "user" ? "user-chat-area" : "ai-chat-area"
              }
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <div>
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
            <button type="submit">送信</button>
          </div>
        </form>
      </div>
    </div>
  );
}
