import Container from "../../components/common/Container";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import Button from "../../components/common/Button";
import Brand from "../../components/common/Brand";
import placeholder from "../../assets/images/placeholder.jpg";
import { useSelector, useDispatch } from "react-redux";
import { formatString } from "../../utils/common";
import { Navigate, useParams } from "react-router-dom";
import { getPublicUser } from "../../store/actions";
import Spinner from "../../components/common/Spinner";

import { useEffect, useState } from "react";
import { sendPublicMessage } from "../../services";
import Modal from "../../components/common/Modal";

const ShareMyDetails = ({ onClickClose }) => {
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [number, setNumber] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [note, setNote] = useState(undefined);
  const [nameError, setNameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [noteError, setNoteError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userId: username } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userReducer.publicUser);
  useEffect(() => {
    if (username) {
      dispatch(getPublicUser(username));
    }
  }, []);
  if (!username) {
    <Navigate to="/" replace={true} />;
  }
  if (!userProfile) {
    return (
      <div id="dashboard">
        <Container>
          <div className="flex flex-col font-inter w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white">
            <div className="flex flex-1 justify-center items-center">
              <Spinner />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const onsubmit = async () => {
    try {
      setIsLoading(true);
      setEmailError(null);
      setNameError(null);
      setNoteError(null);
      if (!name) {
        setNameError("Please enter your full name");
      }
      if (!email) {
        setEmailError("Please enter your email address");
      }
      if (!note) {
        setNoteError("Please enter a note");
      }
      if (!name || !email || !note) {
        setIsLoading(false);
        return;
      }
      
      await sendPublicMessage({
        userId: userProfile.userId,
        name,
        email,
        number,
        company,
        note,
      });
      setIsSubmitted(true);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div id="shareMyDetails">
      <Container>
        <div className="relative font-inter w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-90px)] overflow-scroll [&::-webkit-scrollbar]:hidden py-2 ">
          <Brand />
          <div className="w-fit mx-auto my-5 items-center flex flex-col">
            {userProfile.imageUrl ? (
              <img
                src={userProfile.imageUrl}
                alt=""
                className="w-[126px] h-[126px] object-cover rounded-full hidden"
              />
            ) : (
              <img
                src={placeholder}
                alt=""
                className="w-[126px] h-[126px] object-cover rounded-full hidden"
              />
            )}

            <h1 className="text-base font-bold text-center text-white mt-[12px]">
              Now it's your turn to share your details with
              {formatString(
                ` ${userProfile.firstName}`,
                {
                  titleCase: true,
                }
              ) || ""}
            </h1>
          </div>
          {isSubmitted ? (
            <>
            <h1 className="text-base font-bold text-center text-white mt-[12px]">
              Thank you, your contact details have been submitted to{" "}
              {formatString(
                `${userProfile.firstName} ${userProfile.lastName}`,
                {
                  titleCase: true,
                }
              ) || ""}
            </h1>
            <div className="mt-5 pb-20 ">
            
            <Button
                text="Back to Profile"
                onClick={(e) => 
                  onClickClose()
                }
              />
            
          </div>
          </>
          ) : (
            <form className="space-y-3">
              <Input
                type="text"
                id="name"
                error={nameError}
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                type="email"
                id="email"
                error={emailError}
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                type="tel"
                id="number"
                placeholder="Number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
              <Input
                className="hidden"
                type="text"
                id="company"
                placeholder="Company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
              <Textarea
                className="hidden"
                id="note"
                placeholder="Note"
                error={noteError}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
              <Button
                text="Send"
                isLoading={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  onsubmit();
                }}
              />
            </form>
          )}
        </div>
      </Container>
    </div>
  );
};

const ShareMyDetailsModal = ({ hidden, onClickClose }) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      body={<ShareMyDetails onClickClose={onClickClose} />}
      closeModal={onClickClose}
      className={
        "bg-black shadow-2xl sm:min-h-0 max-h-[calc(100vh-80px)] w-11/12 sm:w-max [&::-webkit-scrollbar]:hidden"
      }
      handleModalClose={onClickClose}
    />
  );
};

export default ShareMyDetailsModal;
