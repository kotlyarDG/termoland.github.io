// Проверка, загрузилась ли страница
$(document).ready(function () {

	Sales = [];
	Events = [];
	News = [];

	getEvents();
	getSales();
	getNews();

	// getSteam();

	getBlockById(1);
	getBlockById(2);
	getBlockById(3);
	getBlockById(4);

	function openSaleModal(sale) {
		console.log("Open sale = ", sale);
		$('#sales-popup-img').attr('src', sale.image);
		$('#sales-popup-title').text(sale.name);
		$('#sales-popup-description').text(sale.description);
		$('#sales-popup-limits').text(sale.limits);
		$('#sales-popup').addClass('open');

		$('#sales-popup').click(function (e) {
			if (!e.target.closest('.popup__content')) {
				$('#sales-popup').removeClass('open');
			}
		});
	}

	function openNewsModal(newsItem) {
		console.log("Open new = ", newsItem);
		$('#news-popup-img').attr('src', newsItem.image);
		$('#news-popup-title').text(newsItem.name);
		$('#news-popup-description').text(newsItem.text);
		$('#news-popup').addClass('open');

		$('#news-popup').click(function (e) {
			if (!e.target.closest('.popup__content')) {
				$('#news-popup').removeClass('open');
			}
		});
	}


	function getEvents() {
		$.ajax({
			type: "GET",
			url: 'https://termoland.herokuapp.com/v1/events/list',
			success: function (data) {
				console.log("Events = ", data)

				Events = data;

				for (let item of Events) {
					$(".second-slider").append(
						`<div class="second-slider__slide" data-id="${item['id']}">
						<div class="slide-second__wrapper">
							<div class="slide-second__info">
								<p class="slide-second__title">${item['name']}</p>
								<p class="slide-second__text">${item['description']}</p>
							</div>
							<div class="slide-second__img">
								<img src="${item['image']}" alt="">
							</div>
						</div>
					</div>`
					);

					$(".buttons-slider").append(
						`<div class="second-slider__button button-second" data-id="${item['id']}">
						<div class="button-second__img"><img src="${item['image']}" alt="">
						</div>
						<p class="button-second__date">${item['date']}</p>
						<p class="button-second__name">“${item['name']}”</p>
					</div>`
					);
				}

				$('.second-slider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					asNavFor: '.buttons-slider',
					responsive: [
						{
							breakpoint: 769,
							settings: {
								arrows: true,
								adaptiveHeight: true,
							}
						}
					]
				});

				$('.buttons-slider').slick({
					slidesToShow: 4,
					asNavFor: '.second-slider',
					focusOnSelect: true,
					arrows: true,

					responsive: [
						{
							breakpoint: 1281,
							settings: {
								slidesToShow: 3,
								asNavFor: '.second-slider',
								focusOnSelect: true,
								arrows: true
							}
						},
						{
							breakpoint: 991,
							settings: {
								slidesToShow: 2,
								asNavFor: '.second-slider',
								focusOnSelect: true,
								arrows: true
							}
						},
						{
							breakpoint: 769,
							settings: {
								slidesToShow: 1,
								asNavFor: '.second-slider',
								focusOnSelect: true,
								arrows: true
							}
						}
					]
				});
			},
			error: function (errMsg) {
				console.log("Error: ", errMsg)
			},
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});
	}

	function getSales() {
		$.ajax({
			type: "GET",
			url: 'https://termoland.herokuapp.com/v1/sales/list',
			success: function (data) {
				console.log("Sales = ", data)

				Sales = data;

				for (let item of Sales) {
					$(".shares__slider").append(
						`<p class="shares__img popup-sale-link" data-id="${item['id']}">
									<img src="${item['image']}" alt="">
							  </p>`
					);
				}

				const popupLinks = document.querySelectorAll('.popup-sale-link');
				if (popupLinks.length > 0) {
					for (let index = 0; index < popupLinks.length; index++) {
						const popupLink = popupLinks[index];
						popupLink.addEventListener("click", function (e) {
							const popupId = +popupLink.getAttribute('data-id');
							const sale = Sales.find(el => el.id == popupId);
							openSaleModal(sale)
							e.preventDefault();
						});
					}
				}


				$('.shares__slider').slick({
					arrows: true,
					slidesToShow: 1,
					infinite: true,
					centerMode: true,
					centerPadding: '30%',
					autoplay: true,
					autoplaySpeed: 10000,
					speed: 1000,
					responsive: [
						{
							breakpoint: 769,
							settings: {
								arrows: true,
								centerMode: true,
								centerPadding: '0',
								slidesToShow: 1
							}
						}
					]
				});
			},
			error: function (errMsg) {
				console.log("Error: ", errMsg)
			},
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});
	}

	function getNews() {
		$.ajax({
			type: "GET",
			url: 'https://termoland.herokuapp.com/v1/news/list',
			success: function (data) {
				console.log("News = ", data)

				News = data;

				for (let item of News) {
					if (item['id'] == 1) {
						$("#news__row-1").append(
							`<div class="news__item item-news item-news--big">
							<div class="item-news__img">
								<img src="${item['image']}" alt="">
							</div>
							<div class="item-news__body item-news__body--big">
								<p class="item-news__title popup-news-link" data-id="${item['id']}">${item['name']}</p>

								<p class="item-news__text item-news__text--big">${item['text']}</p>
								<p class="item-news__big-link popup-news-link" data-id="${item['id']}">*читать еще*</p>
							</div>
						</div>`
						);
					} else {
						$("#news__row-2").append(
							`<div class="news__item item-news">
							<div class="item-news__img">
								<img src="${item['image']}" alt="">
							</div>
							<div class="item-news__body">
								<p class="item-news__title popup-news-link" data-id="${item['id']}">${item['name']}</p>

								<p class="item-news__text">${item['text']}</p>
							</div>
						</div>`
						);
					}
				}

				if ($(window).width() > 1336) {
					const popupLinks = document.querySelectorAll('.popup-news-link');
					if (popupLinks.length > 0) {
						for (let index = 0; index < popupLinks.length; index++) {
							const popupLink = popupLinks[index];
							popupLink.addEventListener("click", function (e) {
								const popupId = +popupLink.getAttribute('data-id');
								const newsItem = News.find(el => el.id == popupId);
								openNewsModal(newsItem)
								e.preventDefault();
							});
						}
					}

				} else {
					$('.item-news__title').click(function (event) {
						$('.item-news__title').not($(this)).removeClass('_active');
						$('.item-news__text').not($(this).next()).slideUp(500);

						$(this).toggleClass('_active').next().slideToggle(500);
					});
				}
			},
			error: function (errMsg) {
				console.log("Error: ", errMsg)
			},
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});
	}

	function getBlockById(id) {
		$.ajax({
			type: "GET",
			url: `https://termoland.herokuapp.com/v1/block/${id}`,
			success: function (data) {
				console.log(data)

				Items = data;
				// Tickets
				if (id == 1) {

					for (let item of Items['categories']) {
						$('.ticket-main__items').append(
							`
							<div class="item-ticket__info">
								<p class="item-ticket__name">${item['name']}</p>
							</div>
							`
						);

						for (let i of item['services']) {
							$('.ticket-main__items').append(
								`
									<div class="content-ticket__item item-ticket">
										<div class="item-ticket__info">
											<p class="item-ticket__name item-ticket__title">${i['name']}</p>
											<p class="item-ticket__text">${i['description']}</p>
										</div>
										<div class="item-ticket__body">
											<p class="item-ticket__price"><span class="price">${i['price']}</span> ₽</p>
											<p	class="item-ticket__btn btn item-ticket__btn-ticket">заказать</p>
										</div>
									</div>
								`
							);
						}
					}

					$('.item-ticket__btn-ticket').click(function (e) {
						$('.ticket--info').addClass('_active');
						$('.ticket--main').removeClass('_active');
						Sum = $(this).closest('.item-ticket__body').children('.item-ticket__price').children('.price').text()
						Title = $(this).closest('.item-ticket').children('.item-ticket__info').children('.item-ticket__title').text()
						e.preventDefault();
					});
				}

				if (id == 2) {
					itemsSpa = Items['categories']
					for (let item of itemsSpa) {
						$('.spa-main__items').append(
							`
							<div class="item-ticket__info">
								<p class="item-ticket__name">${item['name']}</p>
							</div>
							`
						);

						for (let i of item['services']) {
							$('.spa-main__items').append(
								`
									<div class="content-ticket__item item-ticket">
										<div class="item-ticket__info">
											<p class="item-ticket__name item-ticket__title">${i['name']}</p>
											<p class="item-ticket__text">${i['description']}</p>
										</div>
										<div class="item-ticket__body">
											<p class="item-ticket__price"><span class="price">${i['price']}</span> ₽</p>
											<p	class="item-ticket__btn btn item-ticket__btn-spa" data-category="${i['category_id']}" data-master="${i['id']}">заказать</p>
										</div>
									</div>
								`
							);
						}
					}

					$('.item-ticket__btn-spa').click(function (e) {
						$('.option-spa').remove()
						var idM = $(this).attr("data-master")
						var idC = $(this).attr("data-category")
						var masters = itemsSpa.find(x => x.id == idC).services.find(x => x.id == idM).masters
						if (masters.length == 0) {
							$('.spa-select').hide()
							$('.spa-select__label').hide()
						} else {
							$('.spa-select').show()
							$('.spa-select__label').show()
							for (master of masters) {
								$('.spa-select').append(
									`
										<option class="option-spa" value="${master['id']}">${master['name']}</option>
									`
								);
							}
						}

						$('.spa--info').addClass('_active');
						$('.spa--main').removeClass('_active');
						Sum = $(this).closest('.item-ticket__body').children('.item-ticket__price').children('.price').text()
						Title = $(this).closest('.item-ticket').children('.item-ticket__info').children('.item-ticket__title').text()
						e.preventDefault();
					});
				}

				if (id == 3) {
					itemsSteam = Items['categories']
					for (let item of itemsSteam) {
						$('.steam-main__items').append(
							`
							<div class="item-ticket__info">
								<p class="item-ticket__name">${item['name']}</p>
							</div>
							`
						);

						for (let i of item['services']) {
							$('.steam-main__items').append(
								`
									<div class="content-ticket__item item-ticket">
										<div class="item-ticket__info">
											<p class="item-ticket__name item-ticket__title">${i['name']}</p>
											<p class="item-ticket__text">${i['description']}</p>
										</div>
										<div class="item-ticket__body">
											<p class="item-ticket__price"><span class="price">${i['price']}</span> ₽</p>
											<p	class="item-ticket__btn btn item-ticket__btn-steam" data-category="${i['category_id']}" data-master="${i['id']}">заказать</p>
										</div>
									</div>
								`
							);
						}
					}
					$('.item-ticket__btn-steam').click(function (e) {
						$('.option-steam').remove()

						var idM = $(this).attr("data-master")
						var idC = $(this).attr("data-category")
						var masters = itemsSteam.find(x => x.id == idC).services.find(x => x.id == idM).masters
						if (masters.length == 0) {
							$('.spa-select').hide()
							$('.spa-select__label').hide()
						} else {
							$('.spa-select').show()
							$('.spa-select__label').show()
							for (master of masters) {
								$('.steam-select').append(
									`
									<option class="option-steam" value="${master['id']}">${master['name']}</option>
								`
								);
							}
						}
						$('.steam--info').addClass('_active');
						$('.steam--main').removeClass('_active');
						Sum = $(this).closest('.item-ticket__body').children('.item-ticket__price').children('.price').text()
						Title = $(this).closest('.item-ticket').children('.item-ticket__info').children('.item-ticket__title').text()
						e.preventDefault();
					});
				}

				if (id == 4) {

					for (let item of Items['categories']) {


						for (let i of item['services']) {
							$('.package-main__items').append(
								`
									<div class="content-ticket__item item-ticket">
										<div class="item-ticket__info">
											<p class="item-ticket__name item-ticket__title">${i['name']}</p>
											<p class="item-ticket__text">${i['description']}</p>
										</div>
										<div class="item-ticket__body">
											<p class="item-ticket__price"><span class="price">${i['price']}</span> ₽</p>
											<p	class="item-ticket__btn btn item-ticket__btn-package">заказать</p>
										</div>
									</div>
								`
							);
						}
					}

					$('.item-ticket__btn-package').click(function (e) {
						$('.package--info').addClass('_active');
						$('.package--main').removeClass('_active');
						Sum = $(this).closest('.item-ticket__body').children('.item-ticket__price').children('.price').text()
						Title = $(this).closest('.item-ticket').children('.item-ticket__info').children('.item-ticket__title').text()
						e.preventDefault();
					});
				}

				$('.form-ticket__btn__pay-max').click(function (e) {
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
						description: message
					},
						function (order) { sendEmail(message); showSuccessfulPurchase(order); },
						function (order) { showFailurefulPurchase(order) });
				});

				$('.form-ticket__btn__pay-min').click(function (e) {
					e.preventDefault();
					let fio = $("#fio").val();
					let phone = $("#phone").val();
					let sum = Sum;
					let title = Title;
					let message = `${title} ${fio} ${phone} `;
					ipayCheckout({
						amount: sum,
						currency: 'RUB',
						order_number: '',
						description: message
					},
						function (order) { sendEmail(message); showSuccessfulPurchase(order) },
						function (order) { showFailurefulPurchase(order) });
				});
			},
			error: function (errMsg) {
				console.log("Error: ", errMsg)
			},
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});
	}






	function addOrder() {

		var data =
		{
			"name": $('#name').val(),
			"phone": $('#phone').val(),
			"service_id": $('#service_id').val(),
			"master_id": $('#master_id').val(),
			"date": $('#date').val(),
			"time": $('#time').val(),
		};
		$.ajax({
			type: "POST",
			url: 'https://paywallethead.herokuapp.com/api/v1/add_client/apple',
			success: function (res) {

			},
			error: function (errMsg) {
				console.log("Error: ", errMsg)

			},
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
		});
	}


});