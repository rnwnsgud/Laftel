import React from "react";

function Comment(props) {
  return (
    <div className="singleComment">
      <h6>{props.comment.user.name}</h6>

      <p>{props.comment.content}</p>
      <div className="commentFooter">
        <div>{props.comment.createdAt}</div>
        <button>따봉</button>
      </div>
      <hr />
    </div>
  );
}

export default Comment;
