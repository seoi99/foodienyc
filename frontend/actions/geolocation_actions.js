import { getCoordinate } from '../util/geocode_api_util'

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export const receiveLocation = (result) => {
  return {
    type: RECEIVE_LOCATION,
    result: result.results[0].geometry.location,
  }
}

export const fetchLocation = (address) => {
  return (dispatch) => {
    getCoordinate(address).then((result) => {
      dispatch(receiveLocation(result))
    })
  }
}


export const getDropdownResult = (query) => {
  return (dispatch) => {
    BusinessApiUtil.fetchSearchResult(query).then((businesses) => {
      dispatch(dropdownResult(businesses))
    })
  }
}
