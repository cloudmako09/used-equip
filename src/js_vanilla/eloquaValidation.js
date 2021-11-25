 
 
    var LiveValidation = LiveValidation? LiveValidation : null;
    var Validate = Validate ? Validate : null;
    var len = len ? len : null;
    if (LiveValidation && Validate && len) {

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
        if (form!==null){
            addChangeHandler(form.getElementsByTagName('input'));
            addChangeHandler(form.getElementsByTagName('select'));
            addChangeHandler(form.getElementsByTagName('textarea'));
        }
 
        var nodes = document.querySelectorAll('#form69 input[data-subscription]');
        if (nodes) {
            for (let i = 0, len = nodes.length; i < len; i++) {
                var status = nodes[i].dataset ? nodes[i].dataset.subscription : nodes[i].getAttribute('data-subscription');
                if (status === 'true') {
                    nodes[i].checked = true;
                }
            }
        };
        nodes = document.querySelectorAll('#form69 select[data-value]');
        if (nodes) {
            for (let i = 0; i < nodes.length; i++) {
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
    }else{
        console.log("NO VALIDATION");
    }
 