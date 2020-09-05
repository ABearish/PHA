import { connect } from "react-redux";
import * as actionCreator from "../actions/getYTDAction";
import YTD from "../../components/YTD";

const mapStateToProps = (store) => ({
  ytd: store.ytd,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetYTD: () => dispatch(actionCreator.fetchYTD()),
  };
};

const YTDContainer = connect(mapStateToProps, mapDispatchToProps)(YTD);

export default YTDContainer;
