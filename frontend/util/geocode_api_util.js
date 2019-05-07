export const getCoordinate = (address) => {
  return $.ajax({
    method: "GET",
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&components=country:US&key=${window.googleAPIKey}`
  })
}


// export const auto = (val, latlng) => {
//   return $.ajax({
//     method: "GET",
//     url:`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${val}&location=${latlng.lat},${latlng.lng}&radius=500&key=${window.googleAPIKey}`
//   })
// }
