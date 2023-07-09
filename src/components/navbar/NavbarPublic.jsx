import call from '../../assets/icons/auth/phone.png';
import text from '../../assets/icons/nav/text.png';
import mail from '../../assets/icons/auth/mail.png';
import Navlink from './Navlink';
import './styles.css'

const navlinks = [
  { title: 'Call', icon: call, to: '/' },
  { title: 'Text', icon: text, to: '/' },
  { title: 'Email', icon: mail, to: '/' },
];

const NavbarPublic = () => {
  return (
    <>
      <div
        id="navabar"
        className=" bg-black text-white flex justify-around p-3 fixed-navbar z-50"
      >
        {navlinks.map((link, i) => (
          <Navlink data={link} key={i} />
        ))}
      </div>
    </>
  );
};

export default NavbarPublic;
