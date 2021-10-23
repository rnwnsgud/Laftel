import React, { useState } from "react";

function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState("");
  //console.log("Feautersearch", SearchTerm);
  const searchHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };

  return (
    <input placeholder="Search" onChange={searchHandler} value={SearchTerm} />
  );
}

export default SearchFeature;
