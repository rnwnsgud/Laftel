import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      //   console.log("props.detail.images", props.detail.images);
      let images = [];
      props.detail.images.map((item) => {
        images.push(`http://localhost:5000/${item}`);
      });
      setImages(images);
      //   console.log("img", Images);
    }
  }, [props.detail]);

  return (
    <div>
      <Image src={Images} rounded className="product_img" />
    </div>
  );
}

export default ProductImage;
