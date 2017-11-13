var restify = require('restify');

var server = restify.createServer();

function sendV1(req, res, next) {
  res.send('hello: ' + req.params.name);
  return next();
}

function sendV2(req, res, next) {
  res.send({hello: req.params.name});
  return next();
}

/*
var PATH = '/hello/:name';
server.get({path: PATH, version: '1.1.3'}, sendV1);
server.get({path: PATH, version: '2.0.0'}, sendV2);
*/

var PATH = '/version/test';
server.get({
  path: PATH,
  version: ['2.0.0', '2.1.0', '2.2.0']
}, function (req, res, next) {
  res.send(200, {
    requestedVersion: req.version(),
    matchedVersion: req.matchedVersion()
  });
  return next();
});

server.listen(8080);