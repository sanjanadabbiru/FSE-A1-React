import axios from "axios";

const BASE_URL = "http://localhost:4003/api";
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
 withCredentials: true
});

export const userTogglesTuitDislikes = (uid, tid) =>
   api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
       .then(response => response.data);

export const findTuitsUserDisliked = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data);