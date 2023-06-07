import { Link } from 'react-router-dom';
import './join-style.css';


const JoinFloat = (props) => {
  return(
    <div className="join-btn-wrapper">
      <Link to={props.to} className="join-btn">Join Intro Touch</Link>
    </div>
  )
}

export default JoinFloat