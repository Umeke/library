'use strict';

//=> Class definition
var FormValidate = function() {

    //=> Init Form Validation
    var initFormValidation = function() {
        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    };

    return {
        //=> Init
        init: function () {
            initFormValidation();
        },
    };
}();

//=> Class Initialization
$(document).ready(function () {
    FormValidate.init();
});