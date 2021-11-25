import React from "react";
import { outputEnFr, getPhoneNumber } from "../../common/HelperFunctions"; 

type Props_CtaSectionHeader = {
  lang: string
  currentCatClass: string
}

const CtaSectionHeader = (props: Props_CtaSectionHeader) => {
  
 const btnPhone = (
  <a href={"tel:"+getPhoneNumber(props.currentCatClass)} className="btn btn-default top-phone phonenumber-main">
    <i className="fa fa-phone" aria-hidden="true"></i> &nbsp; {getPhoneNumber(props.currentCatClass)} </a>
 )

  const btnForm = (
    <a href="#form" className="btn btn-primary btn-top-email"><i className='fa fa-question-circle'></i> &nbsp;
      <span className="data-fr" data-fr="Demande d'information">{outputEnFr("Contact Us", "Demande d'information", props.lang)}
      </span></a>
  );

  return (
    <div className="ctabuttons">
      {btnPhone}
      {btnForm}
    </div>
  )


}
CtaSectionHeader.whyDidYouRender = true;
export default CtaSectionHeader;