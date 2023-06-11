import IconButton from "../../components/common/IconButton";
import employeeId from "../../assets/icons/info/employeeId.png";
import phonebook from "../../assets/icons/info/phonebook.png";
import { useNavigate } from "react-router-dom";
import vCardsJS from "vcards-js";
import FileSaver from "file-saver";
import ShareMyDetailsModal from "../../pages/shareMyDetails/ShareMyDetails";
import { useState } from "react";

const ProfileDesc = ({ username, userProfile }) => {
  const socialLinks = [];
  for (const service of userProfile.services) {
    if (service.category === "SOCIAL_LINKS") {
      for (const social of service.services) {
        socialLinks[social.name] = social.value;
      }
    }
  }
  const navigate = useNavigate();
  const [isShareMyProfile, setIsShareMyProfile] = useState(false);

  const generateVcf = () => {
    const vCard = vCardsJS();

    vCard.firstName = userProfile.firstName ? userProfile.firstName : "";
    vCard.lastName = userProfile.lastName ? userProfile.lastName : "";
    vCard.email = userProfile.email ? userProfile.email : "";
    vCard.title = userProfile.role ? userProfile.role : "";
    vCard.cellPhone = userProfile.mobile ? userProfile.mobile : "";
    vCard.fax = userProfile.fax ? userProfile.fax : "";
    vCard.url = userProfile.website ? userProfile.website : "";
    vCard.photo.attachFromUrl(userProfile.imageUrl ? userProfile.imageUrl : "");
    vCard.note = userProfile.bio ? userProfile.bio : "";
    vCard.socialUrls['facebook'] = socialLinks['Facebook'] ?? '';
    vCard.socialUrls['linkedIn'] = socialLinks['Linkedin'] ?? '';
    vCard.socialUrls['twitter'] = socialLinks['Twitter'] ?? '';
    vCard.socialUrls['tiktok'] = socialLinks['Tiktok'] ?? '';
    vCard.socialUrls['youtube'] = socialLinks['Youtube'] ?? '';
    vCard.socialUrls['instagram'] = socialLinks['Instagram'] ?? '';
    vCard.socialUrls['pinterest'] = socialLinks['Pinterest'] ?? '';
    vCard.version = '4.0';

    const file = new Blob([vCard.getFormattedString()], {
      type: "text/vcard;charset=utf-8",
    });

    FileSaver.saveAs(file, `${userProfile.firstName}.vcf`, { autoBom: false });
  };
  return (
    <>
      <div className="flex justify-between gap-5 mb-5">
        <IconButton
          text="Save to Contacts"
          icon={phonebook}
          onclick={() => generateVcf()}
          className='justify-center'
        />
        <IconButton
          text="Share my Details"
          icon={employeeId}
          className="bg-brand-sky justify-center"
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
