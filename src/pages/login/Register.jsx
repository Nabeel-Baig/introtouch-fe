import Container from "../../components/common/Container";
import TextField from "../../components/common/TextField";
import mail from "../../assets/icons/auth/mail.png";
import lock from "../../assets/icons/auth/lock.png";
import Button from "../../components/common/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { userSignIn, userSignUp } from "../../services";
import { AUTH_STATES } from "../../constants";
import userIcon from '../../assets/icons/auth/user.png'

const Register = ({ auth, setauth, setTempUser }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState();
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [overallError, setOverallError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        setConfirmPasswordError(null);
        setPasswordError(null);
        setFirstNameError(null);
        setLastNameError(null);
        setEmailError(null);
        setOverallError(null);
        if (!data.firstName) {
          setFirstNameError("Please enter your first name");
        }
        if (!data.lastName) {
          setLastNameError("Please enter your first name");
        }
        if (!data.email) {
          setEmailError("Please enter your email");
        }
        if (!data.password) {
          setPasswordError("Please enter your password");
        }
        if (
          !data.email ||
          !data.firstName ||
          !data.lastName ||
          !data.password
        ) {
          setIsLoading(false);

          return;
        }
        if (
          data.confirmPassword &&
          data.password &&
          data.confirmPassword === data.password
        ) {
          await userSignUp(
            data.email,
            data.password,
            data.firstName,
            data.lastName
          );
          setTempUser({ username: data.email, password: data.password });
          navigate("/auth/otp", { replace: true });
        } else {
          setConfirmPasswordError("The password confirmation does not match");
          setIsLoading(false);
        }
      } catch (error) {
        if (error.code === "UsernameExistsException") {
          setEmailError("An account with the given email already exists");
        } else {
          setOverallError(error?.message || "Something went wrong");
        }
        setIsLoading(false);
      }
    },
    [data]
  );

  if (auth === AUTH_STATES.LOGGED|| auth === AUTH_STATES.ADMIN) {
    return <Navigate to="/" replace={true} />;
  }
  if (auth === AUTH_STATES.NO_CONTACT) {
    return <Navigate to="/auth/contact" replace={true} />;
  }
  if (auth === AUTH_STATES.UNCONFIRMED) {
    return <Navigate to="/auth/otp" replace={true} />;
  }

  return (
    <div id="login">
      <Container>
        <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white px-6 pt-[30px]">
          <h1 className="text-center text-xl text-brand-dark-gray font-extrabold font-inter">
            Register
          </h1>
          <p className="text-[12px] text-center font-inter text-brand-mid-gray">
            Please enter your basic user details
          </p>
          {overallError && (
            <p className="text-[12px] ml-5 font-inter text-red-600">
              {overallError}
            </p>
          )}
          <form className="space-y-[36px] mt-10">
            <TextField
              icon={userIcon}
              label="First Name"
              type="text"
              value={data.firstName}
              error={firstNameError}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              id="firstname"
            />
            <TextField
              icon={userIcon}
              label="Last Name"
              type="text"
              value={data.lastName}
              error={lastNameError}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              id="lastname"
            />
            <TextField
              icon={mail}
              label="Email ID"
              type="email"
              value={data.email}
              error={emailError}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              id="email"
            />

            <TextField
              icon={lock}
              type="password"
              label="Password"
              value={data.password}
              error={passwordError}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              id="password"
            />
            <TextField
              icon={lock}
              type="password"
              label="Confirm Password"
              error={confirmPasswordError}
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              id="password-confirmation"
            />
            <Button
              isLoading={isLoading}
              text="Next"
              className="px-10"
              onClick={handleRegister}
            />
            <p className="text-[14px] font-inter text-center">
              Already have an account?&nbsp;&nbsp;
              <Link
                to={"/auth/login"}
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

export default Register;
