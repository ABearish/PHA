import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initalState = {
  phaList: [],
  ytd: 0,
  custom: [],
  tracking: [],
};

const store = createStore(
  rootReducer,
  initalState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;