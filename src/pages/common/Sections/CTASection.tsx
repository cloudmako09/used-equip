import React from "react";
import { outputEnFr } from "../HelperFunctions";
import ContactFormToromontCatHubspot from "../Components/ContactForm_TCAT_hubspot";
import ContactFormBattlefield from "../Components/ContactForm_Battlefield";
import ContactFormBattlefieldRentalFleet from "../Components/ContactForm_BattlefieldRentalFleet";
import ContactFormJobsite from "../Components/ContactForm_Jobsite";
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

const CTASection = ({
  lang,
  curCategory,
  categoryClass,
  heading,
  subheading,
  submitBtnText,
  viewDeals,
  modelName,
  ctaImage,
  ctaImageAltText,
}: Props_CTASection) => {
  const contactFormComponent = () => {
    if (Constants.isEnvironmentBFE) {
      return <ContactFormBattlefield lang={lang} />;
    } else if (Constants.isEnvironmentBFERENTAL) {
      return <ContactFormBattlefieldRentalFleet lang={lang} />;
    } else if (Constants.isEnvironmentJOBSITE) {
      return <ContactFormJobsite lang={lang} />;
    } else {
      return (
        <ContactFormToromontCatHubspot
          lang={lang}
          submitBtnText={getSubmitBtnTxt()}
          categoryClass={categoryClass}
          curCategory={curCategory}
          modelName={modelName}
        />
      );
    }
  };

  const getHeading = () => {
    let headingText = outputEnFr("Find out more", "En savoir plus", lang);
    if (viewDeals) {
      headingText = outputEnFr(
        "CONNECT WITH AN EXPERT",
        "COMMUNIQUEZ AVEC UN EXPERT",
        lang
      );
    }
    return heading || headingText;
  };

  const getSubHeading = () => {
    let subheadTxt = outputEnFr(
      "For more information or to request a quote, please complete the form below.",
      "Pour plus d'informations ou pour demander une soumission, remplissez le formulaire.",
      lang
    );
    if (viewDeals) {
      subheadTxt = outputEnFr(
        "To learn more about any of our used machines, connect with us using the form below.",
        "Pour en savoir plus sur l'une de nos machines usagées, contactez-nous en utilisant le formulaire ci-dessous.",
        lang
      );
    }

    return subheading || subheadTxt;
  };

  const getSubmitBtnTxt = () => {
    let submitBtnText = outputEnFr("Submit", "Soumettre", lang);
    if (viewDeals) {
      submitBtnText = outputEnFr(
        "CONNECT WITH AN EXPERT",
        "COMMUNIQUEZ AVEC UN EXPERT",
        lang
      );
    }

    return submitBtnText || submitBtnText;
  };
  return (
    <div id="details_contact_wrapper" className="container ">
      <div id="form" className="row detailsection_contact">
        <div id="contactform" className="col-xs-12">
          <p className="heading-contact text-center">{getHeading()}</p>
          <p className="subhead-contact text-center">{getSubHeading()}</p>
          <div className="row">
            <div className="col-md-8 col-md-offset-2 form-container">
              {contactFormComponent()}
            </div>
          </div>
        </div>
      </div>
      {Constants.isEnvironmentTCAT && (
        <div className="col-xs-12 text-center ctaImgWrap">
          <img
            className="machineImgFooter"
            alt={
              ctaImageAltText ||
              outputEnFr("Used Heavy Equipment", "Équipement lourd usagé", lang)
            }
            src={ctaImage || Constants.IMAGES.CTA_SECTION_IMAGE}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default CTASection;
