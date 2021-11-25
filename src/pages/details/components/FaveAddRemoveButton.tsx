import React, { useState } from "react";
import { outputEnFr, formatPrice, getProductPhotoSrc } from "../../common/HelperFunctions";
import shoppingCart from '../../../js_vanilla/used-favouriteAddon';
import * as Constants from '../../common/Constants';
import { Type_jsonModelDetails } from "../../common/Types";

type Props_FaveAddRemoveButton = {
    lang: string; 
    jsonDataProduct: Type_jsonModelDetails | undefined;
}; 


const FaveAddRemoveButton = (props: Props_FaveAddRemoveButton) => {  


    const isFavourited =()=>{ 
        return (typeof shoppingCart !== "undefined" && shoppingCart.isItemInCart(props.jsonDataProduct?.year, props.jsonDataProduct?.manufacturer, props.jsonDataProduct?.model, props.jsonDataProduct?.['serial-number']));
    }

    const [state_isFavourited, setState_isFavourited] = useState<boolean>(isFavourited()); 

    const handleBtnClick =()=>{ 
        setTimeout(function(){ setState_isFavourited(isFavourited) }, 50);
    } 

    const getBtnClass=()=>{
        return state_isFavourited ? "delete-item":"add-to-cart";
    }
    const getBtnText=()=>{
        return state_isFavourited ? outputEnFr("Remove from favourites", "Supprimer de la liste des favoris", props.lang)
        : outputEnFr("Add to favourites", "Ajouter aux favoris", props.lang);
    }
    const getBtnDataString=()=>{
        return props.jsonDataProduct && props.jsonDataProduct.year + "\u00A0" + props.jsonDataProduct.manufacturer + "\u00A0" + props.jsonDataProduct.model + "\u00A0S/N:" + props.jsonDataProduct['serial-number']; 
    }
    const getDataPrice=()=>{
        if (props.jsonDataProduct && props.jsonDataProduct.price != null && props.jsonDataProduct.price.text != null) {
            return formatPrice(props.jsonDataProduct.price.text, props.lang);
        }else{
            return Constants.TEXT(props.lang).callForPrice;
        }
    }  
    
    return (
    props.jsonDataProduct ? 
    <>        
            <span id="faveButton">
                <button className={"btn btn-primary btn-addremovefave " + getBtnClass()}
                    onClick={()=>handleBtnClick()} //TODO:make this active
                    data-url={window.location.href}
                    data-pic={getProductPhotoSrc(props.jsonDataProduct, 0)}
                    data-hours={props.jsonDataProduct.hours}
                    data-serial={props.jsonDataProduct['serial-number']}
                    data-name={getBtnDataString()}
                    data-price={getDataPrice()} 
                    
                    >
                    <i className='fa fa-star'></i>
                    <span className='data_btntext'>
                        {getBtnText()}
                    </span></button>

            </span>
            <br />           
    </>
    :<></>
    );
}
FaveAddRemoveButton.whyDidYouRender = true;
export default FaveAddRemoveButton;