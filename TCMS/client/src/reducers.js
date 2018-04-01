import { combineReducers } from 'redux';
import loginReducer from './containers/LoginPage/reducer';
import messageBoxReducer from './containers/MessageBox/reducer';

export default combineReducers({
  "userSession" : loginReducer,
  "messageBox": messageBoxReducer
});
