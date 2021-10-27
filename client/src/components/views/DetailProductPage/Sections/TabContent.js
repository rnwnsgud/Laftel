import React from "react";

function TabContent(props) {
  const renderVideos = props.Video.map((video, index) => {
    return (
      <a href={`http://localhost:5000/${video.filePath}`}>
        <div style={{ display: "flex" }}>
          <img
            style={{ width: "160px", height: "111px" }}
            src={`http://localhost:5000/${video.thumbnail}`}
            alt="thumbnail"
          />
          <div>
            <h5>{video.episode}</h5>
          </div>
        </div>
      </a>
    );
  });

  if (props.tab === 0) {
    return renderVideos;
  } else {
    return <div>리뷰</div>;
  }
}

export default TabContent;
