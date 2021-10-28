import React, { useState, useEffect } from "react";
import axios from "axios";

import { Nav } from "react-bootstrap";
import TabListView from "./Sections/TabListView";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventoryItems,
  getRecommendItems,
} from "../../../_actions/user_action";

function Inventory() {
  const user = useSelector((state) => state.user);
  const [Tab, setTab] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let inventoryItems = [];
    let recommendItems = [];

    if (user && user.userData) {
      //   console.log("inventory", user.userData.inventory);
      if (user.userData.inventory.length > 0) {
        user.userData.inventory.forEach((item) => {
          inventoryItems.push(item.id);
        });
        dispatch(getInventoryItems(inventoryItems, user.userData.inventory));
      }

      if (user.userData.recommend.length > 0) {
        user.userData.recommend.forEach((item) => {
          recommendItems.push(item.id);
        });
        dispatch(getRecommendItems(recommendItems, user.userData.recommend));
      }
    }
  }, [user.userData]);

  return (
    <div className="paddingS">
      <div className="inventory_container">
        <Nav variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link
              eventKey="link-0"
              onClick={() => {
                setTab(0);
              }}
            >
              보고싶다
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => {
                setTab(1);
              }}
            >
              명작추천
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-2"
              onClick={() => {
                setTab(2);
              }}
            >
              별점
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <TabListView
          wantToWatch={user.inventoryDetail && user.inventoryDetail.product}
          recommend={user.recommendDetail && user.recommendDetail.product}
          Tab={Tab}
        />
      </div>
    </div>
  );
}

export default Inventory;
