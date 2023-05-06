import React, { useState, useEffect } from "react";
import Container from "../../components/common/Container";
import ProfileHeader from "../../components/profile/ProfileHeader";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Accordion } from "flowbite-react";
import { getUserMessages } from "../../services";
import { useSelector } from "react-redux";
import { formatString } from "../../utils/common";
import Spinner from "../../components/common/Spinner";
const Contacts = () => {
  const [showSidebar, setshowSidebar] = useState(false);
  const [messages, setMessages] = useState();
  const { user: userProfile } = useSelector((state) => state.userReducer);
  const getMessages = async () => {
    try {
      const messagesResponse = await getUserMessages();
      setMessages(messagesResponse);
    } catch (error) {}
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div id="dashboard">
      <Container>
        <div className="flex flex-col font-inter w-full min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white">
          <ProfileHeader
            showSidebar={showSidebar}
            setshowSidebar={setshowSidebar}
            showMenu={true}
            userProfile={userProfile}
            isProfileCard={false}
            isPublic={false}
          />
          <div className="p-8 mt-10 flex flex-col flex-1 ">
            {messages ? (
              messages.length > 0 && (
                <Accordion collapseAll={true}>
                  {messages.map((item, i) => (
                    <Accordion.Panel key={i}>
                      <Accordion.Title>
                        {formatString(item.name, { titleCase: true })} -{" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </Accordion.Title>
                      <Accordion.Content>
                        <span className="mb-2 text-gray-500  dark:text-gray-400">
                          <h1 className="text-black">
                            { formatString(item.company||'', { titleCase: true })}
                          </h1>
                          <a
                            className="text-blue-600 hover:underline dark:text-blue-500"
                            href="mailto: charithaw1234@gmail.com"
                          >
                            {item.email}
                          </a>
                        </span>
                        <p className="text-gray-500 dark:text-gray-400">
                          {item.number}
                        </p>
                        <p className="text-black">{item.note}</p>
                      </Accordion.Content>
                    </Accordion.Panel>
                  ))}
                </Accordion>
              )
            ) : (
              <div className="text-center">
                <Spinner />
              </div>
            )}
          </div>
          <Navbar />
        </div>
      </Container>
      {showSidebar && (
        <Sidebar
          closeSidebar={() => setshowSidebar(false)}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default Contacts;
