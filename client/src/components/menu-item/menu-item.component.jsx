import React from "react";
// withRouter is a higher order component which takes in a component
// and returns modified version that has access to history from initial parent (Homepage)
// use to prevent having to prop drill (add props down lots of levels = bad pattern)
import { withRouter } from "react-router-dom";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
  <div
    className={`${size} menu-item`}
    // match from react-router-dom matches current url so doesn't matter if eg shop comes before
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);
export default withRouter(MenuItem);
