
const NAME_REGEX = /^[a-zA-Z .-]+$/;
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

const memberNameValidation = (memberName) => {
  let error =null;
  if (!memberName || typeof memberName !== 'string') {
    return 'Invalid name value';
  }

  const sanitizeName = memberName;
  const isValidName = NAME_REGEX.test(sanitizeName);
  if (!isValidName) {
    error = 'Invalid characters in the name';
  }
  return error;
};

const memberEmailValidation = (memberEmail) => {
  let error =null;
  if (!memberEmail || typeof memberEmail !== 'string') {
    return 'Invalid email value';
  }

  const sanitizeEmail = memberEmail.toLowerCase();
  const isValidEmail = EMAIL_REGEX.test(sanitizeEmail);
  if (!isValidEmail) {
    error = 'Invalid email';
  }
  return error;
};

const memberPasswordValidation = (memberPassword) => {
  let error =null;
  if (!memberPassword || typeof memberPassword !== 'string') {
    return 'Invalid password value';
  }

  const sanitizePassword = memberPassword;
  const isValidPassword = PASSWORD_REGEX.test(sanitizePassword);
  if (!isValidPassword) {
    error =
      'Password must be at least 6 characters long and contain at least one number and one letter';
  }
  return error;
};
export {
  memberNameValidation,
  memberEmailValidation,
  memberPasswordValidation,
};
