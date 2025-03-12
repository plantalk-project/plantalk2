import './dictionary.css'

function Dictionary() {
    return (
        <div className="dictionary-screen">
            <h1>植物図鑑</h1>
            <div className="dictionary-container">
                <div className="dictionary-picture">
                    <img src="../images/sumire.jpg" alt="スミレ" />
                </div>
                <h3>No.1</h3>
                <h2>スミレちゃん</h2>
                <p>
                    植物名: <br></br>
                    種類: <br></br>
                    花言葉: <br></br>
                    開花にかかった期間: <br></br>
                    性格: <br></br>
                    まめちしき: <br></br>
                </p>
            </div>
        </div>
    )
}

export default Dictionary