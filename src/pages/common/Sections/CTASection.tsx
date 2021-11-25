import React from "react";
import { outputEnFr } from "../HelperFunctions";
import ContactFormToromontCatHubspot from "../Components/ContactForm_TCAT_hubspot";
import ContactFormBattlefield from "../Components/ContactForm_Battlefield";
import ContactFormBattlefieldRentalFleet from "../Components/ContactForm_BattlefieldRentalFleet";
import * as Constants from "../../common/Constants";

export type Props_CTASection = {
  lang: string;
  curCategory: string | null;
  categoryClass: string;
  heading?: string;
  subheading?: string;
  submitBtnText?: string;
  viewDeals?: boolean;
  modelName?: string;
  ctaImage?: string;
  ctaImageAltText?: string;
};

export default class CTASection extends React.PureComponent<Props_CTASection> {
  contactFormComponent() {
    if (Constants.isEnvironmentBFE) {
      return <ContactFormBattlefield lang={this.props.lang} />;
    } else if (Constants.isEnvironmentBFERENTAL) {
      return <ContactFormBattlefieldRentalFleet lang={this.props.lang} />;
    } else {
      return (
        <ContactFormToromontCatHubspot
          lang={this.props.lang}
          submitBtnText={this.getSubmitBtnTxt()}
          categoryClass={this.props.categoryClass}
          curCategory={this.props.curCategory}
          modelName={this.props.modelName}
        />
      );
    }
  }

  getHeading() {
    let headingText = outputEnFr(
      "Find out more",
      "En savoir plus",
      this.props.lang
    );
    if (this.props.viewDeals) {
      headingText = outputEnFr(
        "CONNECT WITH AN EXPERT",
        "COMMUNIQUEZ AVEC UN EXPERT",
        this.props.lang
      );
    }
    return this.props.heading || headingText;
  }

  getSubHeading() {
    let subheadTxt = outputEnFr(
      "For more information or to request a quote, please complete the form below.",
      "Pour plus d'informations ou pour demander une soumission, remplissez le formulaire.",
      this.props.lang
    );
    if (this.props.viewDeals) {
      subheadTxt = outputEnFr(
        "To learn more about any of our used machines, connect with us using the form below.",
        "Pour en savoir plus sur l'une de nos machines usagées, contactez-nous en utilisant le formulaire ci-dessous.",
        this.props.lang
      );
    }

    return this.props.subheading || subheadTxt;
  }

  getSubmitBtnTxt() {
    let submitBtnText = outputEnFr("Submit", "Soumettre", this.props.lang);
    if (this.props.viewDeals) {
      submitBtnText = outputEnFr(
        "CONNECT WITH AN EXPERT",
        "COMMUNIQUEZ AVEC UN EXPERT",
        this.props.lang
      );
    }

    return this.props.submitBtnText || submitBtnText;
  }

  render() {
    return (
      <div id="details_contact_wrapper" className="container ">
        <div id="form" className="row detailsection_contact">
          <div id="contactform" className="col-xs-12">
            <p className="heading-contact text-center">{this.getHeading()}</p>
            <p className="subhead-contact text-center">
              {this.getSubHeading()}
            </p>
            <div className="row">
              <div className="col-md-8 col-md-offset-2 form-container">
                {this.contactFormComponent()}
              </div>
            </div>
          </div>
        </div>
        {Constants.isEnvironmentTCAT && (
          <div className="col-xs-12 text-center ctaImgWrap">
            <img
              className="machineImgFooter"
              alt={
                this.props.ctaImageAltText ||
                outputEnFr(
                  "Used Heavy Equipment",
                  "Équipement lourd usagé",
                  this.props.lang
                )
              }
              src={this.props.ctaImage || Constants.IMAGES.CTA_SECTION_IMAGE}
            />{" "}
          </div>
        )}
      </div>
    );
  }
}
