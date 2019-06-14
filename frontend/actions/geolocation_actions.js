import { getCoordinate, auto } from '../util/geocode_api_util'

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const NO_LOCATION = 'NO_LOCATION';
export const UPLOADING_LOCATION = 'UPLOADING_LOCATION';
export const AUTO_COMPLETE = 'AUTO_COMPLETE';

export const receiveLocation = (result, businesses) => {
  return {
    type: RECEIVE_LOCATION,
    result: result.results[0].geometry.location,
    bounds: result.results[0].geometry.bounds,
  }
}

export const noLocation = () => {
  return {
    type: NO_LOCATION,
  }
}


export const fetchLocation = (address, businesses) => {
  return (dispatch) => {
    if (address === "") {
      return dispatch(noLocation())
    } else {
      getCoordinate(address).then((result) => {
      return dispatch(receiveLocation(result, businesses))
    })}
  }
}

export const getAutoComplete = (address, latlng) => {
  return (dispatch) => {
    auto(address, latlng).then((result) => receiveAutoComplete(result))
  }
}

export const receiveAutoComplete = (result) => {
  return {
    type: AUTO_COMPLETE,
    result,
  }
}
export const getDropdownResult = (query) => {
  return (dispatch) => {
    BusinessApiUtil.fetchSearchResult(query).then((businesses) => {
      dispatch(dropdownResult(businesses))
    })
  }
}
