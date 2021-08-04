import React from "react";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";
//CategoryPage nested in a route in shop.component so has access to match
const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

//don't quite understand this...
//because selectCollection is a function that returns a function,
// we pass state to the function that comes back
//NB selector needs a part of the state depending on url parameter
//check lecture 148

//also nb using second parameter of mapStateToProps, ownProps
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});
export default connect(mapStateToProps)(CollectionPage);
