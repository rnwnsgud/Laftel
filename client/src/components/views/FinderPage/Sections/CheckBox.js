import React, { useState } from "react";
function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  // useEffect(() => {
  //   console.log("checked", Checked);
  // }, [Checked]);

  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);

    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => handleToggle(value._id)}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            {value.name}
          </label>
        </div>
      </React.Fragment>
    ));

  return (
    <div>
      <h6>장르</h6>
      {renderCheckboxLists()}
    </div>
  );
}

export default CheckBox;
