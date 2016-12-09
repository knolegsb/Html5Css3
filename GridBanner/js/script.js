$(document).ready(function () {

    function loadImg() {
        var $images = $('.content img'), 
        count = $images.length;         

        $images.load(function () {
            count--;
            if (!count) {                
                executeItemList();
                executeLoopBanner();
            }
        });
    }
   
    function executeItemList() {
        var $items = $('.content>li:not(.center_content)'),
            slide_left = $items.eq(0).width() * -1;
        
        function playItemAnimate() {
            var ROTATE_DURATION = 500,      
                PERSPECTIVE = 700,          
                FRONT_EASE = "easeInQuad",  
                BACK_EASE = "easeOutQuad",  
                DELAY_TIME = 150,           

                aniCount = $items.length;   

            $.each($items, function (index, target) {                
                $(this).delay(index * DELAY_TIME).prop({ "tempRotateY": 180 }).animate({ "tempRotateY": 90 }, {
                    duration: ROTATE_DURATION, easing: FRONT_EASE,
                    step: function (y) {
                        var tf = "perspective(" + PERSPECTIVE + ") rotateY(" + y + "deg)"
                        $(this).css('transform', tf);
                    },

                    complete: function () {                        
                        var $this = $(this);
                        $this.animate({ "tempRotateY": 0 }, {
                            duration: ROTATE_DURATION, easing: BACK_EASE,
                            step: function (y) {
                                $this.find('.image').removeClass('none');
                                var tf = "perspective(" + PERSPECTIVE + ") rotateY(" + y + "deg)"
                                $this.css('transform', tf);
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

        }//playItemAnimate
        
        function addEvent() {
            var $itemContain = $('.content'),
                SLIDE_DURATION = 400;
    
            $itemContain.on('mouseenter', 'li:not(.center_content)', function () {
                $(this).children().stop().animate({ left: '0px' }, SLIDE_DURATION);
            });

            $itemContain.on('mouseleave', 'li:not(.center_content)', function () {
                $(this).children().stop().animate({ left: slide_left }, SLIDE_DURATION);
            });
        }//addEvent

        playItemAnimate();

    }//executeItemList
  
    function executeLoopBanner() {
        var DURATION = 500,         
            EASE = 'easeOutQuad',   
            INTERVAL_TIME = 1500,   
            DELAY_TIME = 1500,      

            currentIndex = 0,       
            $contain = $('.center_content ul'), 
            loopList = $contain.children('li'), 
            totalIndex = loopList.length - 1,   

            next_top,   
            prev_top;   

        $contain.removeClass('none');

        next_top = $contain.height();
        prev_top = next_top * -1;

        function fadeInEffect() {
            $contain.css('opacity', 0);
            $contain.delay(DELAY_TIME).animate({ 'opacity': 1 }, DURATION, executeLoop);
        }
        
        function executeLoop() {            
            setInterval(function () {
                var nextItem,
                nextIndex = currentIndex + 1;

                if (nextIndex > totalIndex) {
                    nextIndex = 0;
                }

                currentItem = loopList.eq(currentIndex);
                nextItem = loopList.eq(nextIndex);

                slideContent(currentItem, nextItem);

                currentIndex = nextIndex;

            }, INTERVAL_TIME);

        }   
        
        function slideContent($currentItem, $nextItem) {            
            $nextItem.removeClass('none');           
            $nextItem.css('top', next_top);
            $nextItem.animate({ top: '0px' }, DURATION, EASE);

            $currentItem.animate({ top: prev_top }, DURATION, EASE, function () {
                $(this).addClass('none');
            });
        }//slideContent

        fadeInEffect();

    }//executeLoopBanner

    loadImg();

});