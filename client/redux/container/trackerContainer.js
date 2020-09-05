import { connect } from 'react-redux';
import * as actionCreator from '../actions/trackAction'
import Tracker from '../../components/Tracker';

const mapStateToProps = (store) => ({
  tracking: store.tracking,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveTrack: (id) => dispatch(actionCreator.removeTrackAction(id))
  }
}

const TrackerContainer = connect(mapStateToProps, mapDispatchToProps)(Tracker)

export default TrackerContainer;