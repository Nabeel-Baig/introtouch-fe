import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import ProfileHeader from "../../components/profile/ProfileHeader";
import TechCards from "../../components/techCards/TechCards";
import plus from "../../assets/icons/common/plus.png";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { getPublicUser } from "../../store/actions";
import ProfileDesc from "../../components/profile/ProfileDesc";
import Spinner from "../../components/common/Spinner";
import { AUTH_STATES } from "../../constants";
import AddBioCard from "../../components/techCards/AddBio";
import { addViewEvent } from "../../services/analytics";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const Dashboard = ({ isPublicView, setauth }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const [isBioEdit, setIsBioEdit] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  let query = useQuery();
  

  const userProfile = useSelector((state) =>
    isPublicView ? state.userReducer.publicUser : state.userReducer.user
  );
  const [bio, setBio] = useState(userProfile?.bio);
  const [web, setWeb] = useState(userProfile?.website);
  useEffect(() => {
    if (isPublicView) {
      if (params && params.userId) {
        dispatch(getPublicUser(params.userId));
      }
    }
  }, [isPublicView]);
  useEffect(() => {
    let timer1 = null;
    if (isPublicView && userProfile) {
      setauth(AUTH_STATES.NO_AUTH);
      const queryParam=query.get("noan")
      timer1 = setTimeout(() => {
        if(queryParam==null){
          addViewEvent({ userId: userProfile.userId });
        } 
      }, 10000);
    }
    setBio(userProfile?.bio);
    setWeb(userProfile?.website);
    return () => {
      if (timer1) clearTimeout(timer1);
    };
  }, [userProfile]);

  if (!userProfile) {
    return (
      <div id="dashboard">
        <Container>
          <div className="flex flex-col font-inter w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white">
            <ProfileHeader
              showSidebar={showSidebar}
              setshowSidebar={setshowSidebar}
              showMenu={!isPublicView}
              userProfile={userProfile}
              isProfileCard={false}
              isPublic={true}
            />
            <div className="flex flex-1 justify-center items-center">
              <Spinner />
            </div>
            {!isPublicView && <Navbar />}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Container>
        <div className="relative font-inter w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white">
          <ProfileHeader
            showSidebar={showSidebar}
            setshowSidebar={setshowSidebar}
            showMenu={!isPublicView}
            userProfile={userProfile}
            username={params.userId}
            isPublic={isPublicView}
          />

          <div className="p-8 mt-10 " style={{paddingBottom: '70px'}}>
            {userProfile ? (
              <>
                {isPublicView && (
                  <ProfileDesc
                    username={params.userId}
                    userProfile={userProfile}
                  />
                )}

                <div>
                  {!isPublicView && !userProfile.bio && !isBioEdit ? (
                    <div className="flex gap-1 items-center justify-center">
                      <Button
                        text="+ Add Bio"
                        className="px-10 bg-transparent border-dashed hover:border-solid border-gray-500 border text-gray-800 text-sm rounded-md"
                        onClick={() => setIsBioEdit(true)}
                      />
                    </div>
                  ) : (
                    !isBioEdit &&
                    !isPublicView && (
                      <div
                        className="flex gap-1 items-center justify-end cursor-pointer"
                        onClick={() => setIsBioEdit(true)}
                      >
                        <span className="text-[12px] font-medium">
                          Edit Bio
                        </span>
                        <img src={plus} alt="" className="h-[15px]" />
                      </div>
                    )
                  )}
                  <p className="text-sm text-justify mb-7 font-[300]">{bio}</p>
                </div>
                <TechCards edit={!isPublicView} userProfile={userProfile} />

                <div className="mt-5 pb-20 ">
                  {isPublicView && (
                    <Button
                      text="Create your Profile"
                      className="bg-brand-dark-gray"
                      onClick={() =>
                        navigate("/auth/register", { replace: false })
                      }
                    />
                  )}
                </div>
              </>
            ) : (
              <Spinner />
            )}
          </div>
          {!isPublicView && <Navbar />}
        </div>
      </Container>
      {showSidebar && (
        <Sidebar
          closeSidebar={() => setshowSidebar(false)}
          userProfile={userProfile}
        />
      )}
      <AddBioCard
        hidden={!isBioEdit}
        onClickClose={() => setIsBioEdit(false)}
        bio={bio}
        setBio={setBio}
      />
    </>
  );
};

export default Dashboard;
