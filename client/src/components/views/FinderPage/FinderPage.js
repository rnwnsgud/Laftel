import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import "../../../App.css";
import CheckBox from "./Sections/CheckBox";
import SearchFeature from "./Sections/SearchFeature";
import { genres } from "./Sections/Data";
function FinderPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(100);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    genres: [],
  });
  const [SortStandard, setSortStandard] = useState("역사 순");
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        //console.log("카드목록", response.data);
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("카드 목록을 가져오는데에 실패함.");
      }
    });
  };

  const renderCards = Products.map((product, index) => {
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

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    showFilteredResults(newFilters);
  };

  const sortHistory = () => {
    let body = {
      skip: 0,
      limit: Limit,
    };
    getProducts(body);
    setSkip(0);
    setSortStandard("역사 순");
  };

  const sortTitle = () => {
    let body = {
      skip: 0,
      limit: Limit,
      title: true,
    };

    getProducts(body);
    setSkip(0);
    setSortStandard("이름 순");
  };

  const sortTrend = () => {
    let body = {
      skip: 0,
      limit: Limit,
      trend: true,
    };
    getProducts(body);
    setSkip(0);
    setSortStandard("최신 순");
  };

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    console.log("SearchTerm", SearchTerm);
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    getProducts(body);
  };

  return (
    <div className="finder_Container">
      <div className="filter_wrapper">
        <CheckBox
          list={genres}
          handleFilters={(filters) => handleFilters(filters, "genres")}
        />
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      <div className="card_wrapper">
        <div className="finder_card_header">
          <div className="result_count">
            총 {PostSize}개의 작품이 검색되었어요!
          </div>
          <div className="dropdown">
            <DropdownButton
              id="dropdown-basic-button"
              variant="none"
              title={SortStandard}
            >
              <Dropdown.Item onClick={sortHistory}>역사 순</Dropdown.Item>
              <Dropdown.Item onClick={sortTitle}>이름 순</Dropdown.Item>
              <Dropdown.Item onClick={sortTrend}>최신 순</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <Row md={3} lg={4}>
          {renderCards}
        </Row>
        {PostSize >= Limit && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinderPage;
