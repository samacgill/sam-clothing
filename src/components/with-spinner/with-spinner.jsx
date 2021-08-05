import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

//WithSpinner is a higher order component: takes a component and based on isLoading
//returns spinner or original

//nb need to add logic for withspinner on shop component as this is where it will be
//able to determine whether loading finished or not

const WithSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default WithSpinner;
