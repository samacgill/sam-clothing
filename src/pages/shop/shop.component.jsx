import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

// import { createStructuredSelector } from "reselect";
// import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionsOverviewContainer from "../../components/collections-overview/collections.overview.container";
import CollectionPageContainer from "../collection/collection.container";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

// import WithSpinner from "../../components/with-spinner/with-spinner";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//ShopPage is nested in a route in app.js so has access to match, history and location objects
//collectionId is accessible to CollectionPage as a param
class ShopPage extends React.Component {
  // unsubscribeFromSnapshot = null;
  //"collections" is the name of the collection in firestore (a bit confusing)
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection("collections");
    // collectionRef.get().then((snapshot) => {
    //   const collectionsMap = ConvertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    //original version used firestores onSnapshot, which uses observer pattern
    //and updates every time there's a change.
    //we're moving to an async redux action, although only reason to move is if we need collections
    //somewhere else in app
    // collectionRef.onSnapshot(async (snapshot) => {
    //   const collectionsMap = ConvertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }
  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   isCollectionsLoaded: selectIsCollectionsLoaded,
// });
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
