import React, { useEffect, useState } from "react";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import clsx from "clsx";


const TuitStats = ({tuit, likeTuit, dislikeTuit}) => {


const [likedTuit, setLikedTuit] = useState(false);
  const [dislikedTuit, setDislikedTuit] = useState(false);

  useEffect(() => {
    const fetchLikesAndDislikes = () => {
      likesService.userLikedTheTuit("me", tuit._id).then((liked) => {
        setLikedTuit(liked);
      });
      dislikesService
        .userDislikedTheTuit("me", tuit._id)
        .then((disliked) => {
          setDislikedTuit(disliked);
        });
    };

    fetchLikesAndDislikes();
  }, [tuit]);

    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span onClick={() => likeTuit(tuit)}>
              {
                tuit.stats && tuit.stats.likes && tuit.stats.likes > 0 ? (
                          <i
                            className={clsx("fa-solid", "fa-thumbs-up", "me-1", {
                              "ttr-like-unlike-color-blue": likedTuit,
                            })}
                          ></i>
                ) : (
                  <i className="far fa-thumbs-up"></i>

                )
                }

            {tuit.stats && tuit.stats.likes}

          </span>

        </div>
        <div className="col">
         <span onClick={() => dislikeTuit(tuit)}>
                     {
                         tuit.stats && tuit.stats.dislikes && tuit.stats.dislikes > 0 ? (
                           <i
                                     className={clsx("fa-solid", "fa-thumbs-down", "me-1", {
                                       "ttr-like-unlike-color-red": dislikedTuit,
                                     })}
                                   ></i>
                         ) : (
                           <i className="far fa-thumbs-down"></i>
                         )
                         }

                     {tuit.stats && tuit.stats.dislikes}
                           </span>
        </div>
      </div>
    );
}
export default TuitStats;