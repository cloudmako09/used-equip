import React from "react";
import {
  isHeavyEquipmentCategory,
  outputEnFr,
} from "../../common/HelperFunctions";
import { getListingPageUrl } from "../../common/SEO/SeoFunctions";
import { Link } from "react-router-dom";
import * as Constants from "../../common/Constants";
import _ from "lodash";

// BFE category images
import attachmentImage from "../../../images/categoryimagesbfe/home-attachments.jpg";
import compactorImage from "../../../images/categoryimagesbfe/home-compactors.jpg";
import telehandlerImage from "../../../images/categoryimagesbfe/home-telehandlers.jpg";
import backhoeLoaderImage from "../../../images/categoryimagesbfe/home-backhoe-loaders.jpg";
import excavatorImage from "../../../images/categoryimagesbfe/home-excavators.jpg";
import wheelLoaderImage from "../../../images/categoryimagesbfe/home-wheel-loaders.jpg";
import compactTrackLoaderImage from "../../../images/categoryimagesbfe/home-compact-track-loader.jpg";
import skidSteerLoaderImage from "../../../images/categoryimagesbfe/home-skid-steer-loaders.jpg";

// BFERental category images
import aircompressorsImage from "../../../images/categoryimagesbferental/air-compressors.jpg";
import backhoeloadersImage from "../../../images/categoryimagesbferental/backhoe-loaders.jpg";
import compactionequipmentImage from "../../../images/categoryimagesbferental/compaction-equipment.jpg";
import compacttrackloadersImage from "../../../images/categoryimagesbferental/compact-track-loaders.jpg";
import excavatorsImage from "../../../images/categoryimagesbferental/excavators.jpg";
import generatorsImage from "../../../images/categoryimagesbferental/generators.jpg";
import lawngardenequipmentImage from "../../../images/categoryimagesbferental/lawn-garden-equipment.jpg";
import lighttowersImage from "../../../images/categoryimagesbferental/light-towers.jpg";
import materialhandlingImage from "../../../images/categoryimagesbferental/material-handling.jpg";
import messagearrowboardsImage from "../../../images/categoryimagesbferental/message-arrow-boards.jpg";
import miscImage from "../../../images/categoryimagesbferental/misc.jpg";
import miscImageFR from "../../../images/categoryimagesbferental/misc-fr.jpg";
import pumpsImage from "../../../images/categoryimagesbferental/pumps.jpg";
import scissorliftsboomsImage from "../../../images/categoryimagesbferental/scissor-lifts-booms.jpg";
import skidsteerloadersImage from "../../../images/categoryimagesbferental/skid-steer-loaders.jpg";
import trenchshoringImage from "../../../images/categoryimagesbferental/trench-shoring.jpg";
import weldersImage from "../../../images/categoryimagesbferental/welders.jpg";

type Props_CategorySection = {
  lang: string;
  jsonDataGroups;
};
const fadeInClass = navigator.userAgent === "ReactSnap" ? "fade-in" : "";

