import * as actionType from "./actionTypes";
import axios from "axios";

export const updateCustom = (cPHA) => {
  return {
    type: actionType.UpdateCustom,
    results: cPHA ,
  };
};

export const clearCustom = () => {
  return {
    type: actionType.ClearCustomPHA
  }
}

export const fetchCustomList = (start, end) => {
  return (dispatch) => {
    axios
      .get(`/pha/custom/${start||'2020-06-20'}/${end||'2020-06-30'}`)
      .then((results) => {
        dispatch(updateCustom(results.data));
      })
      .catch((err) => {
        dispatch(updateCustom());
      });
  };
};
