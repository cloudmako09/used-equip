import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";

type Props_InspectionItem = {
    curItem,
    indexNum: number,
    lang
}
const InspectionSingleItem = (props: Props_InspectionItem) => {
    const curName = typeof props.curItem.name !== "undefined" && props.curItem.name != null ? props.curItem.name : "";
    const curValue = typeof props.curItem.value !== "undefined" ? props.curItem.value : "";
    const curComments = typeof props.curItem.text !== "undefined" ? props.curItem.text : "";
    let inspectionText = <></>;//what to place on the page

    if (curValue === "" && curComments !== "") {
        //no value but theres comment
        inspectionText = <span className='inspeCmts'>{curComments}</span>;
    } else if (curValue !== "" && curComments !== "") {
        inspectionText = <>{curValue}<br /><span className='inspeCmts'>{curComments}</span></>;
    } else if (curName === "" && curValue === "") {
        inspectionText = <span className='inspeCmts'>{outputEnFr("Information non disponible", "Information not available", props.lang)}</span>;
    } else {
        inspectionText = curValue;
    }

    return (
        <li key={props.indexNum} className="list-group-item">
            <div className="listitem-left col-xs-6 nopad">{curName}</div>
            <div className="listitem-right col-xs-5 text-right">{inspectionText}</div>
            <div className={"col-xs-1 text-right nopad condition-info-data condition" + curValue}>
                <span className="conditionRound"></span>
                <span className="conditionRound"></span>
                <span className="conditionRound"></span>
            </div>
            <div style={{ clear: "both" }}></div>
            </li>);
}

InspectionSingleItem.whyDidYouRender = true;
export default InspectionSingleItem;