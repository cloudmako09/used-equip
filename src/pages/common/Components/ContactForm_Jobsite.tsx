import React from "react";
import FormSpreeJobsite from "../Components/FormSpree_Jobsite";
import FormSpreeJobsiteFR from "./FormSpreeFR_Jobsite";

const ContactFormJobsite = (props: { lang: string }) => {
  return (
    <>{props.lang === "fr" ? <FormSpreeJobsiteFR /> : <FormSpreeJobsite />}</>
  );
};

ContactFormJobsite.whyDidYouRender = true;
export default ContactFormJobsite;
