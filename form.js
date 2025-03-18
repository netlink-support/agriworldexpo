function trim11(str) {

    str = str.replace(/^\s+/, '');

    for (var i = str.length - 1; i >= 0; i--) {

        if (/\S/.test(str.charAt(i))) {

            str = str.substring(0, i + 1);

            break;

        }

    }

    return str;

}



function countChar(val, allowed, message_div) {

    var len = val.value.length;

    $('#' + message_div).html(' : ' + parseInt((parseInt(allowed) - parseInt(len))) + ' Characters remaining');



}



$.validator.addMethod("gst", function (value, element, regexp) {

    var re = new RegExp(regexp);

    return this.optional(element) || re.test(value);

}, "Please enter valid GST number.");



$.validator.addMethod("lettersonly", function (value, element) {

    return this.optional(element) || /^[a-z ]+$/i.test(value);

}, "Only letters allowed");



$.validator.addMethod("duplicateEmail", function (value, element)

{

    var valid = true;

    $.ajax({url: js_base + 'ajax/check_duplicate',

        data: {field: 'user_email', value: value},

        async: false,

        method: 'post',

        beforeSend: function () {

            $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + js_base + '/resources/img/loader.gif"></div>');

        },

        complete: function () {

            setTimeout(function () {

                $('#loader_' + $(element).attr('name')).remove();

            }, 500);

        },

        success: function (msg) {

            msg = trim11(msg);

            valid = msg === "true" ? true : false

        }

    });

    return valid;

}, 'Email ID already registered');

$.validator.addMethod("duplicateEmailInvite", function (value, element)

{

    var valid = true;

    $.ajax({url: js_base + 'ajax/check_duplicate_invite',

        data: {field: 'user_email', value: value},

        async: false,

        method: 'post',

        beforeSend: function () {

            $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + js_base + '/resources/img/loader.gif"></div>');

        },

        complete: function () {

            setTimeout(function () {

                $('#loader_' + $(element).attr('name')).remove();

            }, 500);

        },

        success: function (msg) {

            msg = trim11(msg);

            valid = msg === "true" ? true : false

        }

    });

    return valid;

}, 'This Email ID is already Invited by you or someone else');

$.validator.addMethod("othercompanyrequired", $.validator.methods.required, "Please enter your company name");

$.validator.addMethod('filesizelogo', function (value, element, param) {

    return this.optional(element) || (element.files[0].size <= param)

}, 'Logo image size must be less than 200KB');

$.validator.addMethod('filesizepdf', function (value, element, param) {

    return this.optional(element) || (element.files[0].size <= param)

}, 'PDF size must be less than 2MB');



$("#register_form").validate({

    onkeyup: false,

    rules: {

        fname: {

            required: true,

            lettersonly: true

        },

        lname: {

            required: true,

            lettersonly: true

        },

        company: {

            required: true

        },

        email: {

            required: true,

            email: true,

            duplicateEmail: true

        },

        cemail: {

            required: true,

            email: true,

            equalTo: '#email'

        },

        phone: {

            digits: true,

            required: true,

            minlength: 7,

            maxlength: 11

        },

        country_code: {

            required: true,

            minlength: 2,

            maxlength: 5

        },

        country: {

            required: true

        },

        user_type: {

            required: function ()

            {

                if ($('#registering_for').val() == 'P')

                {

                    return true;

                }

                return false;

            }

        },

        user_category: {

            required: function ()

            {

                if ($('#registering_for').val() == 'P')

                {

                    return true;

                }

                return false;

            }

        },

        product: {

            required: function ()

            {

                //if ($('#registering_for').val() == 'P')

                //{

                return true;

                //}

                //return false;

            }

        },

        agree: {

            required: true

        }

    },

    messages: {

        email: {required: "Enter valid email address."},

        cemail: {required: "Please confirm your email address.", equalTo: "Email and confirm email does not match"},

        registering_for: "Please select relevant option",

        fname: "Please enter your first name",

        lname: "Please enter your last name",

        company: "Please select your company",

        phone: "Only numbers (7 to 11 digits).",

        country: "Please select country",

        user_type: "Please select user type",

        user_category: "Please select your profession",

        agree: "Please agree to the terms and conditions",

    },

    errorPlacement: function (error, element)

    {

        if ($(element).attr('type') == 'checkbox')

        {

            error.insertAfter($(element).closest('.small-txt'));

        } else

        {

            error.insertAfter($(element).closest('.md-form'));

        }

    },

    submitHandler: function (form)
    {
        form.submit();
    }

});



