import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
function VideoUpload(props) {
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/product/video", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);

        let variable = {
          url: response.data.url,
          filName: response.data.fileName,
        };

        setFilePath(response.data.url);
        props.refreshFilePath(response.data.url);

        axios.post("/api/product/thumbnail", variable).then((response) => {
          if (response.data.success) {
            console.log(response.data);
            setDuration(response.data.fileDuration);
            props.refreshDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url);
            props.refreshThumbnail(response.data.url);
          } else {
            alert("썸네일 생성에 실패함.");
          }
        });
      } else {
        alert("파일저장에 실패함");
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>

      {ThumbnailPath && (
        <div>
          <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
        </div>
      )}
    </div>
  );
}

export default VideoUpload;
