import * as actionType from "./actionTypes";
import axios from "axios";
import redux from "redux";

export const updatePHAList = (pha) => {
  return {
    type: actionType.updatePhaList,
    results: pha,
  };
};

export const fetchPHAList = () => {
  return (dispatch) => {
    axios
      .get("/pha/")
      .then((results) => {
        dispatch(updatePHAList(results.data));
      })
      .catch((err) => {
        dispatch(updatePHAList([]));
      });
  };
};
