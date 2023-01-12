$(document).ready(function () {
	initImgReplace();
	initSlider();
	initScrollTop();
});
function initImgReplace() {
	'use strict;';
	$('.design__img, .reviews__section').each(function () {
		let imgHolder = $(this),
			img = imgHolder.find('img'),
			imgSrc = img.attr('src');
		if (!!imgHolder.length && !!img.length && !!imgSrc) {
			imgHolder.css({
				backgroundImage: `url(${imgSrc})`,
				backgroundSize: 'cover',
				backgroundPosition: '50% 50%',
				backgroundRepeat: 'no-repeat',
				height: '746',
			});
			img.remove();
		}
	});
}
function initSlider() {
	'use strict;';
	$('.slider__list, .risk__list.slider').slick({
		arrows: false,
		dots: false,
		draggable: true,
		centerMode: true,
		infinite: true,
		centerPadding: '300px',
		slidesToShow: 1,
		speed: 500,
	});
}
function initScrollTop() {
	'use strict;';
	$('.vertical__button').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}
