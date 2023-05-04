import ApiClient from "../api";
const getUserProfile = async () => {
  const user = await ApiClient.get(`/user`, {});
  if (user && user.data) {
    return user.data;
  }
  return null;
};

const getPublicUserProfile = async (userId) => {
  const user = await ApiClient.get(`/user/profile/${userId}`, {});
  if (user && user.data) {
    return user.data;
  }
  return null;
};

const getUsers = async (userId) => {
  const user = await ApiClient.get(`/user/users`, {});
  if (user && user.data) {
    return user.data;
  }
  return data;
};

const deleteUser = async (data) => {
  const user = await ApiClient.post(`/user/deleteUser`, data);
  if (user && user.data) {
    return user.data;
  }
  return null;
};

const upsertUserService = async (data) => {
  const user = await ApiClient.post(`/user/service/`, data);
  if (user && user.data) {
    return user.data;
  }
  return null;
};

const updateUser = async (data) => {
  const user = await ApiClient.put(`/user`, data);
  if (user && user.data) {
    return user.data;
  }
  return null;
};

const sendPublicMessage = async (data) => {
  await ApiClient.post(`/user/message/`, data);
};

const deleteUserService = (serviceId) => {
  return ApiClient.delete(`/user/service/${serviceId}`);
};
const shareProfile = async (data) => {
  await ApiClient.post(`/user/shareProfile/`, data);
};

const uploadUserAttachments = async (fileName, type)=>{
  const data = await ApiClient.get(`/user/get-singed-url/${fileName}`, {params: { type }});
  if (data && data.data) {
    return data.data;
  }
  return null;
}
export {
  getUserProfile,
  upsertUserService,
  updateUser,
  getPublicUserProfile,
  sendPublicMessage,
  getUsers,
  deleteUser,
  deleteUserService,
  shareProfile,
  uploadUserAttachments
};
