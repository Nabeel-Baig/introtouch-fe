import Container from "../../components/common/Container";
import TextField from "../../components/common/TextField";
import mail from "../../assets/icons/auth/mail.png";
import Button from "../../components/common/Button";
import { Link, Navigate, useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { AUTH_STATES } from "../../constants";
import { forgotPasswordSubmit } from "../../services";
import { useNavigate } from "react-router-dom";

const ForgotPasswordSubmit = ({ auth }) => {
  const [passwords, setPasswords] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [otpError, setOtpError] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [newPasswordError, setNewPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [overallError, setOverallError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { username } = useParams();

  const handlSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        setOverallError(null);
        setOtpError(null);
        setNewPasswordError(null);
        setConfirmPasswordError(null);
        if (!passwords.otp) {
          setOtpError("Please enter the OTP code sent to your email");
        }
        if (!passwords.newPassword) {
          setNewPasswordError("Please enter your new password");
        }
        if (!passwords.confirmPassword) {
          setConfirmPasswordError("Please enter your confirm password");
        }

        if (
          !passwords.otp ||
          !passwords.newPassword ||
          !passwords.confirmPassword
        ) {
          setIsLoading(false);
          return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
          setConfirmPasswordError("The password confirmation does not match");
          setIsLoading(false);
          return;
        } else {
          await forgotPasswordSubmit(username, passwords.otp, passwords.newPassword);
          setIsLoading(false);
          setIsSuccess(true);
        }

      } catch (error) {
        if(error.code = "CodeMismatchException"){
          setOtpError(error?.message||"Invalid OTP Code")
        }
        else{
          setOverallError(error?.message || "Something went wrong");
        }
        setIsLoading(false);
        return;
      }
    },
    [passwords]
  );

  if (auth === AUTH_STATES.LOGGED|| auth === AUTH_STATES.ADMIN) {
    return <Navigate to="/" replace={true} />;
  }
  if (auth === AUTH_STATES.NO_CONTACT) {
    return <Navigate to="/auth/contact" replace={true} />;
  }

  return (
    <div id="login">
      <Container>
        <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white px-6 pt-[30px]">
          <h1 className="text-center text-xl text-brand-dark-gray font-extrabold font-inter">
            Password Reset
          </h1>
          {isSuccess ? (
            <p className="text-[12px] text-center font-inter text-brand-mid-gray">
              You have successfully reset your password. Please login with your
              new password.
            </p>
          ) : (
            <p className="text-[12px] text-center font-inter text-brand-mid-gray">
              Please enter your OTP received to you {username} address and new
              password
            </p>
          )}
          {overallError && (
            <p className="text-[12px] ml-5 font-inter text-red-600">
              {overallError}
            </p>
          )}
          {isSuccess ? (
            <form className="space-y-[36px] mt-10">
              <Button
                isLoading={isLoading}
                text="Login"
                className="px-10"
                onClick={() => navigate("/auth/login")}
              />
            </form>
          ) : (
            <form className="space-y-[36px] mt-10">
              <TextField
                icon={mail}
                label="OTP code"
                type="number"
                error={otpError}
                value={passwords.otp}
                onChange={(e) =>
                  setPasswords({ ...passwords, otp: e.target.value })
                }
                id="otp"
              />
              <TextField
                icon={mail}
                label="New Password"
                type="password"
                error={newPasswordError}
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                id="new-password"
              />
              <TextField
                icon={mail}
                label="Confirm Password"
                type="password"
                error={confirmPasswordError}
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                id="confirm-password"
              />
              <Button
                isLoading={isLoading}
                text="Reset"
                className="px-10"
                onClick={handlSubmit}
              />
            </form>
          )}

          <form className="mt-[30px]"></form>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPasswordSubmit;
