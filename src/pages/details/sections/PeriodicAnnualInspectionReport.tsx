import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import {
  Type_jsonModelDetails,
  InspectionReportData,
} from "../../common/Types";
import { outputEnFr } from "../../common/HelperFunctions";

import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

interface Props_PIReport {
  lang: string;
  jsonDataProduct: Type_jsonModelDetails | undefined;
}

const PeriodicAnnualInspectionReport = ({
  lang,
  jsonDataProduct,
}: Props_PIReport) => {
  // Make a call to fetch the inspection report data within the original API
  const [data, setData] = useState<InspectionReportData[] | null>();

  useEffect(() => {
    let param = "?";
    let french = param + "accept-language=fr-ca";
    if (lang === "fr") {
      if (jsonDataProduct) {
        axios
          .get(jsonDataProduct["inspection-link"] + french)
          .then((response) => {
            setData(response.data);
          });

        console.log(jsonDataProduct["inspection-link"] + french);
      }
    } else {
      if (jsonDataProduct) {
        axios.get(jsonDataProduct["inspection-link"]).then((response) => {
          setData(response.data);
        });
      }
    }
  }, []);

  return (
    <div className="container periodic-annual-inspection-report">
      {/* If the data doesn't exist for a product, don't show accordion. If it does, show it. */}
      {!data ? null : (
        <>
          <div className="row">
            <div className="col-lg-12">
              <h2>
                {outputEnFr(
                  "Periodic & Annual Inspection Report",
                  "Rapport d'inspection annuel périodique",
                  lang
                )}
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Accordion preExpanded={["a"]} allowZeroExpanded>
                {/* Periodic Inspection Report */}
                <AccordionItem uuid="a">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      {lang === "en"
                        ? data && data[0].name
                        : "Inspection périodique"}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="inspection-header">
                      <strong>
                        {lang === "en"
                          ? "Inspection Date"
                          : "Date d'inspection"}
                        :
                      </strong>
                      {/* Using Date FNS to parse/format the date from the JSON API */}
                      {format(parseISO(data[0].enterDate), "MMMM dd, yyyy")}
                      <strong id="id">
                        {lang === "en" ? "Inspection ID" : "ID d'inspection"}:
                      </strong>
                      {data && data[0].inspectionId}
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">
                            {lang === "en" ? "Item" : "Article"}
                          </th>
                          <th scope="col">
                            {lang === "en" ? "Status" : "Statut"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data[0].items.map((i) => (
                            <tr>
                              <td>{i.name}</td>
                              <td
                                className={
                                  i.value === "Pass" || i.value === "Passer"
                                    ? "green"
                                    : ""
                                }
                              >
                                <strong>
                                  {lang === "fr" && i.value === "Pass"
                                    ? "Passer"
                                    : i.value}
                                </strong>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </AccordionItemPanel>
                </AccordionItem>
                {/* Annual Inspection Report */}
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      {lang === "en"
                        ? data && data[1].name
                        : "Inspection annuelle"}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="inspection-header">
                      <strong>
                        {lang === "en"
                          ? "Inspection Date"
                          : "Date d'inspection"}
                        :
                      </strong>
                      {/* Using Date FNS to parse/format the date from the JSON API */}
                      {format(parseISO(data[0].enterDate), "MMMM dd, yyyy")}
                      <strong id="id">
                        {lang === "en" ? "Inspection ID" : "ID d'inspection"}:
                      </strong>
                      {data && data[1].inspectionId}
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">
                            {lang === "en" ? "Item" : "Article"}
                          </th>
                          <th scope="col">
                            {lang === "en" ? "Status" : "Statut"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data[1].items.map((i) => (
                            <tr>
                              <td>{i.name}</td>
                              <td
                                className={
                                  i.value === "Pass" || i.value === "Passer"
                                    ? "green"
                                    : ""
                                }
                              >
                                <strong>
                                  {lang === "fr" && i.value === "Pass"
                                    ? "Passer"
                                    : i.value}
                                </strong>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PeriodicAnnualInspectionReport;
