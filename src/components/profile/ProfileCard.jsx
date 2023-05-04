import phone from "../../assets/icons/info/phone.png";
import mobile from "../../assets/icons/info/mobile.png";
import telephone from "../../assets/icons/info/telephone.png";
import placeholder from "../../assets/images/placeholder.jpg";
import { formatPhoneNumber, formatString, getClickableLink } from "../../utils/common";
import Edit from "../../assets/icons/common/material-symbols_edit.svg";
import EditBlack from "../../assets/icons/common/material-symbols_edit_black.svg";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../components/common/Spinner";
import {
  updateUser,
  uploadAttachment,
  uploadUserAttachments,
} from "../../services";
import { getUser } from "../../store/actions";
import ProfileEditModal from "../../pages/profileEdit/ProfileEdit";

const ProfileCard = ({ userProfile, isPublic }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openFileSelector, { filesContent, plainFiles }] = useFilePicker({
    accept: "image/*",
    maxFileSize: 50,
    limitFilesConfig: { max: 1 },
    imageSizeRestrictions: {
      maxHeight: 900, // in pixels
      maxWidth: 1600,
      minHeight: 600,
      minWidth: 768,
    },
  });
  const openInSameTab = (url) => {
    window.open(url, "_self");
  };
  const updateProfilePic = async (plainFiles) => {
    try {
      setIsLoading(true);
      const { singedUrl, path } = await uploadUserAttachments(
        `profile_image_${plainFiles[0].name}`,
        plainFiles[0].type
      );
      await uploadAttachment(plainFiles[0], singedUrl);
      await updateUser({ imageUrl: path });
      dispatch(getUser());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (plainFiles.length > 0) {
      updateProfilePic(plainFiles);
    }
  }, [plainFiles]);

  return (
    <div className="w-full shadow-xl h-[196px] flex justify-between items-center bg-black my-4 rounded-[10px] overflow-hidden">
      <div className="h-full">
        {userProfile.imageUrl ? (
          <div
            className={`relative h-full ${!isPublic && "cursor-pointer"}`}
            onClick={() => {
              if (!isLoading && !isPublic) {
                openFileSelector();
              }
            }}
          >
            {!isPublic && (
              <>
                <div className="absolute flex justify-center items-center bg-black w-[30px] h-[30px] right-3 top-3 rounded-md">
                  <img src={Edit} className="w-[20px] h-[20px]" />
                </div>
                {isLoading ? (
                  <div className="absolute flex justify-center items-center h-full w-full bg-black/70 text-white font-inter font-normal text-lg">
                    <Spinner />
                  </div>
                ) : (
                  <div className="absolute flex justify-center items-center h-full w-full opacity-0 bg-black/70 hover:opacity-100 text-white font-inter font-normal text-lg">
                    <img src={Edit} className="w-[30px] h-[30px] mr-5" />
                    Edit Image
                  </div>
                )}
              </>
            )}
            <img
              src={userProfile.imageUrl}
              alt=""
              className="h-full w-[196px] object-cover"
            />
          </div>
        ) : (
          <div
            className={`relative h-full ${!isPublic && "cursor-pointer"}`}
            onClick={() => {
              if (!isLoading && !isPublic) {
                openFileSelector();
              }
            }}
          >
            {!isPublic && (
              <>
                <div className="absolute flex justify-center items-center bg-black w-[30px] h-[30px] right-3 top-3 rounded-md">
                  <img src={Edit} className="w-[20px] h-[20px]" />
                </div>
                {isLoading ? (
                  <div className="absolute flex justify-center items-center h-full w-full bg-black/70 text-white font-inter font-normal text-lg">
                    <Spinner />
                  </div>
                ) : (
                  <div className="absolute flex justify-center items-center h-full w-full opacity-0 bg-black/70 hover:opacity-100 text-white font-inter font-normal text-lg">
                    <img src={Edit} className="w-[30px] h-[30px] mr-5" />
                    Edit Image
                  </div>
                )}
              </>
            )}

            <img
              src={placeholder}
              alt=""
              className="h-full w-[196px] object-cover"
            />
          </div>
        )}
      </div>

      <div className="w-[200px] text-white font-inter font-[300] p-4 h-full flex flex-col justify-between relative">
        {!isPublic && (
          <div
            onClick={() => setIsProfileEdit(true)}
            className="absolute flex justify-center items-center bg-white w-[30px] h-[30px] right-3 top-3 rounded-md cursor-pointer"
          >
            <img src={EditBlack} className="w-[20px] h-[20px]" />
          </div>
        )}

        <div>
          <h3 className="text-[16px] font-bold font-sans">
            {formatString(`${userProfile.firstName} ${userProfile.lastName}`, {
              titleCase: true,
            }) || ""}
          </h3>
          <p className="text-[12px]">{userProfile.role}</p>
          <p className="text-[12px] font-bold">{userProfile.company}</p>
          <p className="text-[12px] hover:underline cursor-pointer" onClick={()=>openInSameTab(getClickableLink(userProfile.website),true) }>{userProfile.website}</p>

        </div>

        <div>
          {userProfile.mobile && (
            <div
              className="flex items-center gap-1 cursor-pointer hover:underline"
              onClick={() => openInSameTab(`tel:${userProfile.mobile}`)}
            >
              <img src={mobile} alt="" className="w-[10px] h-[10px]" />
              <small className="text-[12px]">{formatPhoneNumber(userProfile.mobile)}</small>
            </div>
          )}
          {userProfile.landPhone && (
            <div
              className="flex items-center gap-1 cursor-pointer hover:underline"
              onClick={() => openInSameTab(`tel:${userProfile.landPhone}`)}
            >
              <img src={phone} alt="" className="w-[10px] h-[10px]" />
              <small className="text-[12px]">{formatPhoneNumber(userProfile.landPhone)}</small>
            </div>
          )}
          {userProfile.fax && (
            <div
              className="flex items-center gap-1 cursor-pointer hover:underline"
              onClick={() => openInSameTab(`tel:${userProfile.fax}`)}
            >
              <img src={telephone} alt="" className="w-[10px] h-[10px]" />
              <small className="text-[12px]">{formatPhoneNumber(userProfile.fax)}</small>
            </div>
          )}
        </div>
      </div>
      <ProfileEditModal
        hidden={!isProfileEdit}
        onClickClose={() => setIsProfileEdit(false)}
      />
    </div>
  );
};

export default ProfileCard;
