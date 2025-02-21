import { createStore, applyMiddleware} from'redux';
import thunk from'redux-thunk';
import rootReducer from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
/// To not re-do Redux again and again, we compress it to unify the API calls

const initialState = {};

const middleware = [thunk];

let store = createStore(
  rootReducer,
  initialState,
  //applyMiddleware(...middleware)
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;