$(document).ready(function () {
    var $items = $('.content > li:not(.center_content)');

    //$items.animate({ "tempRotateY": 180 }, {
    //    duration: 1000, easing: "easeOutQuad", step: function (now) {
    //        $(this).css('transform', "rotateY(" + now + "deg)");
    //    }
    //});

    $.each($items, function (index, target) {
        $(this).delay(index * 150).prop({ "tempRotateY": 180 }).animate({ "tempRotateY": 90 }, {
            duration: 500, easing: "easeInQuad", step: function (y) {
                $(this).css('transform', "perspective(700) rotateY(" + y + "deg)");
            },
    //    })
    //})
    //$items.prop({ "tempRotateY": 180 }).animate({ "tempRotateY": 90 }, {
    //    duration: 500, easing: "easeInQuad", step: function (y) {
    //        $(this).css('transform', "rotateY(" + y + "deg)");
    //    },

        complete: function () {
            $(this).find('.image').removeClass('none');
            $(this).animate({ "tempRotateY": 0 }, {
                duration: 500, easing: "easeOutQuad", step: function (y) {
                    $(this).css('transform', "rotateY(" + y + "deg)");
                }
            });
        
    });
});