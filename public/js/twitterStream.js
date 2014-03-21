function initialize() {
	
	// Create FME Server JavaScript API
	fmeserver = new FMEServer("fmepedia2014-safe-software.fmecloud.com", "b442e0b8ea9f85c1860ee85d8c6709d36ab40bb4");

	//Setup Google Map
	var myLatlng = new google.maps.LatLng(17.7850,-12.4183);
	var light_grey_style = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
	var myOptions = {
		zoom: 2,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.LEFT_BOTTOM
		},
		styles: light_grey_style
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	//Setup heat map and link to Twitter array we will append data to
	var heatmap;
	var liveTweets = new google.maps.MVCArray();
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: liveTweets,
		radius: 25
	});
	heatmap.setMap(map);

	// Storage for WebSocket connections
	var socket = io.connect('/');
	
  //Listen on socket for tweets.
	socket.on('twitter-stream', function (data) {

    //Add tweet to the heat map array.
		var tweetLocation = new google.maps.LatLng(data.lng,data.lat);
		liveTweets.push(tweetLocation);

    //Flash a dot onto the map
		var image = "css/small-dot-icon.png";
		var marker = new google.maps.Marker({
      position: tweetLocation,
      map: map,
      icon: image
    });
		setTimeout(function(){
      marker.setMap(null);
    },600);
	});
}