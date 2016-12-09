
$(document).ready(function () {
    var $images = $('.content img'),
        count = $images.length;

    $images.load(function () {
        count--;
        if (!count) {
            executeContent();
        }
    })

    function executeContent() {
        var $items = $('.content > li:not(.center_content)');

        var aniCount = $items.length;

        $.each($items, function (index, target) {
            $(this).delay(index * 150).prop({ "tempRotateY": 180 }).animate({ "tempRotateY": 90 }, {
                duration: 500, easing: "easeInQuad",
                step: function (y) {
                    $(this).css('transform', "perspective(700) rotateY(" + y + "deg)");
                },

                complete: function () {
                    $(this).find('.image').removeClass('none');

                    $(this).animate({ "tempRotateY": 0 }, {
                        duration: 500, easing: "easeOutQuad",
                        step: function (y) {
                            $(this).css('transform', "perspective(700) rotateY(" + y + "deg)");
                        },
                        complete: function () {
                            aniCount--;
                            if (!aniCount) {
                                addEvent();
                            }
                        }
                    });
                }
            });
        });

        function addEvent() {
            $('.content').on('mouseenter', 'li:not(.center_content)', function () {
                $(this).children().stop().animate({ left: '0px' }, 500);
            });

            $('.content').on('mouseleave', 'li:not(.center_content)', function () {
                $(this).children().stop().animate({ left: '-200px' }, 500);
            });
        }        

        /**
         * slide banner 
         **/

        var $contain = $('.center_content ul'),
            loopList = $contain.children('li'),
            currentIndex = 0,
            totalIndex = loopList.length,
            next_top = $contain.height(),
            prev_top = next_top * -1;

        $contain.removeClass('none').css('opacity', 0);
        $contain.delay(1500).animate({ 'opacity': 1 }, 500, function () {
            setInterval(function () {
                var $currentItem,
                    $nextItem,
                    nextIndex = currentIndex + 1;

                if (nextIndex == totalIndex) {
                    nextIndex = 0;
                }

                $currentItem = loopList.eq(currentIndex);
                $nextItem = loopList.eq(nextIndex);

                $nextItem.removeClass('none');
                $nextItem.css('top', next_top);

                $currentItem.animate({ top: prev_top }, 500, 'easeOutQuad', function () {
                    $(this).addClass('none');
                });

                $nextItem.animate({ top: '0px' }, 500, 'easeOutQuad');
                currentIndex = nextIndex;
            }, 1500);
        });        
    }
});

