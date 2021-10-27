import axios from "axios";
import React, { useState, useEffect } from "react";
import VideoUpload from "../../utils/VideoUpload";

function UploadVideoPage(props) {
  const [ProductId, setProductId] = useState("");
  const [Episode, setEpisode] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const idChangeHandler = (e) => {
    setProductId(e.currentTarget.value);
  };

  const episodeChangeHandler = (e) => {
    setEpisode(e.currentTarget.value);
  };

  const updateFilePath = (filePath) => {
    setFilePath(filePath);
  };

  const updateDuration = (duration) => {
    setDuration(duration);
  };

  const updateThumbnail = (thumbnail) => {
    setThumbnail(thumbnail);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!ProductId || !Episode) {
      return alert("모든 값을 넣어주세요.");
    }

    const body = {
      productId: ProductId,
      episode: Episode,
      filePath: FilePath,
      duration: Duration,
      thumbnail: Thumbnail,
    };

    axios.post("/api/product/uploadVideo", body).then((response) => {
      if (response.data.success) {
        alert("비디오 업로드에 성공");
        props.history.push("/");
        console.log("response data", response.data);
      } else {
        alert("비디오 업로드에 실패");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>동영상 업로드</h2>
      </div>

      <form onSubmit={submitHandler}>
        <VideoUpload
          refreshFilePath={updateFilePath}
          refreshDuration={updateDuration}
          refreshThumbnail={updateThumbnail}
        />
        <br />
        <br />
        <label>상품ID</label>
        <textarea onChange={idChangeHandler} value={ProductId} />
        <br />
        <br />

        <label>에피소드</label>
        <textarea onChange={episodeChangeHandler} value={Episode} />
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
