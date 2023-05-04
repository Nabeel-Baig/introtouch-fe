import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";

function userSignIn(username, password) {
  return Auth.signIn(username.toLowerCase(), password);
}

function userSignUp(username, password, firstName, lastName) {
  return Auth.signUp({
    username: username.toLowerCase(),
    password,
    attributes: {
      email: username.toLowerCase(),
      given_name: firstName,
      family_name: lastName,
    },
    validationData: [],
  });
}
function userSignOut() {
  return Auth.signOut();
}

function getCurrentAuthenticatedUser() {
  return Auth.currentAuthenticatedUser({
    bypassCache: false,
  });
}

function userValidation(username, code) {
  return Auth.confirmSignUp(username.toLowerCase(), code);
}

function resendOtp(userName) {
  return Auth.resendSignUp(userName.toLowerCase());
}
function resetPassword(user, oldPassword, newPassword) {
  return Auth.changePassword(user, oldPassword, newPassword);
}

function googleSignIn() {
  return Auth.federatedSignIn({
    provider: CognitoHostedUIIdentityProvider.Google,
  });
}

function forgotPassword(username) {
  return Auth.forgotPassword(username.toLowerCase());
}

function forgotPasswordSubmit(username, code, newPassword) {
  return Auth.forgotPasswordSubmit(username.toLowerCase(), code, newPassword);
}

export {
  userSignIn,
  userSignOut,
  userSignUp,
  getCurrentAuthenticatedUser,
  googleSignIn,
  resetPassword,
  forgotPassword,
  forgotPasswordSubmit,
  userValidation,
  resendOtp
};
