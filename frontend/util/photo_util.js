export const fetchPicture = (id) => {
  return $.ajax({
    method: "GET",
    url:`/api/user_pictures/${id}`
  })
}
export const fetchAllPictures = () => {

  return $.ajax({
    method: "GET",
    url:`/api/user_pictures`
  })
}


export const deletePicture = (id) => {
  return $.ajax({
    method:"DELETE",
    url: `/api/user_pictures/${id}`
  })
}

export const uploadPicture = (formData) => {
  
  return $.ajax({
    method: 'POST',
    url: '/api/user_pictures',
    data: formData,
    contentType: false,
    processData: false
  });
};
