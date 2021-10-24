import React from "react";

function TabContent(props) {
  if (props.tab === 0) {
    return (
      <div>
        <video controls>
          <source
            src={"http://media.w3.org/2010/05/sintel/trailer.mp4"}
          ></source>
        </video>
      </div>
    );
  } else {
    return <div>리뷰</div>;
  }
}

export default TabContent;
