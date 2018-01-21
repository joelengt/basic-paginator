var express = require('express');
var _ = require('lodash')
var app = express();
var store = require('./store')

var Utils = require('./utils')

// URI: /categorias?page=3&items=5
app.get('/categorias', function (req, res) {
  let { items, page } = req.query

  let result = Utils.paginator(items, page)

  res.status(200).json(result)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
