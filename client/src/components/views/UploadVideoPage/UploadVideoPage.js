import axios from "axios";
import React, { useState, useEffect } from "react";
import VideoUpload from "../../utils/VideoUpload";

function UploadVideoPage(props) {
  const [Title, setTitle] = useState("");

  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!Title) {
      return alert("모든 값을 넣어주세요.");
    }

    const body = {
      title: Title,
    };

    axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("애니 업로드에 성공");
        props.history.push("/");
        //console.log("response data", response.data);
      } else {
        alert("애니 업로드에 실패");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>동영상 업로드</h2>
      </div>

      <form onSubmit={submitHandler}>
        <VideoUpload />
        <br />
        <br />
        <label>제목</label>
        <textarea onChange={titleChangeHandler} value={Title} />
        <br />
        <br />

        <br />
        <br />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}

export default UploadVideoPage;
