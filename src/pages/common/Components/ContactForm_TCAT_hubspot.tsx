import React from "react";
import { CLASS_POWER, HUBSPOTFORMIDS } from "../Constants";
import HubspotForm from 'react-hubspot-form';

type Props_ContactFormToromontCat_hubspot = {
  lang: string;
  submitBtnText: string;
  curCategory: string | null;
  categoryClass: string;  
  modelName?: string;
  }

class ContactFormToromontCatHubspot extends React.PureComponent<Props_ContactFormToromontCat_hubspot> {

  getHubSpotFormId = () => { 
    if (this.props.categoryClass === CLASS_POWER) {//power
      return (this.props.lang === "fr" ? HUBSPOTFORMIDS.CONTACTFORM.POWER.FR : HUBSPOTFORMIDS.CONTACTFORM.POWER.EN);
    } else {//heavy equipment
      return (this.props.lang === "fr" ? HUBSPOTFORMIDS.CONTACTFORM.HEAVY.FR : HUBSPOTFORMIDS.CONTACTFORM.HEAVY.EN);
    }
  }
  updateModelValue = () => {
    //update hidden model name, detail page only
    const hiddenInput_Model = document.querySelector('input[name="modelname"]') as HTMLInputElement;
    if (hiddenInput_Model != null) {
      hiddenInput_Model.value = this.props.modelName || "N/A";
    }
    //update hidden URL value
    const hiddenInput_Url = document.querySelector('input[name="page_url"]') as HTMLInputElement;
    if (hiddenInput_Url != null) {
      hiddenInput_Url.value = window.location.href || "https://used.toromontcat.com";
    }

  }

  render() {
    console.log("render ContactFormToromontCat", this.getHubSpotFormId());
    return (
      <HubspotForm
        key={this.getHubSpotFormId()+"-"+this.props.curCategory}
        cssClass={'ctaContactFormHubspot'}
        portalId={'8131032'}
        formId={this.getHubSpotFormId()}
        formInstanceId={this.getHubSpotFormId()+"-"+this.props.curCategory}
        //onSubmit={() => console.log('Submit!')}
        onReady={(form) => this.updateModelValue()}
        //loading={<div>Loading...</div>}
      />
    )
  }


};

export default ContactFormToromontCatHubspot;
