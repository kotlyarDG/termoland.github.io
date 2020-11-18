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
            "base_pass_id": 28,
            "referrer": "web",
            "standard_fields": [  
                { 
                    "id": "0", 
                    "value": $('#first_name').val()
                },
                {
                    "id":"1",
                    "value": $('#last_name').val()
                },
                {
                    "id":"2",
                    "value": $('#email').val()
                },
                {
                    "id":"3",
                    "value": $('#instagram').val()
                },
                {
                    "id":"4",
                    "value":$('#phone').val()
                }
            ],
            "custom_fields": [
                {
                    "id":"0", "value":$('#position').val()
                }
            ]
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