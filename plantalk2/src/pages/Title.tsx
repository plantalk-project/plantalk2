import { Link } from "react-router-dom"
import './Title.css'


const Title = () => {
    return (
        <div className="title-screen">
            <div className="logo-container">
                <Link to='/Select' className="start-text">
                    <img src="/plantalk.png" alt="PlantTalk Logo" className="logo-image" />
                </Link>
            </div>
        </div>
    )
}

export default Title