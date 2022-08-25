import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initialState from './initialState';
import rootReducer from './reducers/rootReducer';

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, initialState(), enhancer);

store.subscribe(() => {
  localStorage.setItem('user', JSON.stringify(store.getState().user));
});

export default store;
