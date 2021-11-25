import React from "react";
import { types_seoData } from "../../common/Types";
import { getSeoContentByCatCode } from "../../common/SEO/SeoFunctions";

type Props_SeoTextBottom = {
    lang: string,
    category: string | null
    //seoText: Types_SeoData
}


class SeoTextBottom extends React.PureComponent<Props_SeoTextBottom> {


    getExtraText = () => {
        const seoText: types_seoData = getSeoContentByCatCode(this.props.category); 
        return this.props.lang === "fr" ? seoText.FR.ExtraText : seoText.EN.ExtraText;
    }

    render() {
        return (
            <div id="preCtaTextSection">
                <div className="container">
                    <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1">
                        <div id="preCtaText" className="data_extratext">
                            {this.getExtraText()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }



}
export default SeoTextBottom;