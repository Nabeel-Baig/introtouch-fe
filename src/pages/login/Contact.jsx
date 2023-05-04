import Container from "../../components/common/Container";
import TextField from "../../components/common/TextField";
import mail from "../../assets/icons/auth/mail.png";
import Button from "../../components/common/Button";
import { Link, Navigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { AUTH_STATES } from "../../constants";
import { updateUser, userSignOut } from "../../services";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/actions";

const Contact = ({ auth, setauth, username = "" }) => {
  const [contact, setContact] = useState({
    mobile: "",
    workplace: "",
    fax: "",
    role: "",
    company:""
  });

  const [roleError, setRoleError] = useState();
  const [contactError, setContactError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handlSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        setRoleError(null);
        setContactError(null);
        if (!contact.role) {
          setRoleError("Please enter your job title");
        }
        if (!contact.fax && !contact.mobile && !contact.workplace) {
          setContactError("Please enter atleast one contact");
        }
        if (contact.role && (contact.fax || contact.mobile || contact.workplace)) {
          await updateUser({
            role: contact.role,
            landPhone: contact.workplace,
            fax: contact.fax,
            mobile: contact.mobile,
            company:contact.company
          });

          dispatch(getUser());
          setauth(AUTH_STATES.LOGGED);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        return;
      }
    },
    [contact]
  );

  if (auth === AUTH_STATES.LOGGED|| auth === AUTH_STATES.ADMIN) {
    return <Navigate to="/" replace={true} />;
  } else if (auth === AUTH_STATES.NO_AUTH) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return (
    <div id="login">
      <Container>
        <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white px-6 pt-[30px]">
          <h1 className="text-center text-xl text-brand-dark-gray font-extrabold font-inter">
            Contact Details
          </h1>
          <p className="text-[12px] text-center font-inter text-brand-mid-gray">
            Please enter your contact details
          </p>
          <form className="space-y-[36px] mt-10">
          <TextField
              icon={mail}
              label="Company"
              type="text"
              value={contact.company}
              onChange={(e) => setContact({ ...contact, company: e.target.value })}
              id="company"
            />
            <TextField
              icon={mail}
              label="Job title (ex: Web Developer)"
              type="text"
              error={roleError}
              value={contact.role}
              onChange={(e) => setContact({ ...contact, role: e.target.value })}
              id="role"
            />
            <TextField
              icon={mail}
              label="Mobile Number"
              type="tel"
              error={contactError}
              value={contact.mobile}
              onChange={(e) =>
                setContact({ ...contact, mobile: e.target.value })
              }
              id="mobile"
            />
            <TextField
              icon={mail}
              label="Workplace Number"
              type="tel"
              error={contactError}
              value={contact.workplace}
              onChange={(e) =>
                setContact({ ...contact, workplace: e.target.value })
              }
              id="workplace"
            />
            <TextField
              icon={mail}
              label="Fax Number"
              type="tel"
              error={contactError}
              value={contact.fax}
              onChange={(e) => setContact({ ...contact, fax: e.target.value })}
              id="fax"
            />
            <Button isLoading={isLoading} text="Save" className="px-10" onClick={handlSubmit} />
            <p className="text-[14px] font-inter text-center">
              Need to login from a different user?&nbsp;&nbsp;
              <Link
                to={"/auth/login"}
                onClick={() => userSignOut()}
                className="text-brand-sky hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
          <form className="mt-[30px]"></form>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
