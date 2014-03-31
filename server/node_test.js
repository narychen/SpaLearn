var http = require('http');

var options = {
  hostname: 'www.anxin-ex.com',
  port: 80,
  path: '/index.php?m=member&c=index&a=register&siteid=1',
  method: 'POST'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();


//var request = require('request');
//request('http://www.anxin-ex.com/index.php?m=member&c=index&a=register&siteid=1', function (error, response, body) {
//  if (!error && response.statusCode == 200) {
//    console.log(body) // Print the google web page.
//  }
//})