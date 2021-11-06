import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import TabContent from "../Sections/TabContent";
function ProductEpisode(props) {
  const [Tab, setTab] = useState(0);
  let Video = props.Video;
  let productId = props.productId;

  return (
    <div className="product_episode">
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setTab(0);
            }}
          >
            에피소드
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTab(1);
            }}
          >
            리뷰
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tab={Tab} Video={Video} productId={productId} />
    </div>
  );
}

export default ProductEpisode;
