export const getCoordinate = (address) => {
  return $.ajax({
    method: "GET",
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&components=country:US&key=${window.googleAPIKey}`
  })
}
