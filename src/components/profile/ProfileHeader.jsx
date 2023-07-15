import share from "../../assets/icons/common/share.png";
import menu from "../../assets/icons/common/menu.png";
import ProfileCard from "./ProfileCard";
import { ShareProfileModal } from "../techCards/shareProfileModal";
import Brand from "../../components/common/Brand";
import { Tooltip } from "flowbite-react";
import { useCallback, useState } from "react";
import env from '../../env.json';
import bookmark from '../../assets/icons/common/ribbon.png';

const ProfileHeader = ({
  showMenu,
  setshowSidebar,
  showSidebar,
  userProfile,
  isProfileCard = true,
  username,
  isPublic,
  isAdmin = false,
}) => {
  const [copyText, setCopyText] = useState("Click to share profile");
  const [isHideModal, setIsHideModal] = useState(true);
  const link = `${env.websiteDomain}/profile/${
    username ? username : userProfile?.username
  }`;

  const onMouseDown = useCallback(() => {
    setCopyText("Click to share profile");
  }, [copyText]);
  const onMouseLeave = useCallback(() => {
    setCopyText("Click to share profile");
  }, [copyText]);
  return (
    <div
      className={`bg-brand-dark-gray p-8 ${
        isProfileCard ? "h-[246px]" : "h-[100px]"
      }`}
    >
      {/* header */}
      <ShareProfileModal
        isPublic={isPublic}
        hidden={isHideModal}
        onClickClose={() => setIsHideModal(true)}
        link={link}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {showMenu && (
            <img
              src={menu}
              alt=""
              onClick={() => setshowSidebar(!showSidebar)}
              className="h-[22px] cursor-pointer"
            />
          )}
        </div>
        <Brand />
        <div className="flex items-center gap-4">
          <img src={bookmark} alt="" className="cursor-pointer invert"/>
          {!isAdmin ? (
            <Tooltip placement="bottom" content={copyText} trigger="hover">
              <div
                className="cursor-pointer"
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onClick={() => {
                  setIsHideModal(false);
                }}
              >
                <img src={share} alt="" className="w-[34px] ml-auto" />
              </div>
            </Tooltip>
          ) : null}
        </div>
      </div>
      {/* card */}
      {isProfileCard && (
        <ProfileCard isPublic={isPublic} userProfile={userProfile} />
      )}
    </div>
  );
};

export default ProfileHeader;
