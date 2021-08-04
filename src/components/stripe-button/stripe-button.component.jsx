import React from "react";
import StripeCheckout from "react-stripe-checkout";
//check github repository for options, including changing currency
//this is in usd, and needs to be processed in cents
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JKozeBqdekHPzEatdJ9LiPAKOX8l8H3E09Z7xeMAmDDn3c7065QPRIjVpx16gaKvNLBDUsSZGWQQ0aLiNEgb91800z425MVD5";
  const onToken = (token) => {
    console.log(token);
    alert("Payment successful");
  };
  return (
    <StripeCheckout
      label="Pay now"
      name="SAM Clothing Ltd"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default StripeCheckoutButton;
