import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { genres } from "../FinderPage/Sections/Data";
import ProductEpisode from "./Sections/ProductEpisode";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addToInventory,
  addToRecommend,
  addToStar,
} from "../../../_actions/user_action";
import StarRatings from "react-star-ratings";
//https://www.npmjs.com/package/react-star-ratings
function DetailProductPage(props) {
  const productId = props.match.params.productId;
  const dispatch = useDispatch();
  // console.log("props", props);
  const user = useSelector((state) => state.user);
  const [Product, setProduct] = useState({});
  const [Video, setVideo] = useState([]);
  const [Like, setLike] = useState(false);
  const [Recommend, setRecommend] = useState(false);
  const [Stars, setStars] = useState(0);
  let star = 0;
  // console.log("products", Product);

  const clickHandler = () => {
    dispatch(addToInventory(productId));
    setLike(!Like);
  };

  const recommendHandler = () => {
    dispatch(addToRecommend(productId));
    setRecommend(!Recommend);
  };

  const starChangeHandler = (star) => {
    dispatch(addToStar(productId, star));
  };

  const starHandler = (e) => {
    // console.log("event", e);
    let star = e;
    setStars(e);
    starChangeHandler(star);
  };

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));

    axios.get(`/api/product/getVideo?id=${productId}`).then((response) => {
      if (response.data.success) {
        // console.log("비디오정보", response.data.video);
        setVideo(response.data.video);
      } else {
        alert("비디오를 가져오지 못했습니다.");
      }
    });
    if (
      user.userData &&
      user.userData.inventory.length > 0 &&
      user.userData.recommend.length > 0 &&
      user.userData.stars.length > 0
    ) {
      console.log("작동하니?");
      user.userData.inventory.forEach((item) => {
        if (item.id === productId) {
          // console.log("item", item.id);
          setLike(true);
        }
      });
      user.userData.recommend.forEach((item) => {
        if (item.id === productId) {
          // console.log("item", item.id);
          setRecommend(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (
      user.userData &&
      user.userData.inventory.length > 0 &&
      user.userData.recommend.length > 0 &&
      user.userData.stars.length > 0
    ) {
      // console.log("작동하니?");
      user.userData.inventory.forEach((item) => {
        if (item.id === productId) {
          console.log("item", item.id);
          setLike(true);
        }
      });

      user.userData.recommend.forEach((item) => {
        if (item.id === productId) {
          console.log("item", item.id);
          setRecommend(true);
        }
      });

      user.userData.stars.forEach((item) => {
        if (item.id === productId) {
          console.log("item", item.id);
          setStars(item.stars);
        }
      });
    }
  }, [user || user.userData]);

  return (
    <div className="Detail_container">
      <div className="Detail_background">
        <div>
          <ProductImage detail={Product} />
          <button className="thumbnail_btn">
            <div style={{ display: "flex", gap: "100px" }}>
              <div onClick={clickHandler} className="paddingS">
                {" "}
                <p>
                  {Like ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  )}
                  보고싶다
                </p>
              </div>
              <div className="recommendation" onClick={recommendHandler}>
                <p>
                  {Recommend ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-hand-thumbs-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-hand-thumbs-up"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                    </svg>
                  )}
                  명작 추천
                </p>
              </div>
            </div>
          </button>

          <div className="product_center">
            <ProductEpisode Video={Video} />
            <ProductInfo list={genres} detail={Product} />
            <div className="starRating">
              <StarRatings
                rating={Stars}
                starRatedColor="blue"
                changeRating={starHandler}
                numberOfStars={5}
                name="rating"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;
