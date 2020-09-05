import * as actionType from '../actions/actionTypes';
const updatePhaListReducer = {
  updatePhaList: (state = [], action) => {
    switch (action.type) {
      case actionType.updatePhaList:
      return [...state].concat(action.results);
      default: 
      return state;
    }
  }
};
export default updatePhaListReducer;