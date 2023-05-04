import ApiClient from "../api";
const addViewEvent = ({ userId }) => {
  return ApiClient.post(`/analytics/addView`, {
    viewedUserId: userId,
  });
};

const addClickEvent = ({ userId, serviceId }) => {
  return ApiClient.post(`/analytics/addClick`, {
    userId: userId,
    serviceId: serviceId,
  });
};

const getEngagements = ({ type }) => {
  return ApiClient.get(`/analytics/engagementPer`, {
    params: {
      type,
    },
  });
};
export { addViewEvent, addClickEvent, getEngagements };
