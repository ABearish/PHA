import * as actionType from "./actionTypes";
import axios from "axios";
import redux from 'redux';

export const getYTDAction = (ytd) => {
  return {
    type: actionType.getYTD,
    results: ytd,
  };
};

export const fetchYTD = () => {
  return (dispatch) => {
    axios
      .get(`/pha/ytd`)
      .then((results) => {
        dispatch(getYTDAction(results.data[0].date));
      })
      .catch((err) => {
        dispatch(getYTDAction(0));
      });
  };
};
