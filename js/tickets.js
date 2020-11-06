$(document).ready(function () {

	var Sum = 0.0;
	var Title = "";

	$('.item-ticket__btn').click(function (e) {
		$('.content-ticket--info').addClass('_active');
		$('.content-ticket--main').removeClass('_active');
		Sum = $(this).closest('.item-ticket__body').children('.item-ticket__price').children('.price').text()
		Title = $(this).closest('.item-ticket').children('.item-ticket__info').children('.item-ticket__title').text()
		e.preventDefault();
	});

	$('.content-ticket__btn-back--info').click(function (e) {
		$('.content-ticket--info').removeClass('_active');
		$('.content-ticket--main').addClass('_active');
		e.preventDefault();
	});


	$('.form-ticket__btn__pay').click(function (e) {
		e.preventDefault();
		let fio = $("#fio").val();
		let phone = $("#phone").val();
		let date = $("#date").val();
		let time = $("#time").val();
		let master = $("#master option:selected").text();
		console.log(master)
		let sum = Sum;
		let title = Title;
		let message = `${title} ${fio} ${phone} ${date ? date : ''} ${time ? time : ''} ${master ? master : ''}`;
		ipayCheckout({
			amount: sum,
			currency: 'RUB',
			order_number: '',
			description: message},
			function(order) { showSuccessfulPurchase(order) },
			function(order) { showFailurefulPurchase(order) });
	});

});