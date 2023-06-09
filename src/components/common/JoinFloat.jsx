import { Link } from 'react-router-dom';
import './join-style.css';


const JoinFloat = ({to, title}) => {
  return(
    <div className="join-btn-wrapper">
      <Link to={to} target="_blank" className="join-btn">{title}</Link>
    </div>
  )
}

export default JoinFloat
