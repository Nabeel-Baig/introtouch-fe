import ApiClient from "../api";
import axios from 'axios';

const getAllAdminServices = async () => {
  const data = await ApiClient.get(`/contact/`, {});
  if (data && data.data) {
    return data.data;
  }
  return null;
};

const getIconUploadSingedUrl = async (fileName, type) => {
  const data = await ApiClient.get(`contact/get-singed-url/${fileName}`, {params: { type }});
  if (data && data.data) {
    return data.data;
  }
  return null;
};

const uploadAttachment = async (file, singedUrl) => {
  await axios.put(singedUrl, file, {
    headers: {
      accept: file.type,
      "Content-Type": file.type,
    },
  });
};

const addCustomService = async (data) => {
  const response = await ApiClient.post(`contact/`, data);
  if (response && response.data) {
    return response.data;
  }
  return null;
};

const getUserMessages = async()=>{
  const response = await ApiClient.get(`contact/messages`);
  if (response && response.data) {
    return response.data;
  }
  return [];

}

export {
  getAllAdminServices,
  getIconUploadSingedUrl,
  uploadAttachment,
  addCustomService,
  getUserMessages
};
