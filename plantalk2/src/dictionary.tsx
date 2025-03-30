import { ReactSVG } from 'react-svg'
import './dictionary.css'
import { SlidePrevButton } from './components/calender/SlideprevButton'
import { SlideNextButton } from './components/calender/SlideNextButton'

function Dictionary() {
    return (
        <div className="dictionary-page">
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
        </div>
        </div>
    )
}

export default Dictionary