export const selectBusiness = (business, txt) => {
    const bizCat = ["Japanese", "Korean", "Italian" ,"Burger", "Salad"]
      let bizArr = [];
      if (txt !== "") {
        bizArr = business.filter((biz, idx) => biz.business_name.toLowerCase().includes(txt.toLowerCase()));
      }
      console.log(bizArr);
      if (bizArr.length > 6) {
        bizArr = bizArr.slice(0,6)
      }
  return bizArr
};
