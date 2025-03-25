import { Link } from "react-router-dom"
import './Title.css'

const Title = () => {
    return (
        <div className="title-screen">
                <h1 className="title">PlanTalk</h1>
                <Link to='/Select' className="start-text">Tap To Start</Link>
        </div>
    )
}
export default Title