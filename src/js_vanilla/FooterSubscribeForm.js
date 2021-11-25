import React from "react"; 

export default function FooterSubscribeForm(props) {

    var LiveValidation = LiveValidation ? LiveValidation : null;
    var Validate = Validate ? Validate : null;
    var len = len ? len : null; 
   
    if (LiveValidation){
    
        var dom0_footer = document.querySelector('#form69 #field0_footer');
        var field0_footer = new LiveValidation(dom0_footer, {
            validMessage: "", onlyOnBlur: false, wait: 300
        }
        );
        field0_footer.add(Validate.Format, {
            pattern: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i, failureMessage: "A valid email address is required"
        }
        );
        field0_footer.add(Validate.Presence, {
            failureMessage: "This field is required"
        }
        );
    }
        function handleFormSubmit(ele) {
            var submitButton = ele.querySelector('input[type=submit]');
            var spinner = document.createElement('span');
            spinner.setAttribute('class', 'loader');
            submitButton.setAttribute('disabled', true);
            submitButton.style.cursor = 'wait';
            submitButton.style.opacity = '0.5';
            submitButton.parentNode.appendChild(spinner);
            return true;
        }
        function resetSubmitButton(e) {
            var submitButtons = e.target.form.getElementsByClassName('submit-button');
            for (var i = 0; i < submitButtons.length; i++) {
                submitButtons[i].disabled = false;
            }
        }
        function addChangeHandler(elements) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener('change', resetSubmitButton);
            }
        }
        var form = document.getElementById('form69');
        if (form){
        addChangeHandler(form.getElementsByTagName('input'));
        addChangeHandler(form.getElementsByTagName('select'));
        addChangeHandler(form.getElementsByTagName('textarea'));}
        var nodes = document.querySelectorAll('#form69 input[data-subscription]');
        if (nodes) {
            for (i = 0, len = nodes.length; i < len; i++) {
                var status = nodes[i].dataset ? nodes[i].dataset.subscription : nodes[i].getAttribute('data-subscription');
                if (status === 'true') {
                    nodes[i].checked = true;
                }
            }
        };
        var nodes = document.querySelectorAll('#form69 select[data-value]');
        if (nodes) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var selectedValue = node.dataset ? node.dataset.value : node.getAttribute('data-value');
                if (selectedValue) {
                    for (var j = 0; j < node.options.length; j++) {
                        if (node.options[j].value === selectedValue) {
                            node.options[j].selected = 'selected';
                            break;
                        }
                    }
                }
            }
        }
   
    
    const outputEnFr = (textEn, textFr) => {
        return (props.lang === "fr" ? textFr : textEn);
    }

    return (
        <div id="EmailFooterSubscribe">
            <form method="post" name={outputEnFr("used_equipment_footer_signup_New", "used_equipment_footer_french")}
                action="https://s1895344350.t.eloqua.com/e/f2" onSubmit={handleFormSubmit(this)} id="form69" className="elq-form" >
                <input value={outputEnFr("used_equipment_footer_signup_New", "used_equipment_footer_french")} type="hidden" name="elqFormName" />
                <input value="1895344350" type="hidden" name="elqSiteId" />
                <input name="elqCampaignId" type="hidden" />
                <div id="formElement0" className="sc-view form-design-field sc-static-layout item-padding sc-regular-size" >
                    <div className="field-wrapper" >
                    </div>
                    <div className="individual field-wrapper" >
                        <div className="_100 field-style" >
                            <p className="field-p" >
                                <input id="field0_footer" name="emailAddress" type="text" value="" className="field-size-top-large" placeholder={outputEnFr("E-mail address", "Adresse courriel")} />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sc-view form-design-field sc-static-layout item-padding sc-regular-size" >
                    <div className="field-wrapper" >
                    </div>
                    <div className="individual field-wrapper" >
                        <div className="_100 field-style" >
                            <p className="field-p" >
                                <input type="submit" value={outputEnFr("Subscribe", "Je m'inscris")} className="submit-button"
                                    style={{ fontSize: "100%", height: "24px", width: "100px" }} />
                            </p>
                        </div>
                    </div>
                </div>
            </form> 
        </div>
      
    )
}