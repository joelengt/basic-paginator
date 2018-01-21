
module.exports.paginator = function(itemsPerPage, page) {
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
