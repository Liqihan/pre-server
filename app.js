var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');
var util = require('util');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', function (req, res) {
    const ref = req.body.ref;
    if (ref !== 'refs/heads/master') {
        res.send('not master');
        return;
    }
    const project = JSON.parse(req.body.project);
    const name = project.name;
    const gitRepo = project.git_ssh_url;
    exec(util.format('./pre.sh %s %s', name, gitRepo), function (err) {
        if (err) {
            res.send('error');
            return;
        }
        res.send('success');
        return;
    })
})

var server = app.listen(9899, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});