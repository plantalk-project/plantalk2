import "./Home.css"
import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { usernameAtom } from "../atoms/authAtoms"
import Footer from "../components/footer/Footer"
import Popota from "../components/Popota"
import { ReactSVG } from "react-svg"
import PlanTalk from "../components/Plantalk"

const Number = () => {
  const [number, setNumber] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const WebSocketUrl = window.location.href.replace("http", "ws").slice(0,-1) + ":81";
  useEffect(() => {
    const socket = new WebSocket(WebSocketUrl);
    console.log(socket);

    socket.onopen = () => {
      console.log('WebSocket接続が確立されました');
      setError(null);
    };

    socket.onerror = (error) => {
      console.error('WebSocketエラー:', error);
      setError('接続エラーが発生しました');
    };
    socket.onmessage = (event) => {
      const data = event.data;
      setNumber(data);
    };

    socket.onclose = () => {
      console.log('WebSocket接続が閉じられました');
    };
    return () => {
      socket.close();
    };
  },[]);

  if (error) {
    return <div className="error">{error}</div>;
  }
  return <div>{number}</div>;
}


const Home = () => {
  const [username] = useAtom(usernameAtom)
  return (
    <div className="home-page">
      <PlanTalk />
      <div className="main-contents">
        <div className="plant-name">
          <div className="plant-name-text">ブルーベリー</div>
          <ReactSVG src="/img/pen.svg" />
        </div>
        {/* <Number/> */}
        <div className="condition-box">
            <div>今日の調子</div>
              <div className="condition-text">超いい感じ！
              </div>
         </div>

        <div className="home-status-box">
            <ReactSVG className="box-svg" src="/img/weather.svg" />
            <div className="box-percent-text">50%</div>
            <div className="box-status-text">日照度</div>
        </div>
        <div className="home-status-box">
            <ReactSVG className="box-svg" src="/img/moisture-content.svg" />
            <div className="box-percent-text">60%</div>
            <div className="box-status-text">水分量</div>
        </div>
        <div className="home-status-box">
            <ReactSVG className="box-svg" src="/img/hygrometer.svg" />
            <div className="box-percent-text">35%</div>
            <div className="box-status-text">湿度</div>
        </div>
        <div className="home-status-box">
            <ReactSVG className="box-svg" src="/img/thermometer.svg" />
            <div className="box-percent-text">26°C</div>
            <div className="box-status-text">温度</div>
        </div>
      </div>
      
      <div className="bottom">
        <Popota />
        <Footer/>
      </div>
    </div>
  )
}

export default Home