var util = require('util'),
    twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs');

var twit = new twitter({
    consumer_key: 'G2ecWjc6XMbTNLZYfOkQw',
    consumer_secret: 'y97ZnW2dLOWlI8Hma0LnaSd3Pk1XSRCzb6ZaEdyhYY',
    access_token_key: '62931183-tXB8gKDUT5Jylkcoy3mKxSWNF0H4y6i1jeDwTpBTa',
    access_token_secret: 'jPf61qFAtcskhwgIoMU3vddpAZGuyZmRkIMzEXeu5qIzr'
});

//Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081);

//Setup rotuing for app
app.use(express.static(__dirname + '/public'));

//Create web sockets connection.
io.sockets.on('connection', function (socket) {

  //Connect to twitter stream passing in filter for entire world.
  twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
      stream.on('data', function(data) {
          // Does the JSON result have coordinates
          if (data.coordinates){
            if (data.coordinates !== null){
              //If so then build up some nice json and send out to web sockets
              var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};
              //Send out to web sockets channel.
              socket.emit('twitter-stream', outputPoint);
            }
          }
      });
  });
});

