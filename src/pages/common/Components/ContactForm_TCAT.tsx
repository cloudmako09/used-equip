/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { outputEnFr, isProvinceQM } from "../HelperFunctions";
import { useForm } from "react-hook-form";
import * as Constants from "../Constants";

type Props_ContactFormToromontCat = {
  lang: string;
  submitBtnText: string;
  categoryClass: string;
  modelName?:string;
}


const ContactFormToromontCat = (props: Props_ContactFormToromontCat) => {
  console.log("render ContactFormToromontCat", props);

  const { register, handleSubmit, errors} = useForm();
  const onSubmit = (data) => {
    console.log(data);
    document["toromontcat_used_equipment"].submit();
  };
  const [state_selectedProvince, setState_selectedProvince] = useState<string>(); 

  const inputNames={
    fullName:"firstName",
    city:"city",
    emailAddress:"emailAddress",
    busPhone:"busPhone",
    stateProv:"stateProv",
    company_name:"company_name",
    comments:"comments",
    page_url:"page_url",
    modelname:"modelname"
    }

  function handleProvinceSelect(e) {
    const newSelectedProv = e.target.value;
    setState_selectedProvince(newSelectedProv); 
  }

  function getEloquaFormName() {
    //uses categoryClass prop and select province state 
    if (isProvinceQM(state_selectedProvince)) {
      ////QM////
      if (props.categoryClass === Constants.CLASS_POWER) {//POWER
        return Constants.ELOQUAFORMS.CONTACTFORM.POWER.QM;
      } else {//HEAVY
        return Constants.ELOQUAFORMS.CONTACTFORM.HEAVY.QM;
      }

    } else {
      ////Central////
      if (props.categoryClass === Constants.CLASS_POWER) {//POWER
        return Constants.ELOQUAFORMS.CONTACTFORM.POWER.CENTRAL;
      } else {//HEAVY
        return Constants.ELOQUAFORMS.CONTACTFORM.HEAVY.CENTRAL;
      }

    }
  }


  const formSelectProvinceOptions = {
    en: (
      <>
        <option value="">Please Select...</option>
        <option value="AB"> Alberta </option>
        <option value="MB"> Manitoba </option>
        <option value="BC"> British Columbia </option>
        <option value="NB">New Brunswick </option>
        <option value="NL"> Newfoundland and Labrador </option>
        <option value="NS"> Nova Scotia </option>
        <option value="NT">Northwest Territories </option>
        <option value="NU"> Nunavut </option>
        <option value="ON"> Ontario </option>
        <option value="PE">Prince Edward Island </option>
        <option value="QC">Quebec </option>
        <option value="SK"> Saskatchewan </option>
        <option value="YT"> Yukon Territory </option>
        <option value="US"> Outside Canada </option>
      </>
    ),
    fr: (
      <>
        <option value=""> Veuillez sélectionner...</option>
        <option value="AB">Alberta</option>
        <option value="BC">Colombie-Britannique</option>
        <option value="PE">Île-du-Prince-Édouard</option>
        <option value="MB">Manitoba</option>
        <option value="NB">Nouveau-Brunswick</option>
        <option value="NS">Nouvelle-Écosse</option>
        <option value="NU">Nunavut</option>
        <option value="ON">Ontario</option>
        <option value="QC">Québec</option>
        <option value="SK">Saskatchewan</option>
        <option value="NL"> Terre-Neuve-et-Labrador</option>
        <option value="NT">Territoires du Nord-Ouest</option>
        <option value="YT">Yukon Territory</option>
        <option value="US"> Hors Canada</option>
      </>
    ),
  };

  return (
    <>
      <form
        method="post"
        name="toromontcat_used_equipment"
        action="https://s1895344350.t.eloqua.com/e/f2"
        onSubmit={handleSubmit(onSubmit)}
        id="form63"
        className="elq-form"
      >
        <input
          value={getEloquaFormName()}
          type="hidden"
          name="elqFormName"
        />
        <input value="1895344350" type="hidden" name="elqSiteId" />
        <input name="elqCampaignId" type="hidden" />
        <div className="col-xs-12 col-sm-6">
          <div
            id="formElement1"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper">
              <div className="_100"> 
                  <label htmlFor="field1">
                    <span className="data-fr" data-fr="Nom complet">
                      {outputEnFr("Full Name", "Nom complet", props.lang)}
                    </span>
                    <span className="asterix">*</span>
                  </label>
                  <input
                    ref={register({ required: true })}
                    id="field1"
                    name={inputNames.fullName}
                    type="text"
                    className={errors[inputNames.fullName] ? "invalid":""}
                  />

                  {errors[inputNames.fullName] &&
                    (props.lang === "fr" ? (
                      <p className="required">Votre nom complet est requis.</p>
                    ) : (
                        <p className="required">Your full name is required.</p>
                      ))} 
              </div>
            </div>
          </div>
          <div
            id="formElement2"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper"></div>
            <div className="field-wrapper">
              <div className="_100">
                
                  <label htmlFor="field2">
                    <span className="data-fr" data-fr="Ville">
                      {outputEnFr("City", "Ville", props.lang)}
                    </span>
                    <span className="asterix">*</span>
                  </label>
                  <input
                    ref={register({ required: true })}
                    id="field2"
                    name={inputNames.city}
                    type="text"
                    className={errors[inputNames.city] ? "invalid":""}
                  />
                  {errors[inputNames.city] &&
                    (props.lang === "fr" ? (
                      <p className="required">Votre ville est obligatoire.</p>
                    ) : (
                        <p className="required">Your city is required.</p>
                      ))}
               
              </div>
            </div>
          </div>
          <div
            id="formElement3"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper"></div>
            <div className="field-wrapper">
              <div className="_100">
                 
                  <label htmlFor="field3">
                    <span>
                      {outputEnFr(
                        "Email Address",
                        "Adresse courriel",
                        props.lang
                      )}
                    </span>
                    <span className="asterix">*</span>
                  </label>
                  <input
                    ref={register({
                      required: true,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    id="field3"
                    name={inputNames.emailAddress}
                    type="text"
                    className={errors[inputNames.emailAddress] ? "invalid":""}
                  />
                  {errors[inputNames.emailAddress] &&
                    (props.lang === "fr" ? (
                      <p className="required">Votre email est obligatoire.</p>
                    ) : (
                        <p className="required">Your email is required.</p>
                      ))}
                
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6">
          <div
            id="formElement5"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper"></div>
            <div className="field-wrapper">
              <div className="_100">
               
                  <label htmlFor="field5">
                    {outputEnFr("Phone", "Téléphone", props.lang)}

                    <span className="asterix">*</span>
                  </label>
                  <input
                    ref={register({ required: true })}
                    id="field5"
                    name={inputNames.busPhone}
                    className={errors[inputNames.busPhone] ? "invalid":""}
                    type="text"
                  />
                  {errors[inputNames.busPhone] &&
                    (props.lang === "fr" ? (
                      <p className="required">
                        Votre numéro de téléphone est requis.
                      </p>
                    ) : (
                        <p className="required">Your phone number is required.</p>
                      ))}
                
              </div>
            </div>
          </div>
          <div
            id="formElement4"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper">
              <div className="_100">
                 
                  <label htmlFor="field4">
                    <span>Province</span>
                    <span className="asterix">*</span>
                  </label>
                  <select
                    ref={register({ required: true })}
                    id="field4"
                    name={inputNames.stateProv}
                    onChange={(e) => handleProvinceSelect(e)}
                    className={errors[inputNames.stateProv] ? "invalid":""}
                  >
                    {props.lang === "fr"
                      ? formSelectProvinceOptions.fr
                      : formSelectProvinceOptions.en}
                  </select>
                  {errors[inputNames.stateProv] &&
                    (props.lang === "fr" ? (
                      <p className="required">Votre province est obligatoire</p>
                    ) : (
                        <p className="required">Your province is required.</p>
                      ))}
                
              </div>
            </div>
          </div>

          <div
            id="formElement6"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper"></div>
            <div className="field-wrapper">
              <div className="_100">
               
                  <label htmlFor="field6">
                    <span className="data-fr" data-fr="Nom de la compagnie">
                      {outputEnFr(
                        "Company name",
                        "Nom de la compagnie",
                        props.lang
                      )}
                    </span>
                  </label>
                  <input
                    ref={register}
                    id="field6"
                    name={inputNames.company_name}
                    type="text"
                    className={errors[inputNames.company_name] ? "invalid":""}
                  />
                
              </div>
            </div>
          </div>
          <div
            id="formElement7"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper">
              <input id="field7" type="hidden" name={inputNames.modelname} value={props.modelName || "N/A"} />
              <input
                id="field15"
                type="hidden"
                name={inputNames.page_url}
                value={window.location.href || "https://used.toromontcat.com"}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          <div
            id="formElement8"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper"></div>
            <div className="field-wrapper">
              <div className="_100">
                
                  <label htmlFor="field8">
                    <span className="data-fr" data-fr="Questions/Commentaires">
                      {outputEnFr(
                        "Questions/comments",
                        "Questions/Commentaires",
                        props.lang
                      )}
                    </span>
                  </label>
                  <textarea
                    ref={register}
                    id="field8"
                    name="comments"
                    rows={3}
                  ></textarea>
                 
              </div>
            </div>
          </div>

          <div
            id="formElement9"
            className="sc-view form-design-field sc-static-layout sc-regular-size"
          >
            <div className="field-wrapper"></div>
            <div className="field-wrapper">
              <div className="_100">
               
                  <input
                    type="submit"
                    value={props.submitBtnText}
                    className="submit-button"
                  />
               
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

ContactFormToromontCat.whyDidYouRender = true;
export default ContactFormToromontCat;
