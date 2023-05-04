import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { resendOtp, userSignIn, userValidation } from "../../services";
import Container from "../../components/common/Container";
import { AUTH_STATES } from "../../constants";
import Spinner from "../../components/common/Spinner";
const OTP_LENGTH = 6;
const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const OtpValidation = ({ tempUser = {}, auth }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (value) => {
    try {
      setIsLoading(true);
      await userValidation(tempUser.username, value);
      await userSignIn(tempUser.username, tempUser.password);
    } catch (error) {
      setIsLoading(false);
      setHasError(error?.message || "Something went wrong");
    }
  };

  const inputRefs = useMemo(() => {
    const refs = [];
    for (let i = 0; i < OTP_LENGTH; i++) {
      refs.push(createRef());
    }

    return refs;
  }, undefined);
  useEffect(() => {
    focusInputByIndex(0);
  }, []);
  const focusInputByIndex = useCallback(
    (index) => {
      if (inputRefs[index] && inputRefs[index].current) {
        inputRefs[index]?.current?.focus();
        inputRefs[index].current.selectionStart = 1;
      }
    },
    [inputRefs]
  );
  const handleChange = useCallback(
    (e, index) => {
      setHasError(false);
      const inputValue = inputRefs[index].current.value.replace(/\D/g, "");
      let charIndex = 0;
      let currentIndex = index;
      for (; currentIndex < OTP_LENGTH; currentIndex++) {
        if (inputValue[charIndex]) {
          inputRefs[currentIndex].current.value = inputValue[charIndex];
          charIndex++;
        } else {
          inputRefs[currentIndex].current.value = "";
          break;
        }
      }

      if (currentIndex >= OTP_LENGTH) {
        currentIndex = OTP_LENGTH - 1;
      }
      focusInputByIndex(currentIndex);

      let finalValue = "";
      inputRefs.forEach((ref) => {
        finalValue += ref.current.value;
      });

      if (finalValue.length === OTP_LENGTH) {
        submitHandler(finalValue);
      }
    },
    [focusInputByIndex, inputRefs, submitHandler]
  );
  const handleKeyUp = useCallback(
    (e, index) => {
      if (e.keyCode === KEY_BACKSPACE || e.keyCode === KEY_DELETE) {
        inputRefs[index].current.value = "";
        const previousIndex = index > 1 ? index - 1 : 0;
        focusInputByIndex(previousIndex);
      } else if (e.keyCode === KEY_LEFT_ARROW) {
        if (index > 0) {
          focusInputByIndex(index - 1);
        }
      } else if (e.keyCode === KEY_RIGHT_ARROW) {
        if (index < OTP_LENGTH - 1) {
          focusInputByIndex(index + 1);
        }
      }
    },
    [focusInputByIndex, inputRefs]
  );
  if (!tempUser.username) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  if (auth === AUTH_STATES.LOGGED|| auth === AUTH_STATES.ADMIN) {
    return <Navigate to="/" replace={true} />;
  }
  if (auth === AUTH_STATES.NO_CONTACT) {
    return <Navigate to="/auth/contact" replace={true} />;
  }
  return (
    <div id="login">
      <Container>
        <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-brand-brown pt-[100px]">
          <div className="text-white font-bold w-fit mx-auto leading-[1]">
            <h1 className="text-[36px]">IntroTouch</h1>
            <p className=" text-right ">.com</p>
          </div>
          {}
          <div className="absolute bottom-0 w-full bg-white pt-[30px] px-6 rounded-t-[20px]">
            <h1 className="text-center text-xl text-brand-dark-gray font-extrabold font-inter">
              Email Verification
            </h1>
            <p className="text-[12px] text-center font-inter text-brand-mid-gray">
              A 6 digit OTP has sent via email to verify you email!
            </p>
            <p className="text-[12px] text-center font-inter text-brand-mid-gray">
              Enter the OTP you have recieved.
            </p>
            <form className="space-y-[36px] mb-5 mt-10">
              {isLoading ? (
                <div className="flex flex-col justify-center items-center mt-4">
                  <Spinner />
                </div>
              ) : (
                <div className="flex justify-center mt-4">
                  {inputRefs.map((ref, index) => (
                    <input
                      autoFocus={index === 0}
                      key={"otp" + index}
                      defaultValue=""
                      ref={ref}
                      className={`${
                        hasError && "border-red-700"
                      } w-10 ml-1 mr-1 rounded-sm border-opacity-70`}
                      onChange={(e) => handleChange(e, index)}
                      onKeyUp={(e) => handleKeyUp(e, index)}
                      type="tel"
                    />
                  ))}
                </div>
              )}
              {hasError && (
                <p className="text-[12px] font-inter text-red-600">
                  {hasError}
                </p>
              )}
              <button
                className="font-inter text-xs font-normal hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  resendOtp();
                }}
              >
                Resend OTP
              </button>
            </form>
            <form className="mt-[30px]"></form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OtpValidation;
