import { getCoordinate, auto } from '../util/geocode_api_util'

export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const NO_LOCATION = 'NO_LOCATION';
export const UPLOADING_LOCATION = 'UPLOADING_LOCATION';
export const AUTO_COMPLETE = 'AUTO_COMPLETE';

export const receiveLocation = (result) => {
  return {
    type: RECEIVE_LOCATION,
    result: result.results[0].geometry.location,
  }
}

export const noLocation = () => {
  return {
    type: NO_LOCATION,
  }
}


export const fetchLocation = (address) => {
  return (dispatch) => {
    if (address === "") {
      return dispatch(noLocation())
    } else {
      getCoordinate(address).then((result) => {
      return dispatch(receiveLocation(result))
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
