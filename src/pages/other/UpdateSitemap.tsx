import React from "react"; 
import _ from 'lodash';
import { getListingPageUrl, getDetailPageUrlFromSerial, slug } from "../common/SEO/SeoFunctions";
import {isEnvironmentTCAT } from "../common/Constants";



const UpdateSitemap = () => {

    function newSitemapItem(url_en, url_fr) {
        var moddate = new Date().toISOString();
        return "<url>" +
            "<loc>" + url_en + "</loc>" +
            "<xhtml:link rel='alternate' hreflang='en' href='" + url_en + "' />" +
            "<xhtml:link rel='alternate' hreflang='fr-ca' href='" + url_fr + "' />" +
            "<lastmod>" + moddate + "</lastmod>" +
            "<changefreq>daily</changefreq>" +
            "<priority>1</priority>" +
            "</url>";
    }

    function sendPost(valueToSend) { 
        const request = new XMLHttpRequest(); 
        const url = "sitemapfiles/updatesitemap.aspx"; 
        const paramName = "mapxml"; 
        const valueToSendEncoded = encodeURI(valueToSend);

        if (request) {
            request.open('POST', url, false);
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    document.write(request.responseText);
                }else{
                    document.write("No response - sitemap not updated");
                }
            }
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(paramName+"="+valueToSendEncoded);
        }else{
            document.write("Error occured - sitemap not updated");
        }
    }

    const generateLinks = () => {
        var jsonUrl = "https://tws.toromont.ca/ToromontCAT/ServiceHub/PublicInfo/equipment/used/N000";

        fetch(jsonUrl)
        .then(res => res.json())
        .then(
          (data) => {
            var groupList;
            var productList;
            var finalOutput = "<?xml version='1.0' encoding='UTF-8'?><urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:xhtml='http://www.w3.org/1999/xhtml'>";

            //homepage
            finalOutput += newSitemapItem("https://used.toromontcat.com/", "https://used.toromontcat.com/fr");

            groupList = data['groups'];//combine into one array
            groupList = _.filter(groupList, function (o) {
                if (o != null) {
                    var curCategoryClass = o['equipments'][0]['product-family-categories']['category-class']['name'];
                    return (curCategoryClass !== "ATTACHMENTS" && curCategoryClass !== "ÉQUIPEMENTS"
                        && slug(o['group-code']) !== "work-tools-outils-de-travail");

                }
            });
            productList = [];
            for (var i = 0; i < groupList.length; i++) {
                productList = productList.concat(groupList[i]['equipments']);
            }

            console.log("Generate links", groupList, productList);
            var baseurl = "https://used.toromontcat.com";

            Object.keys(groupList).forEach(function (x) {
                //PRODUCT CATEGORY PAGES
                if (groupList[x] == null) { return; }

                var famCode = groupList[x]['group-code'];

                var hreflink_en = baseurl + getListingPageUrl("en", famCode, false);
                var hreflink_fr = baseurl + getListingPageUrl("fr", famCode, false);

                finalOutput += newSitemapItem(hreflink_en, hreflink_fr);
            });

            Object.keys(productList).forEach(function (x) {
                //PRODUCT DETAIL PAGES
                var curProduct = productList[x];

                if (
                    (typeof curProduct['serial-number'] === "undefined") ||
                    (curProduct['group-code'] === "Forklift" ||
                        curProduct['group-code'] === "Chariots Elévateurs")//filter out lift truck family
                ) { return; }

                var hreflink_en = baseurl + getDetailPageUrlFromSerial(
                    "en",
                    curProduct['serial-number'],
                    slug(curProduct['product-family-categories']['category']['category-code']),
                    false);
                var hreflink_fr = baseurl + getDetailPageUrlFromSerial(
                    "fr",
                    curProduct['serial-number'],
                    slug(curProduct['product-family-categories']['category']['category-code']),
                    false );
                finalOutput += newSitemapItem(hreflink_en, hreflink_fr);


            }); 

            finalOutput += "</urlset>";  

            sendPost(finalOutput);
            document.close();
      
          }
        ) 

    }
    isEnvironmentTCAT && generateLinks();   

    return (<div className="text-center" style={{height:"200px",padding:"100px"}}>
        <h3>Generating sitemap...</h3>
    </div>
    )
}
export default UpdateSitemap;