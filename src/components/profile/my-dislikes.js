import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
  const [dislikedTuits, setDislikedTuits] = useState([]);
  const findTuitsIDislike = () =>{
    service.findTuitsUserDisliked("me")
      .then((tuits) => setDislikedTuits(tuits));
      }
  useEffect(findTuitsIDislike, []);

  return(
    <div>
      <div>
        <h1>My Dislikes</h1>
      </div>
      <Tuits tuits={dislikedTuits}
             refreshTuits={findTuitsIDislike}/>
    </div>
  );
};
export default MyDislikes;