import React from "react";
import "./styleBodyLeft.scss";
function BodyLeft({ listData }) {
  return (
    <div>
      <div className="body-left">
        <ul className="body-left__list">
          {listData.map((item, index) => (
            <li
              id={`at${item._id}`}
              className={index === 0 ? "active" : null}
              key={index}
            >
              <a href={`#${item._id}`}>{item.description}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BodyLeft;
