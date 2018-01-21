var express = require('express');
var _ = require('lodash')

var app = express();
var store = [
  {"name":"Michael"},
  {"name":"Andy", "age":30},
  {"name":"Justin", "age":19},
  {"name":"Juan", "age":19},
  {"name":"Diego", "age":32},
  {"name":"carlos", "age":98},
  {"name":"pers", "age":12},
  {"name":"marcos", "age":23},
  {"name":"peter", "age":44},
  {"name":"angel", "age":34},
  {"name":"javer", "age":20},
  {"name":"alondra", "age": 11},
  {"name":"alondra1", "age": 11},
  {"name":"alondra2", "age": 11},
  {"name":"alondra3", "age": 11},
]


function paginator(itemsPerPage, page) {
  let items = Number(itemsPerPage)
  let currentPage = Number(page)

  /* Calculate paginator limits */
  if (items > store.length) {
    items = store.length
  }

  let calculatePages = store.length / items
  let pagesResiduo = store.length % items
  
  if (pagesResiduo) calculatePages += 1

  let paginator = {
    pages: calculatePages,
    items: Number(items)
  }

  let nextPage = currentPage + 1
  let beforePage = currentPage - 1

  /* set default for the last page */
  // if (currentPage > paginator.pages) {
  //   currentPage = paginator.pages
  //   nextPage = paginator.pages
  //   beforePage = paginator.pages - 1
  // }

  /* set default for the first page */
  if (currentPage <= 1)  {
    currentPage = 1
    nextPage = 2
    beforePage = 1
  }

  /* calculate items to resolve */
  let pager = (currentPage * items)
  let fromIndex = pager - items
  let toIndex = pager

  /* extract elements from the store position */
  let result = _.slice(store, fromIndex, toIndex)

  /* Custom index payload */
  let payload = {
    data: {
      items: result,
    },
    paginator: {
      back: beforePage,
      currentPage: currentPage,
      next: nextPage,
      itemsPerPage: paginator.items,
      pages: paginator.pages,
      totalItems: store.length
    }
  }

  return payload
}

// URI: /categorias?page=3&items=5
app.get('/categorias', function (req, res) {
  let { items, page } = req.query

  let result = paginator(items, page)

  res.status(200).json(result)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
