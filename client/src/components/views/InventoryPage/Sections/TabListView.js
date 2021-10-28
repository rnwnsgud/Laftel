import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function TabListView(props) {
  const renderCards =
    props.wantToWatch &&
    props.wantToWatch.map((product, index) => {
      return (
        <Col lg={3} md={4} xs={4} key={index}>
          <Card className="mb-2">
            <a href={`/product/${product._id}`}>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/${product.images[0]}`}
                height="300px"
              />
            </a>
            <Card.Body>
              <Card.Text>{product.title}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });

  const renderRecommends =
    props.recommend &&
    props.recommend.map((product, index) => {
      return (
        <Col lg={3} md={4} xs={4} key={index}>
          <Card className="mb-2">
            <a href={`/product/${product._id}`}>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/${product.images[0]}`}
                height="300px"
              />
            </a>
            <Card.Body>
              <Card.Text>{product.title}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });

  if (props.Tab === 0) {
    return (
      <Row md={3} lg={4}>
        {renderCards}
      </Row>
    );
  } else if (props.Tab === 1) {
    return (
      <Row md={3} lg={4}>
        {renderRecommends}
      </Row>
    );
  } else {
    return <div>별점</div>;
  }
}

export default TabListView;
