import Container from '../../components/common/Container';
import ProfileDesc from '../../components/profile/ProfileDesc';
import TechCards from '../../components/techCards/TechCards';
import Button from '../../components/common/Button';
import Dashboard from '../dashboard/Dashboard'

const ProfileFront = ({setauth}) => {
  return (
    <div id="profileFront">
      <Container>
        <div className="relative font-inter w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white">
        <Dashboard isPublicView={true} setauth={setauth}/>
          {/* <ProfileHeader />
          <div className="p-8 mt-10 ">
            <ProfileDesc />

            <TechCards edit={false} />

            <div className="my-4 ">
              <p className="mb-5 text-center text-brand-dark-gray">
                www.yourwebsite.com
              </p>
              <Button
                text="Create your Profile"
                className="bg-brand-dark-gray"
              />
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default ProfileFront;
