(function (Slideshow, $, undefined) {

    /*** Private properties ***/

    var delayTime = 4000;
    var slideTimer;
    var currentSlide;
    var nextSlide;

    /*** Public methods ***/

    Slideshow.Start = function () {
        slideTimer = window.setInterval(function () {
            Slideshow.InitSlide(null)
        }, delayTime);
    }

    Slideshow.Stop = function () {
        clearInterval(slideTimer);
    }

    Slideshow.InitSlide = function (targetSlideId) {
        //Unbind the onclick event for each blob during transition
        $('ul.SlideBlobs li').each(function () {
            $(this).removeAttr('onclick');
        });

        currentSlide = $('.SlideContainer div.live');

        //Make sure the user didn't click on the live slide
        if (targetSlideId != currentSlide.attr('id')) {
            nextSlide = GetNextSlide(targetSlideId);

            ChangeSlide();
            ChangeBlob();

            //Execute final steps after animation finishes
            setTimeout(FinishSlide, 1000);
        }
    }

/*** Private methods ***/

    function SlideLeft() {
        nextSlide.attr('class', 'live');
        currentSlide.attr('class', 'slideLeft');
    }

    function SlideRight() {
        nextSlide.attr('class', 'slideLeftQuick');
        //setTimeout is needed so the animations will execute correctly
        setTimeout(function () {
            nextSlide.attr('class', 'live');
            currentSlide.attr('class', 'slideRight');
        }, 100);
    }

    function FinishSlide() {
        currentSlide.removeAttr('class');

        //Rebind the onclick event for each blob after transition
        $('ul.SlideBlobs li').each(function () {
            $(this).attr('onclick', 'Slideshow.InitSlide($(this).attr("data-slideFor"))');
        });
    }

    function ChangeSlide() {
        //If the next slide is positioned before the live slide
        if (nextSlide.attr('id') < currentSlide.attr('id')) {
            SlideRight();
        }
        else {
            SlideLeft();
        }
    }

    function GetNextSlide(targetSlideId) {
        //If method was invoked by a click event...
        if (targetSlideId != null) {
            Slideshow.Stop();
            Slideshow.Start();
            return $('.SlideContainer div#' + targetSlideId);
        }
        //Else it was invoked by the timer...
        else {
            nextSlide = $('.SlideContainer div.live + div');

            //If the slideshow has passed the end of the slide list, loop back to 1st slide
            if (nextSlide.length == 0)
                return $('.SlideContainer div.live').closest('.SlideContainer').find('div:first-child');

            return nextSlide;
        }
    }

    function ChangeBlob() {
        $('.SlideBlobs li[data-slideFor=' + currentSlide.attr('id') + ']').removeAttr('style');
        $('.SlideBlobs li[data-slideFor=' + nextSlide.attr('id') + ']').attr('style', 'background-color:#f9bac3');
    }

} (window.Slideshow = window.Slideshow || {}, jQuery))