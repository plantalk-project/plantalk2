import "./Home.css"
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { usernameAtom } from "../atoms/authAtoms"
import Footer from "../components/footer/Footer"

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
    <>
        <div>{username}</div>
        <Number/>
        <div>日照度</div>
        <div>水分量</div>
        <div>湿度</div>
        <div>温度</div>
        <Footer/>
    </>
  )
}

export default Home