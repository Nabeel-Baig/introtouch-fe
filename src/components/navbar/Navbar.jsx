import home from '../../assets/icons/nav/home.png';
import user from '../../assets/icons/nav/user.png';
import chart from '../../assets/icons/nav/chart.png';
import qr from '../../assets/icons/nav/qr.png';
import Navlink from './Navlink';
import './styles.css'
import JoinFloat from '../common/JoinFloat';
import env from "../../env.json";


const navlinks = [
    {title: 'Home', icon: home, to: '/'},
    {title: 'Contacts', icon: user, to: '/contacts'},
    {title: 'Analytics', icon: chart, to: '/analytics'},
    {title: 'Products', icon: qr, to: ''},
];

const Navbar = ({userProfile, username}) => {
  const link = `${env.websiteDomain}/profile/${
      username ? username : userProfile?.username
  }`;
    return (
        <>
            <JoinFloat title="Public Preview" to={link} />
            <div
                id="navabar"
                className=" bg-black text-white flex justify-around p-3 fixed-navbar z-50"
            >
                {navlinks.map((link, i) => (
                    <Navlink data={link} key={i}/>
                ))}
            </div>
        </>
    );
};

export default Navbar;
