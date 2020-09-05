import { combineReducers } from 'redux';
import updateListReducer from './updateListReducer';
import updateYTDReducer from './updateYTDReducer'
import updateCustomReducer from './updateCustomReducer'
import updateTrackerReducer from './updateTrackerReducer'

const rootReducer = combineReducers({
  phaList: updateListReducer.updatePhaList,
  ytd: updateYTDReducer.updateYTD,
  custom: updateCustomReducer.updateCustom,
  tracking: updateTrackerReducer.updateTracker,
});

export default rootReducer;