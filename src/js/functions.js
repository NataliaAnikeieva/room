$(document).ready(function () {
	initImgReplace();
	initSlider();
	initScrollTop();
	initMobileMenu();
	initMobileFooter();
});
function initImgReplace() {
	'use strict;';
	$('.design__img, .reviews__section').each(function () {
		let imgHolder = $(this),
			img = imgHolder.find('.img'),
			imgSrc = img.attr('src');
		if (!!imgHolder.length && !!img.length && !!imgSrc) {
			imgHolder.css({
				backgroundImage: `url(${imgSrc})`,
				backgroundSize: 'cover',
				backgroundPosition: '50% 50%',
				backgroundRepeat: 'no-repeat',
			});
			img.remove();
		}
	});
}
function initSlider() {
	'use strict;';
	$('.risk__list.slider').slick({
		arrows: true,
		dots: false,
		draggable: true,
		centerMode: true,
		infinite: true,
		centerPadding: '300px',
		slidesToShow: 1,
		speed: 500,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					centerPadding: '0',
				},
			},
		],
	});
	$('.slider__list').slick({
		arrows: true,
		dots: true,
		draggable: true,
		centerMode: true,
		infinite: true,
		centerPadding: '300px',
		slidesToShow: 1,
		speed: 500,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					centerPadding: '0',
				},
			},
		],
	});
}
function initScrollTop() {
	'use strict;';
	$('.vertical__button').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}
function initMobileMenu() {
	'use strict;';
	let navigation = $('.navigation__list'),
		hamburger = $('.hamburger');
	if (hamburger.length) {
		hamburger.on({
			click: function () {
				$(this).toggleClass('open');
				navigation.toggleClass('active');
			},
		});
	}
}
function initMobileFooter() {
	let column = $('.footer__column.mobile'),
		columntItem = column.find('div'),
		columnTitle = columntItem.find('.footer__title');

	columnTitle.on({
		click: function () {
			$(this).parent().toggleClass('open').siblings().removeClass('open');
		},
	});
}
