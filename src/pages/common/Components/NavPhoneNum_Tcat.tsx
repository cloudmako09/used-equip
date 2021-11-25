import React from "react";
import { outputEnFr, getPhoneNumber } from "../HelperFunctions"; 

type Props_NavPhoneNum = {
  lang: string,
  currentCatClass: string
}
const NavPhoneNum_Tcat = (props: Props_NavPhoneNum) => {
  return (
    <p>
      <i className="fa fa-phone"></i>&nbsp;{" "}
      <span className="data-fr" data-fr="Vous avez des questions?">
        {outputEnFr(
          "Have questions?",
          "Vous avez des questions?",
          props.lang
        )}
      </span>{" "}
      <a
        className="phonenumber-main"
        href={"tel:" + getPhoneNumber(props.currentCatClass)}
      //onclick="gtag('event', 'Click Phone', {'event_category': 'Contact', 'event_label': document.title})"
      >
        {getPhoneNumber(props.currentCatClass)}
      </a>
    </p>
  )
}
export default NavPhoneNum_Tcat;