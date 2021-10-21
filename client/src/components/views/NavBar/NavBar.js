import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import "../../../App.css";
function NavBar(props) {
  const [Scroll, setScroll] = useState(0);
  const [IsOn, setIsOn] = useState(false);
  const user = useSelector((state) => state.user);

  function onScroll() {
    setScroll(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    // console.log("scroll", Scroll);
    if (Scroll > 50) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, [Scroll]);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      //console.log(response.data);
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 하는데 실패했습니다.");
      }
    });
  };
  if (user.userData && !user.userData.isAuth) {
    // console.log("userData", user.userData.isAuth);
    return (
      <div className={IsOn ? "headerOn" : "header"}>
        <div className="header_logo">
          <a href="/">LAFTEL</a>
        </div>

        <div className="header_link">
          <a href="/finder">태그검색</a>
          <a href="/">요일별 신작</a>
          <a href="/">테마추천</a>
          <a href="/">멤버쉽</a>
        </div>
        <div className="header_right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
        </div>
        <div className="header_user_menu">
          <a className="header_user_menu_login" href="/loginNext">
            로그인/가입
          </a>

          {/* <p>프로필</p>
            <p>rnwnsgud90</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg> */}
        </div>
      </div>
    );
  } else {
    // console.log("userData", user.userData.isAuth);
    return (
      <div className={IsOn ? "headerOn" : "header"}>
        <div className="header_logo">
          <a href="/">LAFTEL</a>
        </div>

        <div className="header_link">
          <a href="/finder">태그검색</a>
          <a href="/">요일별 신작</a>
          <a href="/">테마추천</a>
          <a href="/">멤버쉽</a>
        </div>
        <div className="header_right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
        </div>
        <div className="header_user_menu">
          <p onClick={onClickHandler} className="header_user_menu_logout">
            로그아웃
          </p>
          {/* <p>프로필</p>
            <p>rnwnsgud90</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg> */}
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
