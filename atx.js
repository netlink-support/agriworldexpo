
var atx = {
    ajax_url: js_base + 'ajax/',
    ajaxCustom: function (url, data, callback, callback_custom_variable_1)
    {
        $.ajax({
            url: url,
            data: data,
            method: 'POST',
            async: false,
            success: function (ret) {
                if (typeof callback === "function") {
                    if (typeof callback_custom_variable_1 !== "undefined")
                    {
                        callback(ret, callback_custom_variable_1);
                    } else
                    {
                        callback(ret);
                    }
                }
            },
            error: function (err) {
                alert('Error, Please try again later');
            }
        });
    },
    showNotification: function (message, type='success') {
        var from = 'top';
        var align = 'center';
        $.notify({
            icon: "notifications",
            message: message
        }, {
            type: type,
            timer: 6000,
            placement: {
                from: from,
                align: align
            }
        });
    },
    addEditor: function (id, height)
    {
        var height1 = 200;
        if (typeof height !== 'undefined')
        {
            height1 = height
        }

        if ($('#' + id).length > 0)
        {
            CKEDITOR.replace(id, {
                height: height1
            });
            CKEDITOR.config.forcePasteAsPlainText = true;

            CKEDITOR.config.allowedContent = true;
            CKEDITOR.config.pasteFromWordRemoveFontStyles = false;
            CKEDITOR.config.pasteFromWordRemoveStyles = false;
            CKEDITOR.dtd.$removeEmpty['span'] = false;

            CKEDITOR.config.toolbar = [
                ['Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', 'StrikeThrough', 'NumberedList', 'BulletedList', 'Link']
            ];
        }
    },
    trim_custom: function (str) {
        str = str.replace(/^\s+/, '');
        for (var i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }
        return str;
    }
}

$(document).ready(function () {
    jQuery(function ($) {
        $.fn.fixMe = function () {
            return this.each(function () {
                var $this = $(this),
                        $t_fixed;
                function init() {
                    //$this.wrap('<div class="container" />');
                    $t_fixed = $this.clone();
                    $t_fixed.find("tbody").remove().end().addClass("fixed").insertBefore($this);
                    resizeFixed();
                }
                function resizeFixed() {
                    $t_fixed.find("th").each(function (index) {
                        $(this).css("width", $this.find("th").eq(index).outerWidth() + "px");
                    });
                }
                function scrollFixed() {
                    var offset = $(this).scrollTop(),
                            tableOffsetTop = $this.offset().top,
                            tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
                    if (offset < tableOffsetTop || offset > tableOffsetBottom)
                        $t_fixed.fadeOut(200);
                    else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
                        $t_fixed.fadeIn(200);
                }
                $(window).resize(resizeFixed);
                $(window).scroll(scrollFixed);
                init();
            });
        };
    });
});
(jQuery);

$(document).on('change', '.change_type', function (e) {
    $('#change_type_form')[0].submit();
})
$(document).on('change', '.change_curr', function (e) {
    $('#change_curr_form')[0].submit();
})


$(document).on('submit', '.f1', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $(this).fadeOut('slow');
    $(this).parent('.comment-block').html('<h4>My Enquiry</h4><p>' + $(this).find('.textfield').val() + '</p>')
    atx.ajaxCustom(js_base + 'ajax/send_inquiry', data, function (result) {
        result = JSON.parse(atx.trim_custom(result));
        atx.showNotification(result.message, result.type);
    })
});


$(document).on('submit', '#ad_report_form', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $(this).parent('.white-fnt').prepend('<p class="green-bg" style="color:white">Your report has been received and we will review and take necessary action if required<br/>Thank you.</p>')
    $(this).css('display', 'none');
    atx.ajaxCustom(js_base + 'ajax/report_ad', data, function (result) {
        //result = JSON.parse(atx.trim_custom(result));
        //atx.showNotification(result.message, result.type);
    })
});

$(document).on('click', '.track-click', function (e) {
    var ad_id = $(this).data('ad-id');
    var data = {ad_id: ad_id};
    atx.ajaxCustom(js_base + 'ajax/track_atx_click', data, function (result) {

    })
})

$(document).on('change', '.add-rating', function (e) {
    $(this).closest('.rating').removeClass('no-rating');
    var data = {company_profile_id: $("#company_profile_id").val(), rating: this.value};
    atx.ajaxCustom(js_base + 'ajax/add_rating', data, function (result) {
        atx.showNotification(result);
    })
})

