import * as actionType from "../actions/actionTypes";

const updateYTDReducer = {
  updateYTD: (state = 0, action) => {
    switch (action.type) {
      case actionType.getYTD:
        return action.results;
      default:
        return state;
    }
  },
};
export default updateYTDReducer;
