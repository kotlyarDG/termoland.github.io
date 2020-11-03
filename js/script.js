// Проверка, загрузилась ли страница
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.menu').toggleClass('_active')
		$('body').toggleClass('_lock')
	});

	$('.menu__item').click(function () {
		$('.header__burger,.menu').removeClass('_active')
	});


	(function () {
		let originalPositions = [];
		let daElements = document.querySelectorAll('[data-da]');
		let daElementsArray = [];
		let daMatchMedia = [];
		//Заполняем массивы
		if (daElements.length > 0) {
			let number = 0;
			for (let index = 0; index < daElements.length; index++) {
				const daElement = daElements[index];
				const daMove = daElement.getAttribute('data-da');
				if (daMove != '') {
					const daArray = daMove.split(',');
					const daPlace = daArray[1] ? daArray[1].trim() : 'last';
					const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
					const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
					const daDestination = document.querySelector('.' + daArray[0].trim())
					if (daArray.length > 0 && daDestination) {
						daElement.setAttribute('data-da-index', number);
						//Заполняем массив первоначальных позиций
						originalPositions[number] = {
							"parent": daElement.parentNode,
							"index": indexInParent(daElement)
						};
						//Заполняем массив элементов 
						daElementsArray[number] = {
							"element": daElement,
							"destination": document.querySelector('.' + daArray[0].trim()),
							"place": daPlace,
							"breakpoint": daBreakpoint,
							"type": daType
						}
						number++;
					}
				}
			}
			dynamicAdaptSort(daElementsArray);

			//Создаем события в точке брейкпоинта
			for (let index = 0; index < daElementsArray.length; index++) {
				const el = daElementsArray[index];
				const daBreakpoint = el.breakpoint;
				const daType = el.type;

				daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
				daMatchMedia[index].addListener(dynamicAdapt);
			}
		}
		//Основная функция
		function dynamicAdapt(e) {
			for (let index = 0; index < daElementsArray.length; index++) {
				const el = daElementsArray[index];
				const daElement = el.element;
				const daDestination = el.destination;
				const daPlace = el.place;
				const daBreakpoint = el.breakpoint;
				const daClassname = "_dynamic_adapt_" + daBreakpoint;

				if (daMatchMedia[index].matches) {
					//Перебрасываем элементы
					if (!daElement.classList.contains(daClassname)) {
						let actualIndex = indexOfElements(daDestination)[daPlace];
						if (daPlace === 'first') {
							actualIndex = indexOfElements(daDestination)[0];
						} else if (daPlace === 'last') {
							actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
						}
						daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
						daElement.classList.add(daClassname);
					}
				} else {
					//Возвращаем на место
					if (daElement.classList.contains(daClassname)) {
						dynamicAdaptBack(daElement);
						daElement.classList.remove(daClassname);
					}
				}
			}
			customAdapt();
		}

		//Вызов основной функции
		dynamicAdapt();

		//Функция возврата на место
		function dynamicAdaptBack(el) {
			const daIndex = el.getAttribute('data-da-index');
			const originalPlace = originalPositions[daIndex];
			const parentPlace = originalPlace['parent'];
			const indexPlace = originalPlace['index'];
			const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
			parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
		}
		//Функция получения индекса внутри родителя
		function indexInParent(el) {
			var children = Array.prototype.slice.call(el.parentNode.children);
			return children.indexOf(el);
		}
		//Функция получения массива индексов элементов внутри родителя 
		function indexOfElements(parent, back) {
			const children = parent.children;
			const childrenArray = [];
			for (let i = 0; i < children.length; i++) {
				const childrenElement = children[i];
				if (back) {
					childrenArray.push(i);
				} else {
					//Исключая перенесенный элемент
					if (childrenElement.getAttribute('data-da') == null) {
						childrenArray.push(i);
					}
				}
			}
			return childrenArray;
		}
		//Сортировка объекта
		function dynamicAdaptSort(arr) {
			arr.sort(function (a, b) {
				if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
			});
			arr.sort(function (a, b) {
				if (a.place > b.place) { return 1 } else { return -1 }
			});
		}
		//Дополнительные сценарии адаптации
		function customAdapt() {
			//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		}
	}());


	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');

	let unlock = true;

	// timeout - время анимации в css
	const timeout = 880;

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
				e.preventDefault();
			});
		}
	}

	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	function popupOpen(currentPopup) {
		if (currentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			currentPopup.classList.add('open');
			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			body.classList.remove('_lock');

		}
	}


	function bodyLock() {

		body.classList.add('_lock');

	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойства
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();


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

	// Функция для скролла по ссылке-якорю
	// вместо class-link - реальный класс ссылки-якоря
	// вместо slow - необходимую скорость
	$(document).on('click', '.class-link', function (e) {
		var linkID = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(linkID).offset().top
		}, 'slow');
		e.preventDefault();
	});

	AOS.init();

	if ($(window).width() <= 769) {
		$('.item-news__title').click(function (event) {
			$('.item-news__title').not($(this)).removeClass('_active');
			$('.item-news__text').not($(this).next()).slideUp(500);

			$(this).toggleClass('_active').next().slideToggle(500);
		});
	} else { }

	var aquaImg = $('.aqua__bg');
	$('.aqua__link-aqua--man').click(function () {
		aquaImg.attr('src', "images/system_img/aqua-zona/bg-man.png")
	});

	$('.aqua__link-aqua--woman').click(function () {
		aquaImg.attr('src', "images/system_img/aqua-zona/bg-woman.png")
	});

	if ($(window).width() <= 601) {
		aquaImg.attr('src', "images/system_img/aqua-zona/bg.png")
	} else { }



	$('.services__item').click(function () {

		if ($(window).width() > 990) {
			var item = $(this);

			if (item.hasClass('services__item_not-active')) {
				item.removeClass('services__item_not-active');
				item.addClass('services__item_active');
				$('.services__item').not($(this)).hide(250, function () {

					setTimeout(function () {
						item.next().show(250);
					}, 200);
				});


			}
			else {
				if (item.hasClass('services__item_active')) {
					item.removeClass('services__item_active');
					item.addClass('services__item_not-active');
					item.next().hide(250, function () {
						setTimeout(function () {
							$('.services__item').not(item).show(250);
						}, 200);
					});

					setTimeout(function () {
						$('.content-ticket--info').removeClass('_active');
						$('.content-ticket--main').addClass('_active');
					}, 500);

				}
			}

		}
		else {
			$('.test__item-content_active').not($(this).next()).slideUp(250);
			$('.test__item-content_active').not($(this).next()).removeClass('test__item-content_active');
			$(this).next().toggleClass('test__item-content_active');
			$(this).next().slideToggle(250);
			$('.content-ticket--info').removeClass('_active');
			$('.content-ticket--main').addClass('_active');

			setTimeout(function () {
				$('.content-ticket--info').removeClass('_active');
				$('.content-ticket--main').addClass('_active');
			}, 500);
		}

	});

	$('.item-ticket__btn-ticket').click(function (e) {
		$('.ticket--info').addClass('_active');
		$('.ticket--main').removeClass('_active');
		e.preventDefault();
	});

	$('.item-ticket__btn-spa').click(function (e) {
		$('.spa--info').addClass('_active');
		$('.spa--main').removeClass('_active');
		e.preventDefault();
	});

	$('.item-ticket__btn-steam').click(function (e) {
		$('.steam--info').addClass('_active');
		$('.steam--main').removeClass('_active');
		e.preventDefault();
	});

	$('.item-ticket__btn-package').click(function (e) {
		$('.package--info').addClass('_active');
		$('.package--main').removeClass('_active');
		e.preventDefault();
	});

	$('.content-ticket__btn-back--info-ticket').click(function (e) {
		$('.ticket--info').removeClass('_active');
		$('.ticket--main').addClass('_active');
		e.preventDefault();
	});

	$('.content-ticket__btn-back--info-spa').click(function (e) {
		$('.spa--info').removeClass('_active');
		$('.spa--main').addClass('_active');
		e.preventDefault();
	});

	$('.content-ticket__btn-back--info-steam').click(function (e) {
		$('.steam--info').removeClass('_active');
		$('.steam--main').addClass('_active');
		e.preventDefault();
	});

	$('.content-ticket__btn-back--info-package').click(function (e) {
		$('.package--info').removeClass('_active');
		$('.package--main').addClass('_active');
		e.preventDefault();
	});

	$('.content-ticket__btn-back--main').click(function (e) {
		e.preventDefault();
		if ($(window).width() > 990) {
			$('.services__item_active').addClass('services__item_not-active');
			$('.services__item_active').removeClass('services__item_active');

			$('.test__item-content').hide(250, function () {
				setTimeout(function () {
					$('.services__item').show(250);
				}, 200);
			});
		}
		else {
			$('.test__item-content_active').slideUp(250);
			$('.test__item-content_active').removeClass('test__item-content_active');
		}
	});
});	