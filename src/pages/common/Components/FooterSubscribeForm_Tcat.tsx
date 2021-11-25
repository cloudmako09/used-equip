/* eslint-disable no-useless-escape */
import React from "react";
import { outputEnFr } from "../HelperFunctions";
import { useForm } from 'react-hook-form/dist/react-hook-form.ie11'; // V5'
import { CLASS_POWER, ELOQUAFORMS } from "../Constants";

type Props_FooterSubscribeForm_Tcat = {
    lang: string,
    currentCatClass: string
}
const FooterSubscribeForm_Tcat = (props: Props_FooterSubscribeForm_Tcat) => {
    const { register, errors,handleSubmit } = useForm();
    const contactSubmit = (data) => { 
        console.log("Form submit data",data);  
        document["footersubscribeform"].submit();
    };

    const getEloquaFormName = () => {
        if (props.currentCatClass === CLASS_POWER) {
            return (props.lang === "fr" ? ELOQUAFORMS.FOOTERSUBSCRIBE.POWER.FR : ELOQUAFORMS.FOOTERSUBSCRIBE.POWER.EN);
        } else {
            return (props.lang === "fr" ? ELOQUAFORMS.FOOTERSUBSCRIBE.HEAVY.FR : ELOQUAFORMS.FOOTERSUBSCRIBE.HEAVY.EN);
        }
    }


    return (
        <div id="EmailFooterSubscribe">
            <p className="subscribeheader">
                {outputEnFr(
                    "Subscribe for updates from Toromont Cat",
                    "Inscrivez-vous pour recevoir les mises à jour de Toromont Cat",
                    props.lang
                )}
            </p>
            <form method="post"
                name="footersubscribeform"
                action="https://s1895344350.t.eloqua.com/e/f2"
                onSubmit={handleSubmit(contactSubmit)}
                id="form69" className="elq-form" >
                <input
                    value={getEloquaFormName()}
                    type="hidden"
                    name="elqFormName" />
                <input value="1895344350" type="hidden" name="elqSiteId" />
                <input name="elqCampaignId" type="hidden" />
                <div id="formElement0" className="sc-view form-design-field sc-static-layout item-padding sc-regular-size" >
                    <div className="field-wrapper" >
                    </div>
                    <div className="individual field-wrapper" >
                        <div className="_100 field-style" >
                            <p className="field-p" >
                                <input
                                    ref={register({
                                        required: true,
                                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    })}
                                    id="field0_footer"
                                    name="emailAddress"
                                    type="text"
                                    className="field-size-top-large"
                                    placeholder={outputEnFr("E-mail address", "Adresse courriel", props.lang)}
                                />
                            </p>
                            {errors.emailAddress &&
                                <p className="required">
                                    {outputEnFr("Your email is required.", "Votre email est obligatoire.", props.lang)}
                                </p>
                            }
                        </div>
                    </div>
                </div>
                <div className="sc-view form-design-field sc-static-layout item-padding sc-regular-size" >
                    <div className="field-wrapper" >
                    </div>
                    <div className="individual field-wrapper" >
                        <div className="_100 field-style" > 
                                <input type="submit" 
                                    value={outputEnFr("Subscribe", "Je m'inscris", props.lang)}
                                    className="submit-button"
                                    style={{ fontSize: "100%", height: "24px", width: "100px" }} />
                            
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
FooterSubscribeForm_Tcat.whyDidYouRender = true;
export default FooterSubscribeForm_Tcat;