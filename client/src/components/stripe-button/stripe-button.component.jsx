import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

//check github repository for options, including changing currency
//this is in usd, and needs to be processed in cents
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51JKozeBqdekHPzEatdJ9LiPAKOX8l8H3E09Z7xeMAmDDn3c7065QPRIjVpx16gaKvNLBDUsSZGWQQ0aLiNEgb91800z425MVD5";
  const onToken = (token) => {
    //axios will append '/payment' to our url
    //this matches all the things we're expecting on our server req

    // console.log(token);
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
      //checking errors coming back from res.status(500).send/res(200 send) vid 233 4.50
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log("Payment error:", error);
        alert(
          "There was an issue with your payment. Please use the test credit card."
        );
      });
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
