import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { Table } from "flowbite-react";
import Sidebar from "../../components/sidebar/Sidebar";
import { deleteUser, getUsers } from "../../services";
import { ConfirmationModal } from "../../components/common/ConfirmationModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showSidebar, setshowSidebar] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [deletingUser, setDeletingUser] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user: userProfile } = useSelector((state) => state.userReducer);

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers();
      setUsers(users);
    }

    fetchUsers();
  }, []);

  async function deleteGivenUser() {
    try {
      setIsLoading(true);
      const data = {
        userId: deletingUser,
      };
      const res = await deleteUser(data);
      if (res.success) {
        const newuserSet = users.filter((user) => user.userId != deletingUser);
        setUsers(newuserSet);
        toast.success("User Deleted Successfully!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("User Deletion Failed !!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setShowDeleteModal(false);
      setIsLoading(false);
    } catch (error) {
      setShowDeleteModal(false);
      setIsLoading(false);
    }
  }

  const confirmDelete = (userId) => {
    setDeletingUser(userId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setDeletingUser();
    setShowDeleteModal(false);
  };

  function renderUserTable() {
    let userTableJsx = [];
    users.forEach((user) => {
      const jsx = (
        <Table.Row
          key={user.userId}
          className="bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {user.name}
          </Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.mobile}</Table.Cell>
          <Table.Cell onClick={() => confirmDelete(user.userId)}>
            <a
              href="#"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Delete
            </a>
          </Table.Cell>
        </Table.Row>
      );
      userTableJsx.push(jsx);
    });
    setTableData(userTableJsx);
  }

  useEffect(() => {
    renderUserTable();
  }, [users]);



  return (
    <div id="dashboard">
      <div className="w-full sm:max-w-[765px] mx-auto sm:rounded-[20px] overflow-hidden">
        <div className="relative font-inter w-full sm:max-w-[1200px] min-h-screen sm:min-h-0 sm:h-[calc(100vh-48px)] overflow-auto [&::-webkit-scrollbar]:hidden bg-white">
          <ProfileHeader
            showSidebar={showSidebar}
            setshowSidebar={setshowSidebar}
            showMenu={true}
            userProfile={null}
            isProfileCard={false}
            isPublic={false}
            isAdmin={true}
          />

          <h3
            style={{
              fontFamily: "sans-serif",
              fontSize: "20px",
              margin: "10px",
            }}
          >
            Users
          </h3>
          <Table
            striped={true}
            style={{ margin: "10px", border: "2px solid black", width: "97%" }}
          >
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Mobile</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Action</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">{tableData}</Table.Body>
          </Table>
        </div>
      </div>
      <ToastContainer />
      <ConfirmationModal
        title={"Are you sure you want to delete user?"}
        confirmFn={deleteGivenUser}
        cancelFn={cancelDelete}
        hidden={!showDeleteModal}
        onClickClose={cancelDelete}
        isLoading={isLoading}
      />
      {showSidebar && userProfile && (
        <Sidebar
          closeSidebar={() => setshowSidebar(false)}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
