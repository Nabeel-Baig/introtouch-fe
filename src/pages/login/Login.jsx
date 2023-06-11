import Container from "../../components/common/Container";
import TextField from "../../components/common/TextField";
import mail from "../../assets/icons/auth/mail.png";
import lock from "../../assets/icons/auth/lock.png";
import Button from "../../components/common/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userSignIn, googleSignIn, resendOtp } from "../../services";
import { memberEmailValidation } from "../../utils/validations";
import { AUTH_STATES } from "../../constants";
import Spinner from "../../components/common/Spinner";
import SocialBtn from "../../components/common/SocialBtn";
import './styles.css'

const Login = ({ auth, setTempUser }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState();
  const [emailError, setEmailError] = useState();
  const navigate = useNavigate();

  const login = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const isEmailError = memberEmailValidation(data.email);
      if (isEmailError) {
        setEmailError(isEmailError);
        setIsLoading(false);
        return;
      }
      await userSignIn(data.email, data.password);
    } catch (error) {
      if (error.code === "UserNotConfirmedException") {
        await resendOtp(data.email);
        setTempUser({ username: data.email, password: data.password });
        navigate("/auth/otp", { replace: true });
      } else if (
        error.code === "UserNotFoundException" ||
        error.code === "NotAuthorizedException"
      ) {
        setPasswordError("The email or password you entered is invalid");
      }
      setIsLoading(false);
    }
  };

  const federatedSignin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      return;
    }
  };
  if (auth === AUTH_STATES.LOGGED || auth === AUTH_STATES.ADMIN) {
    return <Navigate to="/" replace={true} />;
  }
  if (auth === AUTH_STATES.NO_CONTACT) {
    return <Navigate to="/auth/contact" replace={true} />;
  }
  if (auth === AUTH_STATES.INITIAL) {
    return (
      <div id="dashboard">
        <Container>
          <div className="flex flex-col w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-black pt-[40px]">
            <div className="text-white font-bold w-fit mx-auto leading-[1]">
              <h1 className="text-[36px]">IntroTouch</h1>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <Spinner />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div id="login">
      <Container>
        <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-black pt-[40px]">
          <div className="text-white font-bold w-fit mx-auto leading-[1]">
            <h1 className="text-[36px]">IntroTouch</h1>
          </div>

          <div className="w-full bg-white pt-[30px] pb-[40px] mt-[100px] px-6 rounded-t-[20px] ">
            <h1 className="text-center text-xl text-brand-dark-gray font-extrabold font-inter">
              LOGIN
            </h1>
            <form className="space-y-[36px] mb-5 mt-10">
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
                error={passwordError}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                id="password"
              />
              <p className="text-right text-[14px] font-inter text-brand-mid-gray">
                <Link to={"/auth/forgot-password"} className="hover:underline">
                  Forgot Password?
                </Link>
              </p>
              <Button
                isLoading={isloading}
                text="Login"
                className="px-10"
                onClick={login}
              />

              <div className="separator"><span>OR</span></div>

              <SocialBtn google label='Signin with Google'/>
              <SocialBtn facebook label='Signin with Facebook'/>
              <SocialBtn apple label='Signin with Apple'/>

              <p className="text-[14px] font-inter text-center">
                Need an account?&nbsp;&nbsp;
                <Link
                  to={"/auth/register"}
                  className="text-brand-sky hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
            <form className="mt-[30px]"></form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
