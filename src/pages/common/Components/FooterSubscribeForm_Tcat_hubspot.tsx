/* eslint-disable no-useless-escape */
import React from "react"; 
import { CLASS_POWER, HUBSPOTFORMIDS} from "../Constants";
import HubspotForm from 'react-hubspot-form';


type Props_FooterSubscribeForm_Tcat = {
    lang: string,
    currentCatClass: string
}
const FooterSubscribeForm_Tcat_hubspot = (props: Props_FooterSubscribeForm_Tcat) => { 
 
    const getHubSpotFormId = () => {
        if (props.currentCatClass === CLASS_POWER) {//power
            return (props.lang === "fr" ? HUBSPOTFORMIDS.FOOTERSUBSCRIBE.POWER.FR : HUBSPOTFORMIDS.FOOTERSUBSCRIBE.POWER.EN);
        } else {//heavy equipment
            return (props.lang === "fr" ? HUBSPOTFORMIDS.FOOTERSUBSCRIBE.HEAVY.FR: HUBSPOTFORMIDS.FOOTERSUBSCRIBE.HEAVY.EN);
        }
    }


    return (
        <div id="EmailFooterSubscribe"> 
            <HubspotForm
            portalId='8131032'
            formId={getHubSpotFormId()}
            //onSubmit={() => console.log('Submit!')}
            //onReady={(form) => console.log('Form ready!')}
            //loading={<div>Loading...</div>} 
            />
        </div>
    )
}
FooterSubscribeForm_Tcat_hubspot.whyDidYouRender = true;
export default FooterSubscribeForm_Tcat_hubspot;