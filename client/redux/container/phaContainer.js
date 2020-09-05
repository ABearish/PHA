import { connect } from 'react-redux';
import * as actionCreator from '../actions/updatePHAListAction'
import * as actionsCreator from '../actions/trackAction'

import Pha from '../../components/Pha';

const mapStateToProps = (store) => ({
  phaList: store.phaList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePhaList: () => dispatch(actionCreator.fetchPHAList()),
    onUpdateTracker: (pha) => dispatch(actionsCreator.trackAction(pha))
  }
}

const PhaContainer = connect(mapStateToProps, mapDispatchToProps)(Pha)

export default PhaContainer;