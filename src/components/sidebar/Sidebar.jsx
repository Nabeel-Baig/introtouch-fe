import close from "../../assets/icons/common/close.png";
import { userSignOut } from "../../services";
import placeholder from "../../assets/images/placeholder.jpg";
import { formatString } from "../../utils/common";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import ResetPasswordModal from "../../pages/login/ResetPassword";
import { useState } from "react";

const Sidebar = ({ closeSidebar, userProfile = {} }) => {
  const [isResetPassword, setIsResetPassword] = useState(false);

  const accountSettings = [
    {
      title: "Reset Password",
      setState: setIsResetPassword,
    },
    { title: "Manage Subscription", to: "" },
    { title: "Partners/Influencers", to: "" },
    { title: "Share", to: "" },
    { title: <span>IntroTouch Network &copy;</span>, to: "" },
    { title: "How To Videos", to: "" },
  ];

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeSidebar();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return (
    <div id="sidebar" ref={wrapperRef}>
      <div className="fixed top-0 left-0 bottom-0 w-[300px] px-6 py-4 text-white bg-black font-inter">
        <img
          src={close}
          alt=""
          title="Click to close"
          onClick={closeSidebar}
          className="w-6 ml-auto cursor-pointer hover:opacity-80"
        />

        <div className="text-center">
          {userProfile.imageUrl ? (
            <img
              src={userProfile.imageUrl}
              alt=""
              className="w-[126px] h-[126px] rounded-full object-cover mx-auto my-3"
            />
          ) : (
            <img
              src={placeholder}
              alt=""
              className="w-[126px] h-[126px] rounded-full object-cover mx-auto my-3"
            />
          )}

          <h3 className="font-bold">
            {formatString(`${userProfile.firstName} ${userProfile.lastName}`, {
              titleCase: true,
            })}
          </h3>

          <p className="font-light text-[12px]">
            {userProfile.mobile || ""} <br />
            {userProfile.landPhone || ""}
            <br />
            {userProfile.fax || ""}
          </p>
          <p className="font-light text-sm">{userProfile.email}</p>
        </div>

        <div className="text-sm font-light my-10 ml-10">
          <h4 className="font-bold">Account Settings</h4>

          <ul className="mt-2 leading-6">
            {accountSettings.map((el, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="rounded-full border-2 w-3 h-3"></div>
                {el.to ? (
                  <Link to={el.to} className="hover:underline cursor-pointer">
                    {el.title}
                  </Link>
                ) : (
                  <div
                    onClick={() => {
                      el.setState(true);
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    {el.title}
                  </div>
                )}
              </li>
            ))}

            <li className="mt-10">Terms of use</li>
            <li>Privacy policy</li>
            <li
              className="mt-5 cursor-pointer hover:underline"
              onClick={() => userSignOut()}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
      <ResetPasswordModal
        onClickClose={() => setIsResetPassword(false)}
        hidden={!isResetPassword}
      />
    </div>
  );
};

export default Sidebar;
