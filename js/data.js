// Проверка, загрузилась ли страница
$(document).ready(function () {

	Sales = [];
	Events = [];
	News = [];

	getEvents();
	getSales();
	getNews();


	getBlockById(1);
	getBlockById(2);
	getBlockById(3);
	getBlockById(4);


	function openSaleModal(sale) {
		console.log("Open sale = ", sale);
		$('#sales-popup-img').attr('src', sale.image);
		$('#sales-popup-title').text(sale.name);
		$('#sales-popup-description').text(sale.description);
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