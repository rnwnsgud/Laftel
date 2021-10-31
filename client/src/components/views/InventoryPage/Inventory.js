import React, { useState, useEffect } from "react";

import { Nav } from "react-bootstrap";
import TabListView from "./Sections/TabListView";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventoryItems,
  getRecommendItems,
  getStarItems,
} from "../../../_actions/user_action";

function Inventory() {
  const user = useSelector((state) => state.user);
  const [Tab, setTab] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let inventoryItems = [];
    let recommendItems = [];
    let starItems = [];

    if (user && user.userData) {
      //   console.log("inventory", user.userData.inventory);
      if (user.userData.inventory.length > 0) {
        user.userData.inventory.forEach((item) => {
          inventoryItems.push(item.id);
        });
        dispatch(getInventoryItems(inventoryItems, user.userData.inventory)); //굳이 상품id를 따로 담아서 보내는 이유는, 쿼리스트링으로 id를 담기 위해서
      }

      if (user.userData.recommend.length > 0) {
        user.userData.recommend.forEach((item) => {
          recommendItems.push(item.id);
        });
        dispatch(getRecommendItems(recommendItems, user.userData.recommend));
      }

      if (user.userData.stars.length > 0) {
        user.userData.stars.forEach((item) => {
          starItems.push(item.id);
        });
        dispatch(getStarItems(starItems, user.userData.stars));
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
          wantToWatch={user.inventoryDetail}
          recommend={user.recommendDetail}
          star={user.starDetail}
          Tab={Tab}
        />
      </div>
    </div>
  );
}

export default Inventory;
