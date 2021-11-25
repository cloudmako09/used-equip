import React from "react";
import FormSpreeBFERental from "../Components/FormSpree_BattlefieldRentalFleet";
import FormSpreeFRBFERental from "../Components/FormSpreeFR_BattlefieldRentalFleet";

const ContactFormBattlefieldRentalFleet = (props: { lang: string }) => {
  return (
    <>
      {props.lang === "fr" ? <FormSpreeFRBFERental /> : <FormSpreeBFERental />}
    </>
  );
};

ContactFormBattlefieldRentalFleet.whyDidYouRender = true;
export default ContactFormBattlefieldRentalFleet;
