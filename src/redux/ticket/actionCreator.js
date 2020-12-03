import actions from './actions';
import initialState from '../../demoData/projectData.json';

const {
  addTicketAction,
  addAllTicketsAction,
  addCommentAction,
  addReminderAction,
  addAllCommentsAction,
  addDepartAction
} = actions;

const addTicket = (values) => {
  return async dispatch => {
    try {
      dispatch(addTicketAction(values));
    
      // dispatch(singleProjectSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
};

const addAllTickets = (values) => {
  return async dispatch => {
    try {
      dispatch(addAllTicketsAction(values));
    
      // dispatch(singleProjectSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
};

const addComment = (values) => {
  return async dispatch => {
    try {
      dispatch(addCommentAction(values));
    
      // dispatch(singleProjectSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
};

const addReminder = (values) => {
  return async dispatch => {
    try {
      dispatch(addReminderAction(values));
    
      // dispatch(singleProjectSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
};


const addAllComments = (values) => {
  return async dispatch => {
    try {
      dispatch(addAllCommentsAction(values));
    
      // dispatch(singleProjectSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
};

const addDepart = (values) => {
  return async dispatch => {
    try {
      dispatch(addDepartAction(values));
    
      // dispatch(singleProjectSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
};



export { addTicket, addComment, addAllTickets, addAllComments, addReminder, addDepart};
