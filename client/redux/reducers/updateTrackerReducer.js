import * as actionType from "../actions/actionTypes";
const updateTrackerReducer = {
  updateTracker: (state = [], action) => {
    switch (action.type) {
      case actionType.TrackPHA: {
        return [...state].concat(action.results);
      }
      case actionType.RemoveTrackPHA:
        const newState = state.filter((ele) => {
          return ele.id !== action.id;
        });
        return newState;
      default:
        return state;
    }
  },
};
export default updateTrackerReducer;
