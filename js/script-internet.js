$(document).ready(function () {
	// Скрипт для фильтрации по кнопке с классом filter__btn
	var cat = $('.active-filter').data('filter');
	$('.filter__item').hide();
	$('.filter__item.f_' + cat).show();

	$('.filter__btn').click(function (event) {
		cat = $(this).data('filter');
		event.preventDefault();

		// Присвоение ссылке класса active-filter
		$('.filter__btn.active-filter').removeClass('active-filter')
		$(this).addClass('active-filter')

		// При категории 1 - показывает все элементы с классом filter__item
		// В ином случае показывает элементы с классом f_ + номер категории

		$('.filter__item').hide();
		$('.filter__item.f_' + cat).show();


	});
});