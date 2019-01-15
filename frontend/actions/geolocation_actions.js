import { getCoordinate } from '../util/geocode_api_util'

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const NO_LOCATION = 'NO_LOCATION';

export const receiveLocation = (result) => {
  return {
    type: RECEIVE_LOCATION,
    result: result.results[0].geometry.location,
  }
}

export const noLocation = (result) => {
  return {
    type: NO_LOCATION,
    result,
  }
}

export const fetchLocation = (address) => {
  return (dispatch) => {
    if (address === "") {
      return dispatch(noLocation(address))
    } else {
      getCoordinate(address).then((result) => {
      return dispatch(receiveLocation(result))
    })}
  }
}


export const getDropdownResult = (query) => {
  return (dispatch) => {
    BusinessApiUtil.fetchSearchResult(query).then((businesses) => {
      dispatch(dropdownResult(businesses))
    })
  }
}
