
export const fetchAllBusinesses = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/businesses',

  })
}

export const fetchBusiness = (id) => {
  return $.ajax({
    method: 'GET',
    url:`/api/businesses/${id}`
  })
}


export const createReview = (review) => {
  return $.ajax({
    method: "POST",
    url: "/api/reviews",
    data: { review },
  })
}

export const updateReview = (review) => {

  return $.ajax({
    method: "PATCH",
    url: `/api/reviews/${review.id}`,
    data: { review },
  })
}

export const deleteReview = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/reviews/${id}`,
  })
}

export const fetchAllReviews = () => {
  return $.ajax({
    method: "GET",
    url: '/api/reviews'
  })
}

export const fetchSearchResult = (query) => {
  return $.ajax({
    method: "GET",
    url: `api/businesses/search/?result=${query}`
  })
}
