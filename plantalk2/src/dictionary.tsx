import { ReactSVG } from 'react-svg'
import './dictionary.css'
import { SlidePrevButton } from './components/calender/SlideprevButton'
import { SlideNextButton } from './components/calender/SlideNextButton'
import { useLocation, useNavigate } from 'react-router-dom'
 import { useState } from 'react'
import Footer from './components/footer/Footer'

function Dictionary() {
    const location = useLocation();
     const navigate = useNavigate();
     const [useNext, setUseNext] = useState(location.state?.useNext || false);
 
     const handleClosePopup = () => {
         setUseNext(false);
         navigate('/chat');
     };
    return (
        <div className="dictionary-page">
            <div className={`overlay ${useNext ? 'show' : ''}`}>
             <div className={`popup ${useNext ? 'show' : ''}`}>
                <div className="popup-content">
                     <p>図鑑に登録されました</p>
                     <button className="popup-button" onClick={handleClosePopup}>
                         次へ
                     </button>
                </div>
             </div>
            </div>
        <div className="dictionary-box">
            <div className="dictionary-content">
            <div className="title-text">植物図鑑</div>
            <div className="dictionary-text">No.1</div>
                <div className="dictionary-name">スミレちゃん</div>
            <div className="dictionary-container">
            
                <div className="dictionary-picture">
                    <img src="../images/sumire.jpg" alt="スミレ" />
                </div>
            

                <div className="dictionary-text">
                    植物名: <br></br>
                    種類: <br></br>
                    花言葉: <br></br>
                    開花にかかった期間: <br></br>
                    性格: <br></br>
                </div>      
            </div>
            <div className="trivia">
                    <div>
                    <p className="bubble">
                        【ポポタのまめちしき】<br/>
                        花の根元の形が墨つぼに似ていたことからスミイレを略してスミレと呼ばれるようになったポ！
                    </p>
                    </div>
                <ReactSVG  src="/img/popota.svg"/>
            </div>

            <div className="slider-button">
                <div className="slider-prev-button">
                    <SlidePrevButton />
                </div>

                <div className="slider-next-button">
                     <SlideNextButton />
                </div>
            </div>
            </div>
            <Footer/>
        </div>
        </div>
    )
}

export default Dictionary