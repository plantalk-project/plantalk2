import { Link } from "react-router-dom"
import './Title.css'

const Title = () => {
    return (
        <div className="title-screen">
            <div className="white-circle circle-1"></div>
            <div className="white-circle circle-2"></div>
            <div className="white-circle circle-3"></div>
            <div className="content">
                <h1 className="title">PlanTalk</h1>
                <Link to='/login' className="start-text">タップでスタート！</Link>
            </div>
        </div>
    )
}
export default Title