import React from "react";
import { outputEnFr } from "../../common/HelperFunctions";

type Props_FoundCounText = {
  lang: string,
  count: number
}

const FoundCountText = (props: Props_FoundCounText) => {

  if (props.count === -1) {
    return <></>;
  } else {

    const nonefoundclass = props.count > 0 ? "" : "noneFound";

    return <div className={"searchFoundText fade-in " + nonefoundclass} >

      {/* {
        props.count === 0 ? <span className="searchwarning">
          {outputEnFr(
            "Please adjust your search - ",
            "Veuillez ajuster votre recherche - ",
            props.lang
          )}
        </span> : <></>
      } */}

      <span className="products-found">  
        {props.count}&nbsp;{outputEnFr(
          "Products Found",
          "équipements trouvés",
          props.lang
        )}
      </span>

   
    </div>
  }


}
export default FoundCountText;