/*
 * Method reize image
 * @variables class
 */

var filters = {};
function TzTemplateResizeImage(obj) {
    var widthStage;
    var heightStage;
    var widthImage;
    var heightImage;
    obj.each(function (i, el) {
        alert(i)
        heightStage = jQuery(this).height();

        widthStage = jQuery(this).width();

        var img_url = jQuery(this).find('img').attr('src');

        var image = new Image();
        image.src = img_url;

        widthImage = image.naturalWidth;
        heightImage = image.naturalHeight;
        var tzimg = new resizeImage(widthImage, heightImage, widthStage, heightStage);
        jQuery(this).find('img').css({top: tzimg.top, left: tzimg.left, width: tzimg.width, height: tzimg.height});
    });

}

function getComboFilter(filters) {

    var i = 0;
    var comboFilters = [];
    var message = [];

    for (var prop in filters) {
        message.push(filters[ prop ].join(' '));
        var filterGroup = filters[ prop ];
        // skip to next filter group if it doesn't have any values
        if (!filterGroup.length) {
            continue;
        }

        if (i === 0) {
            // copy to new array
            comboFilters = filterGroup.slice(0);
        } else {
            var filterSelectors = [];
            // copy to fresh array
            var groupCombo = comboFilters.slice(0); // [ A, B ]
            // merge filter Groups
            for (var k = 0,
                    len3 = filterGroup.length; k < len3; k++) {
                for (var j = 0,
                        len2 = groupCombo.length; j < len2; j++) {
                    filterSelectors.push(groupCombo[j] + filterGroup[k]); // [ 1, 2 ]
                }

            }
            // apply filter selectors to combo filters for next group
            comboFilters = filterSelectors;
        }
        i++;
    }

    var comboFilter = comboFilters.join(', ');
    return comboFilter;
}


$(document).on('change', '.select', function () {
    var $this = $(this);
    // get group key
    var $buttonGroup = $this;
    var filterGroup = $buttonGroup.attr('data-filter-group');

    if (typeof $this.find(':selected').attr('data-filter') !== 'undefined')
    {
        filters[ filterGroup ] = [$this.find(':selected').attr('data-filter')];

        $(this).next('span.select2-container').addClass('select2-container--active')
    } else
    {
        $(this).next('span.select2-container').removeClass('select2-container--active')
        delete filters[filterGroup];
    }

    if (typeof (Storage) !== "undefined") {
        if (filters !== null)
        {
            localStorage.setItem("session_filter", JSON.stringify(filters));
        } else
        {
            localStorage.removeItem("lastname");
        }
    }

    runFilter()
});

function getFilterLen()
{
    var size = 0,
            key;
    for (key in filters) {
        if (filters.hasOwnProperty(key))
            size++;
    }
    return size;
}

function runFilter()
{
    var $grid = $('.tzportfolio-pages').isotope({
        itemSelector: '.element'
    });

    var filterValue = getComboFilter(filters);

    $grid.isotope({
        filter: filterValue
    });

    addTag(filterValue)


//    setTimeout(function () {
//        var height = $(".tzportfolio-pages").outerHeight();
//        if (height < 400)
//        {
//            page = page + 1;
//            getMorePosts(page)
//        }
//    }, 1000);


    return false;
}

/*
 * Method portfolio column
 * @variables Desktop
 * @variables tabletportrait
 * @variables mobilelandscape
 * @variables mobileportrait
 */
function tz_init(Desktop, tabletportrait, tabletportrait1, mobilelandscape, mobileportrait) {
    
    var contentWidth = jQuery('.tzportfolio-pages').width();
    var numberItem = 2;
    var newColWidth = 0;
    var featureColWidth = 0;
    var widthWindwow = jQuery(window).width();
    if (widthWindwow >= 1200) {
        numberItem = Desktop;
    } else if (widthWindwow >= 991) {
        numberItem = tabletportrait;
    } else if (widthWindwow >= 768) {
        numberItem = tabletportrait1;
    } else if (widthWindwow >= 480) {
        numberItem = mobilelandscape;
    } else if (widthWindwow < 480) {
        numberItem = mobileportrait;
    }

    newColWidth = Math.floor(contentWidth / numberItem);
    featureColWidth = newColWidth * 2;
    jQuery('.element').width(newColWidth);
    jQuery('.tz_feature_item').width(featureColWidth);
    var $container = jQuery('.tzportfolio-pages');
    $container.isotope({
        masonry: {
            columnWidth: newColWidth
        }
    });
    
    
    //TzTemplateResizeImage(jQuery('.tz-image-item'));
}

