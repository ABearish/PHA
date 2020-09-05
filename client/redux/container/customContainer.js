import { connect } from 'react-redux';
import * as actionCreator from '../actions/updateCustomAction'
import DatePicker from '../../components/Datepicker';
import * as actionsCreator from '../actions/trackAction'


const mapStateToProps = (store) => ({
  custom: store.custom,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCustom: (start, end) => dispatch(actionCreator.fetchCustomList(start, end)),
    onClearCustom: (pha) => dispatch(actionCreator.clearCustom(pha)),
    onUpdateTracker: (pha) => dispatch(actionsCreator.trackAction(pha))
  }
}

const CustomContainer = connect(mapStateToProps, mapDispatchToProps)(DatePicker)

export default CustomContainer;