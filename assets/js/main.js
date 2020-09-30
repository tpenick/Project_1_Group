/* =========================================
     main.js : Query items from Google and
     eBay using the Price Analytics API
   ========================================= */

var apiKey = "RGPt4OSKNihrl6gW8Aq2GOovrMG3X0di";
var price = "";

// Hide the loading animation, once the page is loaded
$(document).ready(function() {
	$("#loading").hide();
})

// Once the Search button is selected, clear the results field and call the Ajax query
$("#search-btn").click(function(e){
	e.preventDefault();
	var itemType = $("#itemType option:selected").val();
	if (itemType !== ""){
	$("#resultList1").empty();
	$("#resultList2").empty();
	callAjax();
	}else{
		alert("Please select an item.")
	}
});
  
// Main Ajax call function to Query Data 
function callAjax(itemType) {
	$("#loading").show();

	var itemType = $("#itemType option:selected").val();
	console.log(itemType);

	// Google settings
	var settings1 = {
		"async": true,
		"crossDomain": true,
		"url": "https://price-analytics.p.rapidapi.com/job",
		"method": "POST",
		"headers": {
			"x-rapidapi-host": "price-analytics.p.rapidapi.com",
			"x-rapidapi-key": "b6421f5bf7msh04ee4898aa6fa16p16b7c2jsn35ef522c4c45",
			"content-type": "application/x-www-form-urlencoded"
		},
		"data": {
			"source": "google",
			"key": "term",
			"country": "us",
			"values": itemType
		}
	}
   
	// eBay settings
	var settings2 = {
		"async": true,
		"crossDomain": true,
		"url": "https://price-analytics.p.rapidapi.com/job",
		"method": "POST",
		"headers": {
			"x-rapidapi-host": "price-analytics.p.rapidapi.com",
			"x-rapidapi-key": "b6421f5bf7msh04ee4898aa6fa16p16b7c2jsn35ef522c4c45",
			"content-type": "application/x-www-form-urlencoded"
		},
		"data": {
			"source": "ebay",
			"key": "term",
			"country": "us",
			"values": itemType
		}
	}
	
	// Google status
	var status1;

	// Query Data from Google for selected item type
	$.ajax(settings1).done(function (response1) {
		var settings1 = {
			"async": true,
			"crossDomain": true,
			"url": "https://price-analytics.p.rapidapi.com/job/" + response1.jobid,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "price-analytics.p.rapidapi.com",
				"x-rapidapi-key": "b6421f5bf7msh04ee4898aa6fa16p16b7c2jsn35ef522c4c45"
			}
		}

		// Continue calling Ajax for Google data every 5 seconds if the status is not finished
		const intervalHandler1 = setInterval(function() {
			$.ajax(settings1).done(function (response1) {
				if (response1.status === "finished") {
					clearInterval(intervalHandler1);

					console.log(response1);
					console.log(response1.status);
					status1 = response1.status1;

					var itemResultPath1 = response1.results[0].content.offers;
				
					// Display the retrieved data as buttons in a list and link them to the item source
					itemResultPath1.forEach(function(item1) {
						var btnLabel1 = item1.name + "  Price: $" + item1.price;
						var resultBtns1 = $('<a class="button" href="' + item1.url + '" style=" width: 100%; text-align: left; margin-top: 2px; margin-bottom: 2px;" target = "_blank">' + btnLabel1 + '</a>');
						$("#resultList1").append(resultBtns1);

					});

					$("#loading").hide();
				}
			});
		}, 5000);
	});

	// eBay status
	var status2;

	// Query Data from eBay for selected item type
	$.ajax(settings2).done(function (response2) {
		var settings2 = {
			"async": true,
			"crossDomain": true,
			"url": "https://price-analytics.p.rapidapi.com/job/" + response2.jobid,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "price-analytics.p.rapidapi.com",
				"x-rapidapi-key": "b6421f5bf7msh04ee4898aa6fa16p16b7c2jsn35ef522c4c45"
			}
		}

        // Continue calling Ajax for eBay data every 5 seconds if the status is not finished
		const intervalHandler2 = setInterval(function() {
			$.ajax(settings2).done(function (response2) {
				if (response2.status === "finished") {
					clearInterval(intervalHandler2);

					console.log(response2);
					console.log(response2.status);
					status2 = response2.status2;

					var itemResultPath2 = response2.results[0].content;
				
					itemResultPath2.forEach(function(item2) {
						var btnLabel2 = item2.name + "  Price: $" + item2.price;
						var resultBtns2 = $('<a class="button" href="' + item2.url + '" style=" width: 100%; text-align: left; margin-top: 2px; margin-bottom: 2px;" target = "_blank">' + btnLabel2 + '</a>');
						$("#resultList2").append(resultBtns2);

					});

					$("#loading").hide(); // Hide the loading animation once the status is finished
				}
			});
		}, 5000);
		
	});

	return status1, status2; // Return the Ajax status for both Google and eBay
	
}