/*
 * Method reize
 */
jQuery(window).bind('load resize', function () {
    var $container = jQuery('.tzportfolio-pages');
    if (resizeTimer)
        clearTimeout(resizeTimer);
    resizeTimer = setTimeout("tz_init(Desktop, tabletportrait, tabletportrait1, mobilelandscape, mobileportrait)", 100);
});

/*
 * Method filter portfolio
 */
function loadPortfolio() {
    var $container = jQuery('.tzportfolio-pages');
    var $optionSets = jQuery('.tzfilter'),
            $optionLinks = $optionSets.find('a');
    $optionLinks.click(function (event) {
        event.preventDefault();
        var $this = jQuery(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.tzfilter');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');

        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;

        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            // changes in layout modes need extra logic
            changeLayoutMode($this, options);
        } else {
            // otherwise, apply new options
            $container.isotope(options);
        }
        //$container.isotope('layout');
        return false;
    });
    tz_init(Desktop, tabletportrait, tabletportrait1, mobilelandscape, mobileportrait);
}
jQuery(document).ready(function () {
    loadPortfolio();
});

function addTag(filterVal)
{
    var filter_array = new Array();
    var filterValue = filterVal.substr(1);
    filterValue = filterValue.replace(/,/g, "");
    filterValue = filterValue.replace(/\*/g, "");

    $('#tag_list').html('')

    if (filterValue !== '')
    {
        filterValue = filterValue.split(".")

        if (getFilterLen() > 0)
        {

            var arrayLength = filterValue.length;
            for (var i = 0; i < arrayLength; i++) {
                filterValue[i] = filterValue[i].trim()
                if (filterValue[i] != '' && $.inArray(filterValue[i], filter_array) == -1)
                {
                    //alert(filter_array)
                    //alert(filterValue[i])
                    filter_array.push(filterValue[i])
                    $('#tag_list').append('<li data-tag-value="' + filterValue[i] + '">' + filterValue[i] + ' <a href="javascript:void(0)"><img onclick="removeTag(&quot;.' + filterValue[i] + '&quot;)" src="assets/images/close-btn.png"></a></li>');

                }
            }
            $('#tag_list').slideDown(500)
        } else
        {
            $('#tag_list').slideUp(500)
        }
    } else
    {
        $('#tag_list').slideUp(500)
        $('#sub_filter_div').find('a.selected').removeClass('selected');
        $('#sub_filter_div').find('a:first').addClass('selected');
    }

//    if (filter_array.length > 0)
//    {
//        $('#tag_list').slideDown(1000)
//    }
//    else
//    {
//        $('#tag_list').slideUp(1000)
//    }
}

function removeTag(tagValue)
{
    tagValue = tagValue.replace(/,+$/, "");

    for (var f in filters) {
        if (filters[f] == tagValue)
        {
            addClass(f, tagValue)
            delete filters[f];
            continue;
        } else if (filters[f].indexOf(tagValue) > -1)
        {
            for (var f1 in filters[f]) {
                //alert(filters[f][f1])
                if (filters[f][f1] == tagValue) {

                    addClass(f, tagValue)

                    //filters[f] = removeObjectFromArray(filters[f], tagValue)
                    delete filters[f][f1];
                    for (var i = filters[f].length; i--; ) {
                        if (filters[f][i] === null || typeof filters[f][i] === 'undefined')
                        {
                            filters[f].splice(i, 1);
                        }
                    }
                    continue;
                }
            }
            continue;
        }
    }

    var filterValue = getComboFilter(filters);

    if (typeof (Storage) !== "undefined") {
        if (filters !== null)
        {
            localStorage.setItem("session_filter", JSON.stringify(filters));
        } else
        {
            localStorage.removeItem("lastname");
        }
    }

    $('.tzportfolio-pages').isotope({
        filter: filterValue
    });



    addTag(filterValue)

}