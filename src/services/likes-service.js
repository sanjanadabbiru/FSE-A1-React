import axios from "axios";

//const BASE_URL = "http://localhost:4003/api";
const BASE_URL = "https://fsenode.herokuapp.com/api"

const USERS_API = `${BASE_URL}/users`;
const api = axios.create({
 withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
   api.put(`${USERS_API}/${uid}/likes/${tid}`)
       .then(response => response.data);

export const findAllTuitsLikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/likes`)
        .then(response => response.data);

export const userLikedTheTuit = (uid, tid) => {
  return api.get(`${USERS_API}/${uid}/likes/${tid}`).then((response) => {
    return response.data?._id !== undefined;
  });
};