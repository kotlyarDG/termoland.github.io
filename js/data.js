// Проверка, загрузилась ли страница
$(document).ready(function () {
	
	getEvents();
	getSales();
	getNews();


	getBlockById(1);
	getBlockById(2);
	getBlockById(3);
	getBlockById(4);


	function getEvents() {
		$.ajax({
            type: "GET",
            url: 'https://termoland.herokuapp.com/v1/events/list',
            success: function(data){
				console.log("Events = ", data)
            },
            error: function(errMsg) {
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
            success: function(data){
                console.log("Sales = ", data)
                
                for(let item of data) {
                    $(".shares__slider").append(
                        `<a href="#first-share" class="shares__img popup-link">
                            <img src="${item['image']}" alt="">
                        </a>`
                    );
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
            error: function(errMsg) {
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
            success: function(data){
				console.log("News = ", data)
            },
            error: function(errMsg) {
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
            success: function(data){
				console.log(data)
            },
            error: function(errMsg) {
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
            success: function(res){
                
            },
            error: function(errMsg) {
                console.log("Error: ", errMsg)
               
            },
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });
	}

	
});