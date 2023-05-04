import Container from "../../components/common/Container";
import TextField from "../../components/common/TextField";
import mail from "../../assets/icons/auth/mail.png";
import Button from "../../components/common/Button";
import { useCallback, useState } from "react";
import { resetPassword, updateUser, userSignOut } from "../../services";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/actions";
import { Auth, Hub } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";

const ResetPassword = ({ onClickClose }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [oldPasswordError, setOldPasswordError] = useState();
  const [newPasswordError, setNewPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [overallError, setOverallError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        setOverallError(null);
        setOldPasswordError(null);
        setNewPasswordError(null);
        setConfirmPasswordError(null);
        if (!passwords.oldPassword) {
          setOldPasswordError("Please enter your old password");
        }
        if (!passwords.newPassword) {
          setNewPasswordError("Please enter your new password");
        }
        if (!passwords.confirmPassword) {
          setConfirmPasswordError("Please enter your confirm password");
        }
        if (
          !passwords.oldPassword ||
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
          const authUser = await Auth.currentAuthenticatedUser();
          await resetPassword(
            authUser,
            passwords.oldPassword,
            passwords.newPassword
          );
          dispatch(getUser(authUser.username));
          onClickClose();
        }
      } catch (error) {
        if (error.code === "NotAuthorizedException") {
          setOldPasswordError("Incorrect old password");
        } else {
          setOverallError(error.message);
        }
        setIsLoading(false);
        return;
      }
    },
    [passwords]
  );

  return (
    <div id="login">
      <Container>
        <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white px-2 pt-[30px]">
          <h1 className="text-center text-xl text-brand-dark-gray font-extrabold font-inter">
            Password Reset
          </h1>
          {overallError && (
            <p className="text-[12px] ml-5 font-inter text-red-600">
              {overallError}
            </p>
          )}
          <form className="space-y-[36px] mt-10">
            <TextField
              icon={mail}
              label="Old Password"
              type="password"
              error={oldPasswordError}
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              id="old-password"
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
                setPasswords({ ...passwords, confirmPassword: e.target.value })
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
          <form className="mt-[30px]"></form>
        </div>
      </Container>
    </div>
  );
};
const ResetPasswordModal = ({ hidden, onClickClose }) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      body={<ResetPassword onClickClose={onClickClose} />}
      closeModal={onClickClose}
      className={
        "bg-white shadow-2xl sm:min-h-0 max-h-[calc(100vh-80px)] w-11/12 sm:w-max [&::-webkit-scrollbar]:hidden"
      }
      handleModalClose={onClickClose}
    />
  );
};

export default ResetPasswordModal;
