import { combineReducers } from 'redux';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { userReducer } from './users/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import { ticketReducer } from './ticket/reducers';
// import dataReducer from './apis/DataReducer';
import socketReducer from './socket/socketReducer';

const rootReducers = combineReducers({
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  users: userReducer,
  auth: authReducer,
  ChangeLayoutMode,
  tickets: ticketReducer,
  // data: dataReducer,
  socket: socketReducer
});

export default rootReducers;
