$(document).ready(function () {

	$('.item-ticket__btn').click(function (e) {
		$('.content-ticket--info').addClass('_active');
		$('.content-ticket--main').removeClass('_active');
		e.preventDefault();
	});

	$('.content-ticket__btn-back--info').click(function (e) {
		$('.content-ticket--info').removeClass('_active');
		$('.content-ticket--main').addClass('_active');
		e.preventDefault();
	});
});