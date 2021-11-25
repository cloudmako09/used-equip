import React from "react";
import FormSpree from "../Components/FormSpree_Battlefield";
import FormSpreeFR from "../Components/FormSpreeFR_Battlefield";

const ContactFormBattlefield = (props: { lang: string }) => {
  return <>{props.lang === "fr" ? <FormSpreeFR /> : <FormSpree />}</>;
};

ContactFormBattlefield.whyDidYouRender = true;
export default ContactFormBattlefield;
