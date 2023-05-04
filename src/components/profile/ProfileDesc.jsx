import IconButton from "../../components/common/IconButton";
import employeeId from "../../assets/icons/info/employeeId.png";
import phonebook from "../../assets/icons/info/phonebook.png";
import { useNavigate } from "react-router-dom";
import vCardsJS from "vcards-js";
import FileSaver from "file-saver";
import ShareMyDetailsModal from "../../pages/shareMyDetails/ShareMyDetails";
import { useState } from "react";

const ProfileDesc = ({ username, userProfile }) => {
  const navigate = useNavigate();
  const [isShareMyProfile, setIsShareMyProfile] = useState(false);

  const generateVcf = () => {
    var vCard = vCardsJS();

    vCard.firstName = userProfile.firstName ? userProfile.firstName : "";
    vCard.lastName = userProfile.lastName ? userProfile.lastName : "";
    vCard.email = userProfile.email ? userProfile.email : "";
    vCard.title = userProfile.role ? userProfile.role : "";
    vCard.cellPhone = userProfile.mobile ? userProfile.mobile : "";
    vCard.fax = userProfile.fax ? userProfile.fax : "";
    vCard.url = userProfile.website ? userProfile.website : "";
    vCard.photo.url = userProfile.imageUrl ? userProfile.imageUrl : "";

    var file = new Blob([vCard.getFormattedString()], {
      type: "text/vcard;charset=utf-8",
    });

    FileSaver.saveAs(file, `${userProfile.firstName}.vcf`, { autoBom: false });
  };
  return (
    <>
      <div className="flex justify-between gap-5 mb-5">
        <IconButton
          text="Save to Phone"
          icon={phonebook}
          onclick={() => generateVcf()}
        />
        <IconButton
          text="Share my Details"
          icon={employeeId}
          className="bg-brand-sky"
          onclick={() => setIsShareMyProfile(true)}
        />
        <ShareMyDetailsModal
          hidden={!isShareMyProfile}
          onClickClose={() => setIsShareMyProfile(false)}
        />
      </div>
    </>
  );
};

export default ProfileDesc;
