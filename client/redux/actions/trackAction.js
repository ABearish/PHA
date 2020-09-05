import * as actionType from "./actionTypes";
import redux from 'redux';

export const trackAction = (pha) => {
    return {
      type: actionType.TrackPHA,
      results: pha,
    }
  };

export const removeTrackAction = (id) => {
  return {
    type : actionType.RemoveTrackPHA,
    id: id
  }
}