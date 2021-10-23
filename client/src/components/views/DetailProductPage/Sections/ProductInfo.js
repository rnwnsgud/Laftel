import React, { useEffect, useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";

function ProductInfo(props) {
  const [Genre, setGenre] = useState("");
  const [Show, setShow] = useState(false);
  let description = "" + props.detail.description; //서브스트링 오류 ""붙여서 해결

  useEffect(() => {
    renderGenres(); //detail로 들어온 장르번호와 list로 넣어준 genre._id가 같으면 genre.name을 state에 넣어줌
  }, [props.detail]);

  const renderGenres = () => {
    let genre = "";

    props.list &&
      props.list.map((value, index) => {
        if (value._id === props.detail.genres) {
          genre = value.name;
        }
        setGenre(genre);
      });
  };

  return (
    <div className="black_background">
      <div className="product_title">
        <h1>{props.detail.title}</h1>
        <br />
        <br />
        <br />
        <h5>{Genre}</h5>
      </div>
      <div className="product_info">
        <Card className="detail_card">
          <Card.Body style={{ padding: "0px" }}>
            <h6>줄거리</h6>

            {description.substring(0, 180)}
            {description.length > 180 && (
              <span>
                {"..."}
                <span
                  className="moreView"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  더보기
                </span>
              </span>
            )}
          </Card.Body>
        </Card>
        <br />
        <Card className="detail_card">
          <Card.Body style={{ padding: "0px" }}>
            <h6>제작 정보</h6>
            {props.detail.productionInfo}
          </Card.Body>
        </Card>
      </div>
      <div className={Show ? "product_modal_block" : "product_modal"}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>줄거리</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{props.detail.description}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default ProductInfo;
