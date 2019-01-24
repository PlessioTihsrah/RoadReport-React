import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import locationReducer from './locationReducer';
import postReducer from './postReducer';




export default combineReducers({
  auth: authReducer,
  form: formReducer,
  location: locationReducer,
  report: postReducer
});