import { 
  createStore, 
  combineReducers,
  applyMiddleware  
} from 'redux';
import { 
  syncHistoryWithStore, 
  routerReducer 
} from 'react-router-redux';
import ReduxThunk from 'redux-thunk';

import * as Reducers from './reducers';

const store = createStore(
  combineReducers({
    ...Reducers,
    routing: routerReducer
  }),
  applyMiddleware(ReduxThunk)
);

export default store;