$('#register_form select#product').change(function (e) {

    $('.user_type_div').css('display', '');

    $('#user_type').val('');

    if ($(this).val() == '4' || $(this).val() == '10')

    {

        $('.user_type_div').css('display', 'none');

        $('#user_type').val('O');

    }

});



$('#register_form #registering_for').change(function (e) {

    $('#pro_div').css('display', 'none');

    $('#ut_div').css('display', 'none');

    $('#prof_div').css('display', 'none');

    $('#user_type').removeAttr('required');

    $('#product').removeAttr('required');

    $('#user_category').removeAttr('required');

    if ($(this).val() == 'P')

    {

        $('#pro_div').css('display', '');

        $('#ut_div').css('display', '');

        $('#prof_div').css('display', '');

        $('#user_type').attr('required', 'required');

        $('#product').attr('required', 'required');

        $('#user_category').attr('required', 'required');

    }

});


$("#user_register").validate({
    onkeyup: false,
    rules: {
        fname: {
            required: true,
            lettersonly: true,
//            noSpace: true,
        },
        lname: {
            required: true,
            lettersonly: true
        },
        email: {
            required: true,
            email: true,
            duplicateEmail: true
        },
        mobile: {
            minlength: 9,
            maxlength: 12,
            number: true
        }
    },

    messages: {
        email: {required: "Enter valid email address."},
        fname: "Please enter your first name",
        lname: "Please enter your last name",
    },

    submitHandler: function (form)
    {
        form.submit();
    }
});



$("#user_register1").validate({
    onkeyup: false,
    rules: {
        fname: {
            required: true,
            lettersonly: true,
//            noSpace: true,
        },
        lname: {
            required: true,
            lettersonly: true
        },
        email: {
            required: true,
            email: true,
            duplicateEmail: true
        },
        mobile: {
            minlength: 9,
            maxlength: 12,
            number: true
        }
    },

    messages: {
        email: {required: "Enter valid email address."},
        fname: "Please enter your first name",
        lname: "Please enter your last name",
    },

    submitHandler: function (form)
    {
        form.submit();
    }
});




$("#contact_submit1").validate({
    onkeyup: true,
    rules: {
        name: {
            required: true,
            minlength: 2,
            lettersonly: true
        },
        email: {
            required: true,
            email: true,
        },
        message: {
            required: true,
            minlength: 2,
        },
        mobile: {
            minlength: 9,
            maxlength: 12,
            number: true
        }
    },
    messages: {
        name: {required: "Enter Your Name.", minlength: "Minimum 2 Characters Required.", lettersonly: "Only characters allowed"},
        email: {required: "Enter a valid email address."},
        message: {required: "Enter Your Query."},
    },
    submitHandler: function (form)
    {
        form.submit();
        $('.load_btn1').css('display', 'none');
        $('.load_btn').css('display', '');
    }

});



//    $("#newsletters").validate({
//        onkeyup: true,
//        rules: {
//
//            email: {
//                required: true,
//                email: true,
//            },
//
//        },
//        messages: {
//            email: { required: "Enter a valid email address."  },
//        },
//        submitHandler: function (form)
//        {
//            function onSubmit(token) {
//                form.submit();
//            }
//        }
//    });








