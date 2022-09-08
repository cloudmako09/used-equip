import React from "react";
import { types_seoData } from "../../common/Types";
import { getSeoContentByCatCode } from "../../common/SEO/SeoFunctions";
import {
  CLASS_POWER,
  isEnvironmentBFE,
  isEnvironmentBFERENTAL,
  isEnvironmentJOBSITE,
} from "../../common/Constants";

type Props_SeoTextHeader = {
  lang: string;
  category: string | null;
  currentCatClass: string;
};

const SeoTextHeader = (props: Props_SeoTextHeader) => {
  console.log("Render SeoTextHeader ", props);

  let h1title =
    props.lang === "fr"
      ? "Outils & Équipements d'Occasion"
      : "Used Tools & Equipment";
  if (isEnvironmentBFE) {
    h1title =
      props.lang === "fr"
        ? "Équipement d'occasion compact"
        : "Used Compact Equipment";
  } else if (isEnvironmentBFERENTAL) {
    h1title =
      props.lang === "fr"
        ? "Équipement de flotte de location d'occasion"
        : "Used Rental Fleet Equipment";
  }

  if (isEnvironmentBFE && window.location.toString().includes("work-tools")) {
    h1title = props.lang === "fr" ? "Équipement compact" : "Compact Equipment";
  }

  if (props.currentCatClass === CLASS_POWER) {
    h1title =
      props.lang === "fr" ? "Production d'énergie" : "Used Power Systems";
  }

  const seoText: types_seoData = getSeoContentByCatCode(props.category);

  const getCategoryHeader =
    props.lang === "fr" ? seoText.FR.Name : seoText.EN.Name;
  const getCategorySeoText =
    props.lang === "fr" ? seoText.FR.Desc : seoText.EN.Desc;
  const getCategorySeoTextBFERental =
    props.lang === "fr"
      ? "Location d’équipement Battlefield offre à prix avantageux une large gamme de machines d’occasion de qualité avec peu d’heures d’utilisation. Tous nos équipements font l’objet d’un entretien régulier par nos techniciens formés en usine selon un programme de maintenance rigoureux. Location d’équipement Battlefield procure des produits de marque de confiance et est le distributeur autorisé de produits Caterpillar, Spectra Precision/Trimble, Wacker Neuson, STIHL, Honda, SkyJack, Genie, Huqsvarna, Atlas Copco, Bosch, Godwin, entre autres. "
      : "Battlefield Equipment Rentals offers a wide range of quality, low-hour used machines for sale at great prices. All of our equipment has been regularly serviced by our Factory Trained Technicians and has undergone a strict maintenance schedule.  Battlefield Equipment Rentals sells thousands of brand name products and is the authorized distributor for such brands as Caterpillar, Spectra Precision / Trimble, Wacker Neuson, Stihl, Honda, SkyJack, Genie, Husqvarna, Atlas Copco, Bosch, Gorman-Rupp, as well as many others.";
  const getCategorySeoTextJobsite =
    props.lang === "fr"
      ? "Location d’outils industriels Jobsite offrent une vaste gamme d'outils et d'équipements d'occasion de qualité à vendre à des prix avantageux. Tous nos équipements ont été régulièrement entretenus par nos techniciens formés en usine et ont fait l'objet d'un programme d'entretien strict. Location d’outils industriels Jobsite vend des milliers de produits de marque et est le distributeur autorisé de marques telles que Lincoln Electric, Greenlee, Rigid, Sumner, RAD, Enerpac, Genie, Eagle Pro, ainsi que de nombreuses autres."
      : "Jobsite Industrial Rental Services offers a wide range of quality used tools and equipment for sale at great prices. All of our equipment has been regularly serviced by our Factory Trained Technicians and has undergone a strict maintenance schedule. Jobsite Industrial Rental Services sells thousands of brand name products and is the authorized distributor for such brands as Lincoln Electric, Greenlee, Rigid, Sumner, RAD, Enerpac, Genie, Eagle Pro, as well as many others.";

  return (
    <>
      <div id="main"></div>
      <h1 id="listingTitle">
        <span id="CategoryNameHeaderPart1" className="part1">
          {h1title + " - "}
        </span>
        <span id="CategoryNameHeader" className="part2">
          {getCategoryHeader}
        </span>
      </h1>
      <div id="CategoryFullDescription">
        {isEnvironmentBFERENTAL
          ? getCategorySeoTextBFERental
          : isEnvironmentJOBSITE
          ? getCategorySeoTextJobsite
          : getCategorySeoText}
      </div>
    </>
  );
};
SeoTextHeader.whyDidYouRender = true;
export default SeoTextHeader;
