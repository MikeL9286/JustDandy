
(function LoadPartialViews() {
	$('div#portalContainer').load('views/Portals.html');
	$('div#slideshowContainer').load('views/SlideShow.html');
	Slideshow.Start();
})();