$("#company_form").validate({

    onkeyup: false,

    rules: {

        company_name: {

            required: true

        },

        company_phone: {

            required: true

        },

        company_email: {

            required: true,

            email: true

        },

        city: {

            required: true

        },

        country: {

            required: true

        },

        uploadBtn: {

            required: false,

            filesizelogo: 209715,

            accept: "image/jpg,image/jpeg,image/png"

        },

        pdfuploadBtn: {

            required: false,

            filesizepdf: 2097152,

            accept: "pdf"

        }

    },

    messages: {

        email: {required: "Enter valid email address."},

        company_name: "Please enter your company name",

        company_phone: "Please enter your company phone",

        company_email: "Please select your company email",

        city: "Please enter your city",

        country: "Please select country",

        uploadBtn: {accept: 'Please upload JPEG or PNG format only.'},

        pdfuploadBtn: {extension: 'Please upload PDF format only.'},

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});

//$("#company").autocomplete({
//
//    source: function (request, response) {
//
//        $.ajax({
//
//            url: js_base + "ajax/search_company/",
//
//            data: {
//
//                term: request.term
//
//            },
//
//            beforeSend: function () {
//
//                $("#company").after('<div style="margin-top: -40px; float: right;" id="loader_company"><img style="height:25px;" src="' + js_base + '/resources/img/loader.gif"></div>');
//
//            },
//
//            complete: function () {
//
//                setTimeout(function () {
//
//                    $('#loader_company').remove();
//
//                }, 500);
//
//            },
//
//            success: function (data) {
//
//                $('#company_id').val(0);
//
//                data = data.trim();
//
//                data = JSON.parse(data)
//
//                response(data);
//
//            }
//
//        });
//
//    },
//
//    //source: js_base + "ajax/search_company/",
//
//    minLength: 2,
//
//    open: function (e, ui) {
//
//
//
//    },
//
//    select: function (event, ui) {
//
//        var id = ui.item.id;
//
//        $('#company_id').val(id);
//
//    }
//
//});

$("#comment_form").validate({

    onkeyup: false,

    rules: {

        comments: {

            required: true

        },

        news_id: {

            required: true,

            lettersonly: true

        }



    },

    messages: {

        comments: "Please enter your comments",

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        $.ajax({

            type: "POST",

            url: js_base + 'ajax/news_comment',

            data: $(form).serialize(), // serializes the form's elements.

            success: function (data)

            {

                data = data.trim();

                if (data == 'success')

                {

                    atx.showNotification('Comment Successfully posted, and is now under admin approval', 'success');

                    $('#comment_form_div').fadeOut('slow');

                } else

                {

                    atx.showNotification('There was some problem, please try again later', 'danger');

                    $('#comment_form_div').fadeOut('slow');

                }

            }

        });

    }

});

$("#invite_form").validate({

    onkeyup: false,

    rules: {

        fname: {

            required: true,

            lettersonly: true

        },

        lname: {

            required: true,

            lettersonly: true

        },

        company_inv: {

            required: true

        },

        email: {

            required: true,

            email: true,

            duplicateEmail: true,

            duplicateEmailInvite: true

        }



    },

    messages: {

        email: {required: "Enter valid email address."},

        fname: "Please enter first name",

        lname: "Please enter last name",

        cmp: "Please select company name"

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});

$("#trade_enquiry_form").validate({

    onkeyup: false,

    rules: {

        product: {

            required: true

        },

        inquiry_type: {

            required: true

        },

        fname: {

            required: true,

            lettersonly: true

        },

        lname: {

            required: true,

            lettersonly: true

        },

        company: {

            required: true

        },

        email: {

            required: true,

            email: true

        },

        phone: {

            digits: true,

            required: true,

            minlength: 7,

            maxlength: 11

        },

        country: {

            required: true

        },

        comments: {

            required: true

        }



    },

    messages: {

        email: {required: "Enter valid email address."},

        fname: "Please enter your first name",

        lname: "Please enter your last name",

        company: "Please select your company",

        phone: "Only numbers (7 to 11 digits).",

        country: "Please select country",

        comments: "Please enter your enquiry information",

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});

$(document).on('change', '.country_drop', function (e) {

    var isd = $(this).find(':selected').data('isd');

    if (parseInt(isd) > 0)

    {

        $('#country_code').val($(this).find(':selected').data('isd'));

        $("#country_code").parent().children("label").addClass('active');

    }

});





function getWordCount(wordString) {

    var words = wordString.split(" ");

    words = words.filter(function (words) {

        return words.length > 0

    }).length;

    return words;

}



//add the custom validation method

jQuery.validator.addMethod("wordCount", function (value, element, params) {

    var count = getWordCount(value);

    if (count <= params[0]) {

        return true;

    }

}, jQuery.validator.format("Maximum {0} words are allowed."));



jQuery.validator.addMethod("minWordCount", function (value, element, params) {

    var count = getWordCount(value);

    if (count >= params[0]) {

        return true;

    }

}, jQuery.validator.format("Minimum {0} words are are required."));





$.validator.addMethod('filesize', function (value, element, param) {

    return this.optional(element) || (element.files[0].size <= param)

}, 'File size must be less than 2MB');





$("#add_article_form").validate({

    ignore: [],

    onkeyup: true,

    onfocusout: true,

    rules: {

        title: {

            required: true

        },

        article_pdf: {

            accept: 'pdf',

            filesize: 2097152

        },

        description: {

            required: true,

            wordCount: ['500'],

            minWordCount: ['50'],

        }

    },

    messages: {

        title: {required: "Enter title."},

        description: {required: "Enter article description."},

        article_pdf: {accept: "Only PDF files are allowed."}

    },

    errorPlacement: function (error, element)

    {

        if (element.prop("tagName").toLowerCase() == 'textarea')

        {

            error.insertAfter($(element).closest('.col-md-12').find('i'));

        } else if (element.attr("type") == 'file')

        {

            error.insertAfter($(element).closest('.col-md-12').find('div.mt-0'));

        } else

        {

            error.insertAfter(element);

        }

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});







$(document).ready(function () {

    if (typeof CKEDITOR !== 'undefined')

    {

        for (instance in CKEDITOR.instances) {





            CKEDITOR.instances[instance].on("instanceReady", function () {



                //set keyup event

                this.document.on("keyup", function () {

                    CKEDITOR.instances[instance].updateElement();

                });

                //and paste event

                this.document.on("paste", function () {

                    CKEDITOR.instances[instance].updateElement();

                });



            });

        }

    }

});



$.validator.addMethod("validatePW", function (value, element)

{

    var valid = true;

    $.ajax({url: js_base + 'ajax/check_pw',

        data: {field: 'password', value: value},

        async: false,

        method: 'post',

        beforeSend: function () {

            $(element).after('<div style="margin-top: -40px; float: right;" id="loader_' + $(element).attr('name') + '"><img style="height:25px;" src="' + js_base + '/resources/img/loader.gif"></div>');

        },

        complete: function () {

            setTimeout(function () {

                $('#loader_' + $(element).attr('name')).remove();

            }, 500);

        },

        success: function (msg) {

            msg = trim11(msg);

            valid = msg === "true" ? true : false

        }

    });

    return valid;

}, 'Current password does not match');





$.validator.addMethod("pwcheck", function (value, element) {

    return /[A-Z]+/.test(value) && /[a-z]+/.test(value) &&
            /[\d\W]+/.test(value) && /\S{6,}/.test(value);

}, "Password should contain atleast 1 uppercase, 1 lowecase and 1 number");





$("#change_pw").validate({

    onkeyup: false,

    rules: {

        current_password: {

            required: true,

            validatePW: true,

        },

        resetpassword: {

            required: true,

            pwcheck: true,

            minlength: 6

        },

        cpassword: {

            required: true,

            equalTo: '#resetpassword'

        }

    },

    messages: {

        current_password: {required: "Enter your current password.", validatePW: "Current password does not match"},

        password: {required: "Enter password.", minlength: "Please enter atleast 6 characters", pwcheck: "Password should contain atleast 1 uppercase, 1 lowecase and 1 number"},

        cpassword: {required: "Please confirm your password.", equalTo: "Password and confirm password does not match"}

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});



$("#reset_pw").validate({

    onkeyup: false,

    rules: {

        resetpassword: {

            required: true,

            pwcheck: true,

            minlength: 6

        },

        cpassword: {

            required: true,

            equalTo: '#resetpassword'

        }

    },

    messages: {

        resetpassword: {required: "Enter password.", minlength: "Please enter atleast 6 characters"},

        cpassword: {required: "Please confirm your password.", equalTo: "Password and confirm password does not match"}

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});



$("#set_usrpwd").validate({

    onkeyup: false,

    rules: {

        userpaswd: {

            required: true,

            pwcheck: true,

            minlength: 6

        },

        userconfpaswd: {

            required: true,

            equalTo: '#userpaswd'

        }

    },

    messages: {

        userpaswd: {required: "Enter password.", minlength: "Please enter atleast 6 characters"},

        userconfpaswd: {required: "Please confirm your password.", equalTo: "Password and confirm password does not match"}

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});





$("#add_classified_form").validate({
  onkeyup: false,

  rules: {
    ad_type: {
      required: true,
    },

    // package: {

    //     required: true

    // },

    email: {
      required: true,
      email: true,
    },

    website: {
        required: true,
        url: true,
        remote: {
            url: websiteCheckUrl,
            data: {
                website: function () {
                    return $("#website").val();
                },
                id: function () {
                    var adId = $("#ad_id").val();
                    return adId == undefined ? null : adId;
                },
                type: function () {
                    return $('input[name="ad_type"]:checked').val();
                },
            },
        },
    },

    //        service: {
    //
    //            required: true
    //
    //        },

    //        region: {
    //
    //            required: true
    //
    //        },

    title: {
      required: function () {
        if ($('input[name="ad_type"]:checked').val() == 2) {
          return true;
        }

        return false;
      },
    },

    description: {
      required: function () {
        if ($('input[name="ad_type"]:checked').val() == 2) {
          return true;
        }

        return false;
      },
    },

    // articlet_image: {
    //   required: function () {
    //     if ($('input[name="ad_type"]:checked').val() == 1) {
    //       if (!$("#old_image").val()) {
    //         return true;
    //       }
    //     }

    //     return false;
    //   },
    // },
  },

  messages: {
    ad_type: "Select advertisement type",
    package: "Select package",

    email: "Insert valid email id",

    product: "Select product",

    website: {
      required: "Please enter website URL",
      url: "Please enter a valid URL starting with http:// or https://",
      remote: "One free ad has already been posted using this domain",
    },
    service: "Select service",

    region: "Select region",
    cat_id: "Select Category",

    title: "Enter classified title",

    description: "Enter classified descripton",

    articlet_image: "Upload a valid image file",
  },

  errorPlacement: function (error, element) {
    if ($(element).attr("type") == "checkbox") {
      error.insertAfter($(element).closest(".md-field"));
    } else if ($(element).attr("type") == "file") {
      error.insertAfter($(element).closest(".row"));
    } else {
      error.insertAfter($(element).closest(".md-field"));
    }

    //error.insertAfter(element);

    //error.insertAfter($(element).closest('.md-field'));
  },

  submitHandler: function (form) {
    $(".dsble_cls").attr("disabled", "disabled");
    form.submit();
  },
});





$("#register_form_ad").validate({

    onkeyup: false,

    rules: {

        fname: {

            required: true,

            lettersonly: true

        },

        lname: {

            required: true,

            lettersonly: true

        },

        email: {

            required: true,

            email: true,

            duplicateEmail: true

        },

        cemail: {

            required: true,

            email: true,

            equalTo: '#email'

        },

        agree: {

            required: true

        }

    },

    messages: {

        email: {required: "Enter valid email address."},

        cemail: {required: "Please confirm your email address.", equalTo: "Email and confirm email does not match"},

        fname: "Please enter your first name",

        lname: "Please enter your last name",

        agree: "Please agree to the terms and conditions",

    },

    errorPlacement: function (error, element)

    {

        if ($(element).attr('type') == 'checkbox')

        {

            error.insertAfter($(element).closest('.small-txt'));

        } else

        {

            error.insertAfter($(element).closest('.md-form'));

        }

    },

    submitHandler: function (form)
    {
        form.submit();
    }

});





$("#kyc_form").validate({

    onkeyup: false,

    rules: {

        company_name: {

            required: true

        },

        country: {

            required: true

        },

        country_code: {

            required: true

        },

        phone: {

            digits: true,

            required: true,

            minlength: 7,

            maxlength: 11

        },

        street_address: {

            required: true

        },

        city: {

            required: true

        },

        state_: {

            required: function ()

            {

                if ($('#country').children("option:selected").val() != 99)

                {

                    return true;

                }

                return false;

            }

        },

        state_name: {

            required: function ()

            {

                if ($('#country').children("option:selected").val() == 99)

                {

                    return true;

                }

                return false;

            }

        },

        gst_no: {

            required: function ()

            {

                if ($('#country').children("option:selected").val() == 99)

                {

                    return true;

                }

                return false;

            },

            gst: "^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"

        },

    },

    messages: {

        company_name: "Please enter company name",

        country: "Please select country",

        country_code: "Please enter country code",

        phone: "Please enter phone number (7-11 digits only)",

        street_address: "Please enter your street address",

        city: "Please enter city",

        state: "Please enter state",

        state_name: "Please enter state",

        gst_no: "Please enter GST number"

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});





$("#payment_form").validate({

    onkeyup: false,

    rules: {

        payment_options: {

            required: true

        },

        cheque_no: {

            digits: true,

            required: function ()

            {

                if ($('input[name="payment_options"]:checked').val() == 'F')

                {

                    return true;

                }

                return false;

            }

        },

        cheque_date: {

            required: function ()

            {

                if ($('input[name="payment_options"]:checked').val() == 'F')

                {

                    return true;

                }

                return false;

            }

        },

        bank_name: {

            required: function ()

            {

                if ($('input[name="payment_options"]:checked').val() == 'F')

                {

                    return true;

                }

                return false;

            }

        }

    },

    messages: {

        payment_options: "Please select one option",

        cheque_no: "Enter cheque number",

        cheque_date: "Enter cheque date",

        bank_name: "Enter bank name"

    },

    errorPlacement: function (error, element)

    {

        //error.insertAfter(element);

        error.insertAfter($(element).closest('.md-form'));

    },

    submitHandler: function (form)

    {

        form.submit();

    }

});


$("#company_profile").validate({
    onkeyup: true,
    rules: {
        mobile: {
            required: false
        },
        url: {
            required: true,
            url:true
        },
        email: {
            required: true,
            email: true
        },
        brand_description: {
            required: true
        },

        establish_year: {
            required: true
        },
        company_size: {
            required: true
        },

        brand_logo: {
            required: true,
            accept: "image/jpg,image/jpeg,image/png"
        },
    },

    messages: {
        email: {required: "Enter valid email address."},
        mobile: "Please enter your company phone Number",
        brand_description: "Please Enter Brand Description",
        brand_details: "Please enter Brand Details",
        brand_logo: {accept: 'Please upload JPEG or PNG format only.'},
    },
    submitHandler: function (form)
    {
        form.submit();
    }

});

$("#banner_ad_form").validate({
    onkeyup: true,
    rules: {
        mobile: {
            required: true,
            minlength: 9,
            maxlength: 12,
            number: true
        },
        ad_email: {
            required: true,
            email: true
        },
    },

    messages: {
        ad_email: {required: "Enter valid email address."},
        mobile: "Please enter your company phone Number",
    },
    submitHandler: function (form)
    {
        form.submit();
    }

});

$("#paymentForm").validate({
    rules: {
        package: {
            required: true,
        }
    },
    messages: {
        package: "Please select your package.",
    },
    errorPlacement: function (error, element) {
        error.insertAfter($(element).closest('.md-field'));
    },
    submitHandler: function (form) {
        const packageId = $(form).find('input:checked').val();
        const url = $(form).attr('action') + '/'+packageId;
        console.log(url);

        if(!isLogin) {
            localStorage.setItem('paymentUrl', url);
            $("#modalOne").show();
            return;
        }
        
        window.location.replace(url);
        //form.submit();
    }
});







