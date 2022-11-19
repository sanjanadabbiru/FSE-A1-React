import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyLikes = () => {
  const [likedTuits, setLikedTuit] = useState([]);
  const findTuitsILike = () =>{
    service.findAllTuitsLikedByUser("me")
      .then((tuits) => setLikedTuit(tuits));
  }
  useEffect(findTuitsILike, []);

  return(
    <div>
      <div>
        <h1>My Likes</h1>
      </div>
      <Tuits tuits={likedTuits}
             newTuits={findTuitsILike}/>
    </div>
  );
};
export default MyLikes;