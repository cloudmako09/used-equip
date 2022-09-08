import React, { Fragment } from "react";
import { outputEnFr } from "../../common/HelperFunctions";
import * as Types from "../../common/Types";
import { ConverterBoolean } from "../../common/HelperFunctions";
import {
  isEnvironmentBFE,
  isEnvironmentBFERENTAL,
  isEnvironmentJOBSITE,
} from "../../common/Constants";

type Props_CheckboxCertified = {
  lang: string;
  filters: Types.searchFilters;
  onSearchFilterChange;
};

const CheckboxCertified = (props: Props_CheckboxCertified) => {
  // Rental Fleet show available toggle
  const onRentalFleetAvailableChange = (e) => {
    const newRentalFleetAvailableValue: boolean = e.target.checked;

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      rentalFleetAvailability: newRentalFleetAvailableValue,
    };

    props.onSearchFilterChange(updatedSearchFilters);
  };
  // Rental Fleet show products with images toggle
  const onRentalFleetWithImagesChange = (e) => {
    const newRentalFleetWithImagesValue: boolean = e.target.checked;

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      rentalFleetWithImages: newRentalFleetWithImagesValue,
    };

    props.onSearchFilterChange(updatedSearchFilters);
  };
  // Battlfield product toggle
  const onBattlefieldChange = (e) => {
    const newBattlefieldValue: boolean = e.target.checked;

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      battlefieldInventory: newBattlefieldValue,
    };

    props.onSearchFilterChange(updatedSearchFilters);
  };

  // Dealer certified product toggle
  const onCertifiedChange = (e) => {
    const newCertifiedValue: boolean = e.target.checked;

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      certifiedOnly: newCertifiedValue,
    };

    props.onSearchFilterChange(updatedSearchFilters);
  };

  // Consignment only product toggle
  const onConsignmentChange = (e) => {
    const newConsignmentValue: boolean = e.target.checked;

    const updatedSearchFilters: Types.searchFilters = {
      ...props.filters,
      consignmentOnly: newConsignmentValue,
    };

    console.log("New Consignment Value:" + newConsignmentValue);

    props.onSearchFilterChange(updatedSearchFilters);
  };

  return (
    <>
      <div className="check-certified">
        {isEnvironmentBFE ? (
          <Fragment>
            <label className="checkbox-inline">
              <input
                className="certifiedOnlyCheck"
                onChange={(e) => onBattlefieldChange(e)}
                type="checkbox"
                defaultChecked={ConverterBoolean(
                  props.filters.battlefieldInventory
                )}
              />
              <span
                className="data-fr"
                data-fr="Afficher uniquement l'inventaire de Battlefield"
              >
                {outputEnFr(
                  "Show Battlefield Inventory Only",
                  "Afficher uniquement l'inventaire de Battlefield",
                  props.lang
                )}
              </span>
            </label>
            <br></br>
            <br></br>
            <label className="checkbox-inline">
              <input
                className="certifiedOnlyCheck"
                onChange={(e) => onCertifiedChange(e)}
                type="checkbox"
                defaultChecked={ConverterBoolean(props.filters.certifiedOnly)}
              />
              <span
                className="data-fr"
                data-fr="Voir seulement les unités certifiées"
              >
                {outputEnFr(
                  "Show only Certified equipment",
                  "Afficher uniquement l'équipement certifié",
                  props.lang
                )}
              </span>
            </label>
            <br></br>
            <br></br>
            <label className="checkbox-inline">
              <input
                className="certifiedOnlyCheck"
                onChange={(e) => onConsignmentChange(e)}
                type="checkbox"
                defaultChecked={ConverterBoolean(props.filters.consignmentOnly)}
              />
              <span
                className="data-fr"
                data-fr="Voir seulement les unités certifiées"
              >
                {outputEnFr(
                  "Show Consignment Inventory Only",
                  "Afficher Uniquement L'inventaire de Consignation",
                  props.lang
                )}
              </span>
            </label>
          </Fragment>
        ) : isEnvironmentBFERENTAL || isEnvironmentJOBSITE ? (
          <Fragment>
            <label className="checkbox-inline">
              <input
                className="certifiedOnlyCheck"
                onChange={(e) => onRentalFleetAvailableChange(e)}
                type="checkbox"
                defaultChecked={ConverterBoolean(
                  props.filters.rentalFleetAvailability
                )}
              />
              <span className="data-fr" data-fr="Afficher disponible">
                {outputEnFr(
                  "Show Available Units",
                  "Afficher les unités disponibles",
                  props.lang
                )}
              </span>
            </label>
            <br />
            <br />
            <label className="checkbox-inline">
              <input
                className="certifiedOnlyCheck"
                onChange={(e) => onRentalFleetWithImagesChange(e)}
                type="checkbox"
                defaultChecked={ConverterBoolean(
                  props.filters.rentalFleetWithImages
                )}
              />
              <span
                className="data-fr"
                data-fr="Afficher les produits avec des images"
              >
                {outputEnFr(
                  "Show Products With Images",
                  "Afficher les produits avec des images",
                  props.lang
                )}
              </span>
            </label>
          </Fragment>
        ) : (
          <label className="checkbox-inline">
            <input
              className="certifiedOnlyCheck"
              onChange={(e) => onCertifiedChange(e)}
              type="checkbox"
              checked={ConverterBoolean(props.filters.certifiedOnly)}
            />
            <span
              className="data-fr"
              data-fr="Voir seulement les unités certifiées"
            >
              Show only Certified Equipment
            </span>
          </label>
        )}
      </div>
      {/* <div className="certified-question">

              <a className="certifiedquestionicon data-fr-content" data-toggle="popover" data-html="true" data-content="<b>Cat Certified:</b>
                   <ul><li> 140-point inspection</li>
<li>       One-year/1,000-hour warranty on powertrain and hydraulics</li>
<li>        Discount on financing</li>
<li>         Up-to-date maintenance</li>
<li>       500-hour PM Kit </li>
<li>        10 % discount on Cat work tools</li></ul>
<br/>
<b>Dealer Certified:</b>
  <ul><li>          140-point inspection</li>
<li>        3-month/250-hour warranty on powertrain</li>
<li>        Financing available</li>
<li>         Up-to-date maintenance</li>
<li>        10 % discount on Cat work tools</li></ul>" data-content-fr="<b>Certifié Cat :</b>
                   <ul><li>Inspection en 140 points </li>
<li>    Garantie 1 an / 1000 heures sur groupe motopropulseur et hydraulique</li>
<li>       Rabais sur le financement</li>
<li>        Maintenance à jour</li>
<li>    Kit d’entretien 500 heures fourni </li>
<li>    10 % de rabais sur les accessoires Cat</li></ul>
<br/>
<b>Certifié concessionnaire :
</b>
  <ul><li>     Inspection en 140 points</li>
<li>       Garantie 3 mois / 250 heures sur groupe motopropulseur</li>
<li>        Maintenance complétée </li>
<li>      10 % de rabais sur les accessoires Cat </li>
<li>      Financement disponible </li></ul>">
                [?]
              </a>
            </div>   */}
      <div style={{ clear: "both" }}></div>
      <br />
    </>
  );
};
CheckboxCertified.whyDidYouRender = true;
export default CheckboxCertified;
