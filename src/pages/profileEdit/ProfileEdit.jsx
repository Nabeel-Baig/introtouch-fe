import Container from "../../components/common/Container";
import TextField from "../../components/common/TextField";
import mail from "../../assets/icons/auth/mail.png";
import Button from "../../components/common/Button";
import { useCallback, useEffect, useState } from "react";
import { updateUser } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/actions";
import Modal from "../../components/common/Modal";

import userIcon from '../../assets/icons/auth/user.png'
import companyIcon from '../../assets/icons/auth/company.png'
import websiteIcon from '../../assets/icons/auth/website.png'
import jobtitleIcon from '../../assets/icons/auth/job-title.png'
import mobileIcon from '../../assets/icons/auth/phone.png'
import workplaceNumIcon from '../../assets/icons/auth/workplace-phone.png'
import faxIcon from '../../assets/icons/auth/fax.png'

const ProfileEdit = ({ onClickClose }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    workplace: "",
    fax: "",
    role: "",
    company: "",
    website: "",
  });

  const [roleError, setRoleError] = useState();
  const [contactError, setContactError] = useState();
  const [firstNameError, setFirstNameError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (userProfile) {
      setProfile({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        mobile: userProfile.mobile,
        landPhone: userProfile.landPhone,
        fax: userProfile.fax,
        role: userProfile.role,
        company: userProfile.company,
        website: userProfile.website,
      });
    }
  }, [userProfile]);

  const handlSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);
        setRoleError(null);
        setContactError(null);
        if (!profile.firstName) {
          setFirstNameError("First name field cannot be empty");
        }
        if (!profile.lastName) {
          setLastNameError("Last name field cannot be empty");
        }
        if (!profile.role) {
          setRoleError("Role field cannot be empty");
        }
        if (!profile.fax && !profile.mobile && !profile.workplace) {
          setContactError("Please enter atleast one profile");
        }
        if (
          profile.role &&
          profile.firstName &&
          profile.lastName &&
          (profile.fax || profile.mobile || profile.workplace)
        ) {
          await updateUser({
            firstName: profile.firstName,
            lastName: profile.lastName,
            role: profile.role,
            landPhone: profile.workplace,
            fax: profile.fax,
            mobile: profile.mobile,
            company: profile.company,
            website: profile.website,
          });

          dispatch(getUser());
          onClickClose();
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        return;
      }
    },
    [profile]
  );

  return (
    <div id="login">
      <Container>
        <div className="relative w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white pt-[30px]">
          <h1 className="text-center text-xl text-brand-dark-gray font-extrabold font-inter">
            Profile Details
          </h1>
          <p className="text-[12px] text-center font-inter text-brand-mid-gray">
            Please enter your profile details
          </p>
          <form className="space-y-[36px] mt-10">
            <TextField
              icon={userIcon}
              label="First Name"
              type="text"
              value={profile.firstName}
              error={firstNameError}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              id="firstname"
            />
            <TextField
              icon={userIcon}
              label="Last Name"
              type="text"
              value={profile.lastName}
              error={lastNameError}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              id="lastname"
            />
            <TextField
              icon={companyIcon}
              label="Company"
              type="text"
              value={profile.company ? profile.company : ""}
              onChange={(e) =>
                setProfile({ ...profile, company: e.target.value })
              }
              id="company"
            />
            <TextField
              icon={websiteIcon}
              label="Website"
              type="text"
              value={profile.website ? profile.website : ""}
              onChange={(e) =>
                setProfile({ ...profile, website: e.target.value })
              }
              id="website"
            />
            <TextField
              icon={jobtitleIcon}
              label="Job title"
              type="text"
              error={roleError}
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              id="role"
            />
            <TextField
              icon={mobileIcon}
              label="Mobile Number"
              type="tel"
              error={contactError}
              value={profile.mobile}
              onChange={(e) =>
                setProfile({ ...profile, mobile: e.target.value })
              }
              id="mobile"
            />
            <TextField
              icon={workplaceNumIcon}
              label="Workplace Number"
              type="tel"
              error={contactError}
              value={profile.landPhone}
              onChange={(e) =>
                setProfile({ ...profile, landPhone: e.target.value })
              }
              id="workplace"
            />
            <TextField
              icon={faxIcon}
              label="Fax Number"
              type="tel"
              error={contactError}
              value={profile.fax}
              onChange={(e) => setProfile({ ...profile, fax: e.target.value })}
              id="fax"
            />
            <Button
              isLoading={isLoading}
              text="Save"
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

const ProfileEditModal = ({ hidden, onClickClose }) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Modal
      body={<ProfileEdit onClickClose={onClickClose} />}
      closeModal={onClickClose}
      className={
        "bg-white shadow-2xl sm:min-h-0 max-h-[calc(100vh-80px)] w-11/12 sm:w-max [&::-webkit-scrollbar]:hidden"
      }
      handleModalClose={onClickClose}
    />
  );
};

export default ProfileEditModal;
