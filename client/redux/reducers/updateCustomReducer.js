import * as actionType from '../actions/actionTypes';

const updateCustomReducer = {
  updateCustom: (state = [], action) => {
    switch (action.type) {
      case actionType.UpdateCustom:
      return [...state].concat(action.results);
      case actionType.ClearCustomPHA:
      return [];
      default: 
      return state;
    }
  }
};
export default updateCustomReducer;