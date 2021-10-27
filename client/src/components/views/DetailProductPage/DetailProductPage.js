import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { genres } from "../FinderPage/Sections/Data";
import ProductEpisode from "./Sections/ProductEpisode";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToInventory } from "../../../_actions/user_action";
function DetailProductPage(props) {
  const productId = props.match.params.productId;
  const dispatch = useDispatch();
  // console.log("props", props);
  const user = useSelector((state) => state.user);
  const [Product, setProduct] = useState({});
  const [Video, setVideo] = useState([]);
  // console.log("products", Product);

  const clickHandler = () => {
    dispatch(addToInventory(productId));
  };

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          console.log("애니정보", response.data.product);
          setProduct(response.data.product[0]);
        } else {
          alert("상세 정보를 가져오지 못했습니다");
        }
      });

    axios.get(`/api/product/getVideo?id=${productId}`).then((response) => {
      if (response.data.success) {
        console.log("비디오정보", response.data.video);
        setVideo(response.data.video);
      } else {
        alert("비디오를 가져오지 못했습니다.");
      }
    });
  }, []);

  return (
    <div className="Detail_container">
      <div className="Detail_background">
        <div>
          <ProductImage detail={Product} />
          <button className="thumbnail_btn" onClick={clickHandler}>
            <p>
              {user.userData && user.userData.inventory ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
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
              {/* 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg> */}
              보고싶다
            </p>
          </button>
          <div className="product_center">
            <ProductEpisode Video={Video} />
            <ProductInfo list={genres} detail={Product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;
