$(document).ready(function () {
	initImgReplace();
	initSlider();
	initScrollTop();
});
function initImgReplace() {
	'use strict;';
	$('.design__img').each(function () {
		let imgHolder = $(this),
			img = imgHolder.find('img'),
			imgSrc = img.attr('src');
		if (!!imgHolder.length && !!img.length && !!imgSrc) {
			imgHolder.css({
				backgroundImage: 'url(' + imgSrc + ')',
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
	$('.browsers.list').slick({
		centerMode: true,
		infinite: true,
		centerPadding: '350px',
		slidesToShow: 1,
		speed: 500,
	});
}

function initScrollTop() {
	$('.vertical__button').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}
