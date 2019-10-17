export const selectBusiness = (businesses, txt) => {
    const bizCat = ["Japanese", "Korean", "Italian" ,"Burger", "Salad"]
      let bizArr = [];
        bizArr = businesses.filter((biz, idx) => biz.business_name.toLowerCase().includes(txt.toLowerCase()));
      if (bizArr.length > 6) {
        bizArr = bizArr.slice(0,6)
      }
  return bizArr
};

export const selectByLocation = (businesses, bounds) => {
  if (bounds && bounds.northeast && bounds.southwest) {
    const north = bounds.northeast.lat;
    const south = bounds.southwest.lat;
    const east = bounds.northeast.lng;
    const west = bounds.southwest.lng;
    const filtered = businesses.filter((business => {
      return (business.latitude <= north && business.latitude >= south
        && business.longitude <= east && business.longitude >= west)
    }))

    return filtered;
  }
  return businesses
}
