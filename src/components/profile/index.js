/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import MyTuits from "./my-tuits.js";
import Tuits from "../tuits";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import * as service from "../../services/auth-service"
import TuitsAndReplies from "./tuits-and-replies";
import Media from "./media";
import MyLikes from "./my-likes.js";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      // eslint-disable-next-line no-undef
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
      .then(() => navigate('/login'));
  }

  return(
    <div className="ttr-profile">
      <div className="border border-bottom-0">
      <h4 className="fw-bolder pb-0 mb-0">{profile.username}</h4>
      <h6 className="pt-0">@{profile.username}</h6>
      <ul className="mt-4 nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/profile/mytuits"
                    className="nav-link active">
                Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/tuits-and-replies"
                    className="nav-link">
                Tuits & replies</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/media"
                    className="nav-link">
                Media</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/mylikes"
                    className="nav-link">
                Likes</Link>
            </li>

          </ul>
      <div className = "mt-4 nav nav-pills nav-fill">
      <button className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right"onClick={logout}>
        Logout</button>
      </div>
      </div>
      <Tuits/>
      {profile.username &&
          <Routes>
          <Route path="/mytuits" element={<MyTuits/>}/>
          <Route path="/tuits-and-replies" element={<TuitsAndReplies/>}/>
          <Route path="/media" element={<Media/>}/>
          <Route path="/mylikes" element={<MyLikes/>}/>
          </Routes>
      }
    </div>
  );
}
export default Profile;