import Container from "../../components/common/Container";
import TextField from "../../components/common/TextField";
import mail from "../../assets/icons/auth/mail.png";
import Button from "../../components/common/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../../services";
import { memberEmailValidation } from "../../utils/validations";
import { AUTH_STATES } from "../../constants";

const ForgotPassword = ({ auth }) => {
  const [data, setData] = useState({
    email: "",
    code: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState();

  const emailSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const isEmailError = memberEmailValidation(data.email);
      if (isEmailError) {
        setEmailError(isEmailError);
        setIsLoading(false);
        return;
      }
      await forgotPassword(data.email);
      navigate(`/auth/reset-forgot-password/${data.email}`);
      setIsLoading(false);
    } catch (error) {
      setEmailError(error?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  if (auth === AUTH_STATES.LOGGED|| auth === AUTH_STATES.ADMIN) {
    return <Navigate to="/" replace={true} />;
  }
  if (auth === AUTH_STATES.NO_CONTACT) {
    return <Navigate to="/auth/contact" replace={true} />;
  }
  return (
    <div id="login">
      <Container>
        <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-black pt-[100px]">
          <div className="text-white font-bold w-fit mx-auto leading-[1]">
            <h1 className="text-[36px]">IntroTouch</h1>
          </div>
          <div className="absolute bottom-0 w-full bg-white pt-[30px] px-6 rounded-t-[20px]">
            <h1 className="text-center text-xl text-brand-dark-gray font-extrabold font-inter">
              Forgot Password
            </h1>
            <p className="text-[12px] text-center font-inter text-brand-mid-gray">
              Please enter you email address. We will send a temporary password
              for the given email address.
            </p>
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
              <Button
                isLoading={isloading}
                text="Submit"
                className="px-10"
                onClick={emailSubmit}
              />
              <p className="text-[14px] font-inter text-center">
                Back to login?&nbsp;&nbsp;
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
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
