import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
function VideoUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/product/video", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
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

      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default VideoUpload;
