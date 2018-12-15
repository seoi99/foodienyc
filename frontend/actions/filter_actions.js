import { requestAllBusinesses } from './business_actions';

export const UPDATE_FILTER = 'UPDATE_FILTER';

export const changeFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value,
});

export const updateFilter = (dispatch, getState) => {
  
  return (requestAllBusinesses(getState()))(dispatch);
}
