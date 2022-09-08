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

// Jobsite category images
import hoistingImage from "../../../images/categoryimagesjobsite/hoisting-rigging.jpg";
import materialImage from "../../../images/categoryimagesjobsite/material-handling-machinery-moving.jpg";
import jacksImage from "../../../images/categoryimagesjobsite/jacks.jpg";
import pipeBendingImage from "../../../images/categoryimagesjobsite/pipe-bending.jpg";
import pipeFabImage from "../../../images/categoryimagesjobsite/pipe-fabrication.jpg";
import wireImage from "../../../images/categoryimagesjobsite/wire-cable-handling.jpg";
import electricToolsImage from "../../../images/categoryimagesjobsite/electric-tools.jpg";
import airToolsImage from "../../../images/categoryimagesjobsite/air-tools.jpg";
import confinedImage from "../../../images/categoryimagesjobsite/confined-space.jpg";
import storageImage from "../../../images/categoryimagesjobsite/storage-boxes.jpg";
import torqueImage from "../../../images/categoryimagesjobsite/torqueing-bolting.jpg";
import weldingImage from "../../../images/categoryimagesjobsite/welding-power-distribution.jpg";
import miscJobsiteImage from "../../../images/categoryimagesjobsite/misc.jpg";

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
        <img src={groupImage} alt={groupDisplayName} />
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
  if (
    Constants.isEnvironmentBFE_or_BFERENTAL ||
    Constants.isEnvironmentJOBSITE
  ) {
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

      // Grouped category images object (Jobsite)
      const categoryImagesJobsite = {
        "JEIJ01": hoistingImage,
        "JEIJ02": materialImage,
        "JEIJ03": jacksImage,
        "JEIJ04": weldingImage,
        "JEIJ05": pipeBendingImage,
        "JEIJ06": pipeFabImage,
        "JEIJ07": wireImage,
        "JEIJ08": electricToolsImage,
        "JEIJ09": airToolsImage,
        "JEIJ10": confinedImage,
        "JEIJ11": storageImage,
        "JEIJ12": torqueImage,
        "JEIJ13": miscJobsiteImage,
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
            // If Jobsite  images, grab category images and load
          } else if (Constants.isEnvironmentJOBSITE) {
            const newLink = getLink(
              group["group-code"],
              group["group-display-name"],
              group.count,
              categoryImagesJobsite[group["group-code"]]
            );
            categoryList[column].push(newLink);
            endColumnCheck(count);
            console.log("jobsite running");
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
            <div className={columnClass}>
              {categoryList[3].length > 0 ? categoryList[3] : ""}
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </section>
  );
};

CategorySection.whyDidYouRender = true;
export default CategorySection;
