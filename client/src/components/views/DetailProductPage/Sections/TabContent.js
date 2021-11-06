import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
function TabContent(props) {
  const [Content, setContent] = useState("");
  const [Comments, setComments] = useState([]);
  const [CheckMyReview, setCheckMyReview] = useState(false);
  const user = useSelector((state) => state.user);

  const renderVideos = props.Video.map((video, index) => {
    return (
      <a href={`http://localhost:5000/${video.filePath}`} key={index}>
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

  const setInputHeight = (e, defaultHeight) => {
    // console.log("E", e);
    // console.log("e.target", e.currentTarget);
    // const target = e.currentTarget ? e.currentTarget : e;
    const target = e.currentTarget;
    target.style.height = defaultHeight;
    target.style.height = `${target.scrollHeight}px`;
    // console.log("scrollheigt", target.scrollHeight);
    setContent(e.currentTarget.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let body = {
      content: Content,
      user: user.userData._id,
      productId: props.productId,
    };

    const saveCommentResult = await axios.post(
      "/api/comment/saveComment",
      body
    );

    const getCommentResult = await axios.post("/api/comment/getComment", body);
    if (getCommentResult.data.success) {
      // console.log("comments", response.data.comments);
      setComments(getCommentResult.data.comments);
      getCommentResult.data.comments.map((comment, index) => {
        console.log("작동함1");
        // console.log("comment user id", comment.user._id);
        // console.log("user id", user.userData._id);
        if (
          comment.user._id === user.userData._id &&
          comment.user._id === user.userData._id
        ) {
          console.log("작동함2");
          setCheckMyReview(true);
        }
      });
    } else {
      alert("댓글을 가져오지 못함");
    }
  };

  const onDelete = (e) => {
    e.preventDefault();

    Comments.map((comment, index) => {
      // console.log("comment user id", comment.user._id);
      // console.log("user id", user.userData._id);
      if (
        comment.user._id === user.userData._id &&
        comment.productId === props.productId
      ) {
        deleteMyComment(comment);

        console.log("myComment", comment);
      }
    });
  };

  const deleteMyComment = async (myComment) => {
    let body = {
      myComment: myComment,
    };

    const deleteCommentResult = await axios.post(
      "/api/comment/deleteComment",
      body
    );
    if (deleteCommentResult.data.success) {
    } else {
      alert("댓글 삭제에 실패함");
    }
  };

  useEffect(() => {
    let body = { productId: props.productId };

    axios.post("/api/comment/getComment", body).then((response) => {
      if (response.data.success) {
        console.log("comments", response.data.comments);

        response.data.comments.map((comment, index) => {
          if (user && user.userData) {
            // console.log("comment user id", comment.user._id);
            // console.log("user id", user.userData._id);
            if (comment.productId === props.productId) {
              setComments(response.data.comments);
              if (comment.user._id === user.userData._id) {
                setCheckMyReview(true);
              }
            }
          }
        });
      } else {
        alert("댓글을 가져오지 못함");
      }
    });
  }, [user && user.userData]);

  if (props.tab === 0) {
    return renderVideos;
  } else {
    return (
      <div>
        <div className="starDistribution">
          <h6>별점분포</h6>
          <p>총 평점 4 / 5(10000명)</p>
        </div>
        <hr />
        <h6>리뷰</h6>
        {!CheckMyReview && (
          <div className="review">
            <form onSubmit={onSubmit}>
              <textarea
                value={Content}
                placeholder="솔직한 평가, 또는 작품의 매력을 알려주세요(스토리, 캐릭터, 그림, OST 등)"
                onChange={(e) => setInputHeight(e, "100px")}
                maxLength="300"
              ></textarea>

              <div className="textarea_btn">
                <div className="text_count">{Content.length}/300</div>
                <div className="button" onClick={onSubmit}>
                  작성
                </div>
              </div>
            </form>
          </div>
        )}

        {CheckMyReview && (
          <div className="myReview">
            {Comments.map((comment, index) => {
              if (
                comment.productId === props.productId &&
                comment.user._id === user.userData._id
              ) {
                return <p key={index}>{comment.content}</p>;
              }
            })}
            <div className="foot">
              <div onClick={onDelete}>삭제</div>
            </div>
          </div>
        )}

        {Comments.map((comment, index) => {
          if (comment.productId === props.productId) {
            return <Comment comment={comment} key={index} />;
          }
        })}
      </div>
    );
  }
}

export default TabContent;
