import React, { useState } from "react";
import { outputEnFr } from "../../common/HelperFunctions";
import InspectionSingleItem from "../components/InspectionSingleItem";
import { Type_jsonModelDetails } from "../../common/Types";
import Collapse from "@kunukn/react-collapse";

export type Props_InspectionReport = {
  lang: string;
  jsonDataProduct: Type_jsonModelDetails | undefined;
};

const InspectionReport = (props: Props_InspectionReport) => {
  const itemCount = props.jsonDataProduct
    ? props.jsonDataProduct.condition.category.length
    : 0;
  let initialOpenCloseStates: boolean[] = [];

  for (var i = 0; i < itemCount; i++) {
    initialOpenCloseStates.push(false);
  }

  const [openCloseStates, setOpenCloseStates] = useState<boolean[]>(
    initialOpenCloseStates
  );

  function toggleOpen(x) {
    let newOpenCloseState = { ...openCloseStates };
    newOpenCloseState[x] = !openCloseStates[x];
    setOpenCloseStates(newOpenCloseState);
  }

  if (props.jsonDataProduct == null) {
    return <></>;
  }

  //TODO: fix inspection report accordian expanding

  //inspection results
  if (
    props.jsonDataProduct.condition !== null &&
    typeof props.jsonDataProduct.condition.category !== "undefined" &&
    props.jsonDataProduct.condition.category !== null &&
    typeof props.jsonDataProduct.condition.category[0] !== "undefined"
  ) {
    const inspectionReportHtml = props.jsonDataProduct.condition.category.map(
      (curInsp, x) => {
        //for each category

        return (
          <div key={x} className="panel-group">
            <div className="panel panel-default">
              <div className="panel-heading" onClick={() => toggleOpen(x)}>
                <h4 className="panel-title">
                  <span
                    className="glyphicon glyphicon-plus"
                    aria-hidden="true"
                  ></span>{" "}
                  {curInsp.name}
                </h4>
              </div>
              <Collapse isOpen={openCloseStates[x]}>
                <ul className="list-group">
                  {curInsp.section.map((curSection, y) => {
                    //for each section
                    if (
                      typeof curSection["section-detail"] != "undefined" &&
                      curSection["section-detail"] != null
                    ) {
                      return curSection["section-detail"].map(
                        (curSectDet, z) => {
                          return (
                            <InspectionSingleItem
                              key={z}
                              curItem={curSectDet}
                              indexNum={z}
                              lang={props.lang}
                            />
                          );
                        }
                      );
                    } else {
                      return <>lel</>;
                    }
                  })}
                </ul>
              </Collapse>
            </div>
          </div>
        );
      }
    );

    return (
      <div id="details_specifications_wrapper" className="container-fluid">
        {" "}
        <div className="container">
          <div id="inspection" className="row detailsection_specifications">
            <div
              id="detailTabs"
              className="col-xs-12 col-lg-8 col-lg-offset-2 "
            >
              <ul className="nav nav-tabs">
                {/* <!--<li className="active"><a data-toggle="tab" href="#tab_features">Features</a></li>--> */}
                <li className="active">
                  {outputEnFr(
                    "Inspection Report",
                    "Voir le rapport d'inspection",
                    props.lang
                  )}
                </li>
                {/* <!--<li><a data-toggle="tab" href="#tab_warranty">Warranty</a></li> 
                        <li><a data-toggle="tab" href="#tab_freight">Freight</a></li>-->*/}
              </ul>

              <div className="tab-content">
                <div id="tab_inspection" className="tab-pane fade in active">
                  <span className="data_inspection">
                    {inspectionReportHtml}
                    {/*outputEnFr("Information not available", "Information non disponible", props.lang)*/}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
InspectionReport.whyDidYouRender = true;
export default InspectionReport;