const CategorySection = (props: Props_CategorySection) => {
  console.log("Rendering CategorySection", props);

  //each array is a column
  let categoryList: Object = [];
  categoryList[0] = [];
  categoryList[1] = [];
  categoryList[2] = [];
  categoryList[3] = [];

  const getDefaultLinks = () => {
    // So that some links are shown while loading API, helps with ux and SEO
    let categoryList: Object = [];
    categoryList[0] = [];
    categoryList[1] = [];
    categoryList[2] = [];
    categoryList[3] = [];
    if (Constants.isEnvironmentTCAT && props.lang === "en") {
      categoryList[0][0] = getLink(
        "articulated-trucks-tombereaux-articules",
        "Articulated Trucks"
      );
      categoryList[0][1] = getLink(
        "backhoe-loaders-chargeuses-pelleteuses",
        "Backhoe Loaders"
      );
      categoryList[0][2] = getLink("compactors-compacteurs", "Compactors");
      categoryList[0][3] = getLink(
        "aggregate-granulats",
        "Crushers and Screens"
      );
      categoryList[0][4] = getLink(
        "excavators-pelles-hydrauliques",
        "Excavators"
      );

      categoryList[1][0] = getLink(
        "forest-products-materiel-forestier",
        "Forest Products"
      );
      categoryList[1][1] = getLink(
        "mining-equipment-machines-pour-mines",
        "Mining Equipment"
      );
      categoryList[1][2] = getLink("motor-graders-niveleuses", "Motor Graders");
      categoryList[1][3] = getLink(
        "off-highway-trucks-tractors-tombereaux-rigides-tracteurs",
        "Off-highway Trucks / Tractors"
      );
      categoryList[1][4] = getLink(
        "on-highway-trucks-camions-routiers",
        "On-highway Trucks"
      );

      categoryList[2][0] = getLink(
        "paving-products-materiel-routier",
        "Paving Products"
      );
      categoryList[2][1] = getLink(
        "telehandlers-chargeurs-a-bras-telescopique",
        "Telehandlers"
      );
      categoryList[2][2] = getLink(
        "track-type-loaders-crawlers-chargeurs-sur-chaines",
        "Track Type Loaders / Crawlers"
      );
      categoryList[2][3] = getLink(
        "track-type-tractors-dozers-tracteurs-sur-chaines",
        "Track Type Tractors / Dozers"
      );
      categoryList[2][4] = getLink(
        "wheel-loaders-integrated-toolcarriers-chargeurs-sur-pneus-chargeurs-industriels",
        "Wheel Loaders / Integrated Toolcarriers"
      );
    } else if (Constants.isEnvironmentTCAT && props.lang === "fr") {
      categoryList[0][0] = getLink(
        "on-highway-trucks-camions-routiers",
        "Camions Routiers"
      );
      categoryList[0][1] = getLink(
        "telehandlers-chargeurs-a-bras-telescopique",
        "Chargeurs à Bras Télescopique"
      );
      categoryList[0][2] = getLink(
        "track-type-loaders-crawlers-chargeurs-sur-chaines",
        "Chargeurs Sur Chaines"
      );
      categoryList[0][3] = getLink(
        "wheel-loaders-integrated-toolcarriers-chargeurs-sur-pneus-chargeurs-industriels",
        "Chargeurs Sur Pneus / Chargeurs Industriels"
      );
      categoryList[0][4] = getLink("compactors-compacteurs", "Compacteurs");

      categoryList[1][0] = getLink(
        "aggregate-granulats",
        "Concasseurs et cribles"
      );
      categoryList[1][1] = getLink(
        "mining-equipment-machines-pour-mines",
        "Équipements miniers"
      );
      categoryList[1][2] = getLink(
        "excavators-pelles-hydrauliques",
        "Excavatrices"
      );
      categoryList[1][3] = getLink("motor-graders-niveleuses", "Niveleuses");
      categoryList[1][4] = getLink(
        "paving-products-materiel-routier",
        "Produits de pavage"
      );

      categoryList[2][0] = getLink(
        "forest-products-materiel-forestier",
        "Produits forestiers"
      );
      categoryList[2][1] = getLink(
        "backhoe-loaders-chargeuses-pelleteuses",
        "Rétrocaveuses"
      );
      categoryList[2][2] = getLink(
        "articulated-trucks-tombereaux-articules",
        "Tombereaux Articulés"
      );
      categoryList[2][3] = getLink(
        "off-highway-trucks-tractors-tombereaux-rigides-tracteurs",
        "Tombereaux rigides / tracteurs"
      );
      categoryList[2][4] = getLink(
        "track-type-tractors-dozers-tracteurs-sur-chaines",
        "Tracteurs Sur Chaines"
      );
    } else if (Constants.isEnvironmentBFE && props.lang === "en") {
      categoryList[0][0] = getLink(
        "skid-steer-loaders-asv-chargeurs-compacts-rigides",
        "Skid Steer Loaders",
        undefined,
        attachmentImage
      );
      categoryList[0][1] = getLink(
        "backhoe-loaders-chargeuses-pelleteuses",
        "Backhoe Loaders",
        undefined,
        backhoeLoaderImage
      );
      categoryList[1][0] = getLink(
        "compact-track-loader-compact-track-loader",
        "Compact Track Loaders",
        undefined,
        compactTrackLoaderImage
      );

      categoryList[1][1] = getLink(
        "telehandlers-chargeurs-a-bras-telescopique",
        "Telehandlers",
        undefined,
        compactorImage
      );
      categoryList[2][0] = getLink(
        "excavators-pelles-hydrauliques",
        "Excavators",
        undefined,
        excavatorImage
      );
      categoryList[2][1] = getLink(
        "compactors-compacteurs",
        "Compaction Equipment",
        undefined,
        skidSteerLoaderImage
      );

      // categoryList[3][0] = getLink(
      //   "wheel-loaders-integrated-toolcarriers-chargeurs-sur-pneus-chargeurs-industriels",
      //   "Wheel Loaders",
      //   undefined,
      //   telehandlerImage
      // );
      // categoryList[3][1] = getLink(
      //   "work-tools-outils-de-travail",
      //   "Attachments",
      //   undefined,
      //   wheelLoaderImage
      // );
    } else if (Constants.isEnvironmentBFE && props.lang === "fr") {
      // categoryList[0][0] = getLink(
      //   "work-tools-outils-de-travail",
      //   "Accessoires",
      //   undefined,
      //   attachmentImage
      // );
      categoryList[0][0] = getLink(
        "telehandlers-chargeurs-a-bras-telescopique",
        "Chargeurs À Bras Télescopique",
        undefined,
        backhoeLoaderImage
      );
      categoryList[0][1] = getLink(
        "skid-steer-loaders-asv-chargeurs-compacts-rigides",
        "Chargeurs Compacts rigides",
        undefined,
        compactTrackLoaderImage
      );

      // categoryList[1][0] = getLink(
      //   "wheel-loaders-integrated-toolcarriers-chargeurs-sur-pneus-chargeurs-industriels",
      //   "Chargeurs Sur Pneus",
      //   undefined,
      //   compactorImage
      // );
      categoryList[1][0] = getLink(
        "compact-track-loader-compact-track-loader",
        "Chargeuses à chaînes compactes",
        undefined,
        excavatorImage
      );
      categoryList[1][1] = getLink(
        "backhoe-loaders-chargeuses-pelleteuses",
        "Chargeuses-pelleteuses",
        undefined,
        skidSteerLoaderImage
      );

      categoryList[2][0] = getLink(
        "compactors-compacteurs",
        "Équipment Compact",
        undefined,
        telehandlerImage
      );
      categoryList[2][1] = getLink(
        "excavators-pelles-hydrauliques",
        "Pelles Hydrauliques",
        undefined,
        wheelLoaderImage
      );
    } else if (Constants.isEnvironmentBFERENTAL && props.lang === "en") {
      // BFERental images
      categoryList[0][0] = getLink(
        "BFE001",
        "Air Compressors",
        undefined,
        aircompressorsImage
      );
      categoryList[0][1] = getLink(
        "BFE013",
        "Backhoe Loaders",
        undefined,
        backhoeloadersImage
      );
      categoryList[0][2] = getLink(
        "BFE012",
        "Compaction Equipment",
        undefined,
        compactionequipmentImage
      );
      categoryList[0][3] = getLink(
        "BFE010",
        "Compact Track Loaders",
        undefined,
        compacttrackloadersImage
      );
      categoryList[1][0] = getLink(
        "BFE011",
        "Excavators",
        undefined,
        excavatorsImage
      );
      categoryList[1][1] = getLink(
        "BFE002",
        "Generators",
        undefined,
        generatorsImage
      );
      categoryList[1][2] = getLink(
        "BFE008",
        "Lawn & Garden Equipment",
        undefined,
        lawngardenequipmentImage
      );
      categoryList[1][3] = getLink(
        "BFE003",
        "Light Towers",
        undefined,
        lighttowersImage
      );
      categoryList[2][0] = getLink(
        "BFE014",
        "Material Handling",
        undefined,
        materialhandlingImage
      );
      categoryList[2][1] = getLink(
        "BFE006",
        "Message & Arrow Boards",
        undefined,
        messagearrowboardsImage
      );
      categoryList[2][2] = getLink("BFE015", "Miscellaneous", undefined);
      categoryList[2][3] = getLink("BFE004", "Pumps", undefined, pumpsImage);
      categoryList[3][0] = getLink(
        "BFE005",
        "Scissor Lifts & Booms",
        undefined,
        scissorliftsboomsImage
      );
      categoryList[3][1] = getLink(
        "BFE009",
        "Skid Steer Loaders",
        undefined,
        skidsteerloadersImage
      );
      categoryList[3][2] = getLink(
        "BFE017",
        "Trench Shoring",
        undefined,
        trenchshoringImage
      );
      categoryList[3][3] = getLink(
        "BFE016",
        "Trench Shoring",
        undefined,
        trenchshoringImage
      );
    }
    return categoryList;
  };

  const getLink = (
    groupCode: string,
    groupDisplayName: string,
    groupCount?: number,
    groupImage?: string
  ) => {
    const href = getListingPageUrl(
      props.lang,
      groupCode,
      false,
      Constants.searchFiltersEmptyDefault
    );
    const linkClasses = groupCount ? "homeequiplink" : "homeequiplink default";
    return (
      <Link key={groupCode} className={linkClasses} to={href}>
        {Constants.isEnvironmentBFE_or_BFERENTAL && (
          <img src={groupImage} alt={groupDisplayName} />
        )}
        {groupDisplayName}&nbsp;
        {groupCount && (
          <span className="badge badge-primary">{groupCount}</span>
        )}
      </Link>
    );
  };

  //Set columns based on environment
  let numberOfColumns = 3;
  let columnClass = "col-sm-4"; //3 columns
  if (Constants.isEnvironmentBFE_or_BFERENTAL) {
    numberOfColumns = 4;
    columnClass = "col-sm-3"; //4 columns
  }

  if (props.jsonDataGroups) {
    //sort by display name
    const UsedData = _.sortBy(props.jsonDataGroups, function (o) {
      if (o["group-display-name"] != null) {
        return _.deburr(o["group-display-name"]);
      }
    }); //asc

    if (UsedData) {
      let famCount = UsedData.length;

      let famCountPerColumn = Math.ceil(famCount / numberOfColumns); //number of items per column

      let count = 0;
      let column = 0;
      // Grouped category images object (BFE)
      const categoryImagesBFE = {
        "Work Tools - Outils De Travail": attachmentImage,
        "Compactors - Compacteurs": compactorImage,
        "Telehandlers - Chargeurs À Bras Télescopique": telehandlerImage,
        "Backhoe Loaders - Chargeuses-pelleteuses": backhoeLoaderImage,
        "Excavators - Pelles Hydrauliques": excavatorImage,
        "Wheel Loaders / Integrated Toolcarriers - Chargeurs Sur Pneus / Chargeurs Industriels":
          wheelLoaderImage,
        "COMPACT TRACK LOADER - COMPACT TRACK LOADER": compactTrackLoaderImage,
        "Skid Steer Loaders / ASV - Chargeurs Compacts rigides":
          skidSteerLoaderImage,
      };

      // Grouped category images object (BFERENTAL)
      const categoryImagesBFERental = {
        "BFE001": aircompressorsImage,
        "BFE013": backhoeloadersImage,
        "BFE012": compactionequipmentImage,
        "BFE010": compacttrackloadersImage,
        "BFE011": excavatorsImage,
        "BFE002": generatorsImage,
        "BFE008": lawngardenequipmentImage,
        "BFE003": lighttowersImage,
        "BFE014": materialhandlingImage,
        "BFE006": messagearrowboardsImage,
        "BFE015": props.lang === "en" ? miscImage : miscImageFR,
        "BFE004": pumpsImage,
        "BFE005": scissorliftsboomsImage,
        "BFE009": skidsteerloadersImage,
        "BFE017": trenchshoringImage,
        "BFE016": weldersImage,
      };

      const endColumnCheck = (c) => {
        if (
          c === famCountPerColumn ||
          c === famCountPerColumn * 2 ||
          c === famCountPerColumn * 3 ||
          c === famCountPerColumn * 4
        ) {
          column++;
        }
      };
      UsedData.forEach((group) => {
        if (
          Constants.isEnvironmentBFE || //BFE - show all
          isHeavyEquipmentCategory(group) //TCAT - heavy equipment only
        ) {
          count++;
          // If BFE images or TCAT, grab category images and load
          if (Constants.isEnvironmentBFE || Constants.isEnvironmentTCAT) {
            const newLink = getLink(
              group["group-code"],
              group["group-display-name"],
              group.count,
              categoryImagesBFE[group["group-code"]]
            );
            categoryList[column].push(newLink);
            endColumnCheck(count);
            console.log("bfe running");
            // If BFERental images, grab category images and load
          } else if (Constants.isEnvironmentBFERENTAL) {
            const newLink = getLink(
              group["group-code"],
              group["group-display-name"],
              group.count,
              categoryImagesBFERental[group["group-code"]]
            );
            categoryList[column].push(newLink);
            endColumnCheck(count);
            console.log("bfe rental running");
          }
        }
      });
    }
  }

  return (
    <section id="sectionFamilyList">
      <div className="clearfix"></div>
      <div className="container">
        <div className="row">
          <div className="text-center">
            <h2>
              {outputEnFr(
                "Browse by category",
                "Parcourir par catégorie",
                props.lang
              )}
            </h2>
          </div>

          <div id="mainProdFamList" className={fadeInClass}>
            <div className={columnClass}>
              {categoryList[0].length > 0 ? categoryList[0] : ""}
            </div>
            <div className={columnClass}>
              {categoryList[1].length > 0 ? categoryList[1] : ""}
            </div>
            <div className={columnClass}>
              {categoryList[2].length > 0 ? categoryList[2] : ""}
            </div>
            {Constants.isEnvironmentBFERENTAL && (
              <div className={columnClass}>
                {categoryList[3].length > 0 ? categoryList[3] : ""}
              </div>
            )}
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </section>
  );
};

CategorySection.whyDidYouRender = true;
export default CategorySection;
