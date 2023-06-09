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
  const [numberError, setNumberError] = useState(undefined);
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
      setNumberError(null);
      if (!name) {
        setNameError("Please enter your full name");
      }
      if (!email) {
        setEmailError("Please enter your email address");
      }
      if (!number) {
        setNumberError("Please enter a number");
      }
      if (!note) {
        setNoteError("Please enter a Note");
      }
      if (!name || !email || !number) {
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

  const [open, setOpen] = useState(false)
  const [openSocials, setOpenSocials] = useState(false)
  const [addmore, setaddmore] = useState(false)

  return (
    <div id="shareMyDetails">
      <Container>
        <div className="relative pb-[60px] font-inter w-full sm:min-h-0 sm:h-[calc(100vh-90px)] overflow-scroll [&::-webkit-scrollbar]:hidden py-2 ">
          <div className="text-white">
            <div className="flex justify-end mb-4">
              <button className="font-[300] block rounded-[5px] font-inter hover:opacity-80 mr-3 bg-white text-black px-4 py-2 " onClick={() => setOpen(!open)}>Scan Business Card</button>
              <button className="bg-brand-dark-gray text-white font-[300] block rounded-[5px] font-inter px-4 py-2 hover:opacity-80" onClick={() => setOpenSocials(!openSocials)}>Share Socials Only</button>
            </div>
            {
              open && <div className="text-right mb-4"><input type="file" name="businesscard" id="bcard" /></div>
            }
            {
              openSocials && <div className="text-right space-y-3">
                <Input
                  type="text"
                  id="name"
                  error={nameError}
                  placeholder="LinkedIn"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <Input
                  type="text"
                  id="name"
                  error={nameError}
                  placeholder="TickTock"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            }
            
          </div>
          {/* <Brand /> */}

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
                placeholder="First Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                type="text"
                id="name"
                error={nameError}
                placeholder="Last Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                type="tel"
                id="number"
                placeholder="Phone"
                value={number}
                error={numberError}
                onChange={(event) => setNumber(event.target.value)}
              />

              <Input
                type="email"
                id="email"
                error={emailError}
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {/*<Input
                className="hidden"
                type="text"
                id="company"
                placeholder="Company"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />*/}
              <Textarea
                id="note"
                placeholder="Note"
                error={noteError}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />

              <button type="button" className="text-white" onClick={() => {setaddmore(!addmore)}}>-- Add more --</button>
              {
                addmore && <div className="space-y-3 pb-4">
                <Input
                  type="text"
                  id="name"
                  error={nameError}
                  placeholder="Company Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <Input
                  type="text"
                  id="name"
                  error={nameError}
                  placeholder="Job Title/Position"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <Input
                  type="text"
                  id="name"
                  error={nameError}
                  placeholder="Website"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <div>
                <Input
                  type="checkbox"
                  id="location"
                  error={nameError}
                  placeholder="Location"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className='!w-3 mr-3'
                />
                <label className="text-white" htmlFor="location">Share Location</label>

                </div>
              </div>
              }
              
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
      closeBtnColorWhite
    />
  );
};

export default ShareMyDetailsModal;
