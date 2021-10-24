import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import TabContent from "../Sections/TabContent";
function ProductEpisode() {
  const [Tab, setTab] = useState(0);

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

      <TabContent tab={Tab} />
    </div>
  );
}

export default ProductEpisode;
