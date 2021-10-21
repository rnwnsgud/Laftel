import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import FileUpload from "../../utils/FileUpload";

const Genres = [
  { key: 1, value: "SF" },
  { key: 2, value: "스릴러" },
  { key: 3, value: "개그" },
  { key: 4, value: "드라마" },
  { key: 5, value: "로맨스" },
  { key: 6, value: "모험" },
  { key: 7, value: "미스터리" },
  { key: 8, value: "성인" },
  { key: 9, value: "스포츠" },
  { key: 10, value: "아이돌" },
  { key: 11, value: "액션" },
  { key: 12, value: "음악" },
  { key: 13, value: "일상" },
  { key: 14, value: "추리" },
  { key: 15, value: "감동" },
  { key: 16, value: "판타지" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [ProductionInfo, setProductInfo] = useState("");
  const [AwardHistory, setAwardHistory] = useState("");
  const [Images, setImages] = useState([]);

  const [Genre, setGenre] = useState(1);

  useEffect(() => {
    console.log("images", Images);
  }, [Images]);

  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value);
  };

  const productionInfoChangeHandler = (e) => {
    setProductInfo(e.currentTarget.value);
  };

  const awardHistoryChangeHandler = (e) => {
    setAwardHistory(e.currentTarget.value);
  };

  const genreChangeHandler = (e) => {
    setGenre(e.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !Title ||
      !Description ||
      !ProductionInfo ||
      !AwardHistory ||
      !Images ||
      !Genres
    ) {
      return alert("모든 값을 넣어주세요.");
    }

    const body = {
      title: Title,
      description: Description,
      productionInfo: ProductionInfo,
      awardHistory: AwardHistory,
      images: Images,
      genres: Genre,
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
        <h2>고급 문학 업로드</h2>
      </div>

      <form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>제목</label>
        <textarea onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <textarea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>제작 정보</label>
        <textarea
          onChange={productionInfoChangeHandler}
          value={ProductionInfo}
        />
        <br />
        <br />
        <label>수상 이력</label>
        <textarea onChange={awardHistoryChangeHandler} value={AwardHistory} />
        <br />
        <br />
        <select onChange={genreChangeHandler} value={Genre}>
          {Genres.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />

        <br />
        <br />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}

export default withRouter(UploadProductPage);
