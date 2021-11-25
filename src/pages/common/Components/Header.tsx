/* eslint-disable react/jsx-pascal-case */
import React from "react";
import PreNav from "../Navigation/PreNavigation";
import NavigationHeader from '../Navigation/NavigationHeader'; 

type props_PreNav = {
    lang, 
    pageType: number, 
    paramCategory:string,
    currentCatClass:string,
    jsonDataGroups
}

export default class Header extends React.PureComponent<props_PreNav> {
   
    render() {

        return (
            <>
                <PreNav 
                lang={this.props.lang} 
                pageType={this.props.pageType}
                currentCatClass={this.props.currentCatClass} /> 

                <NavigationHeader
                lang={this.props.lang}
                pageType={this.props.pageType}
                paramCategory={this.props.paramCategory}
                jsonDataGroups={this.props.jsonDataGroups} /> 
            </>
        );
    }
}  