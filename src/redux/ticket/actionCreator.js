import actions from './actions';
import initialState from '../../demoData/projectData.json';

const {
  addTicketAction,
  addAllTicketsAction,
  addCommentAction,
  addReminderAction,
  addAllCommentsAction,
  addDepartAction,
  addVendorNameAction,
  addAllRemindersAction,
  editReminderStatusAction,
  addSingleReminderAction,
  addVendorsAction
} = actions;

// ================================= Tickets ===================================================
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

// ======================================= Reminders =======================================================
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

const addAllReminders = (values) => {
  console.log(values);
  return async dispatch => {
    try {
      dispatch(addAllRemindersAction(values));
    
      // dispatch(singleProjectSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
};

const editReminderStatus = (values) => {
  return async dispatch => {
    try {
      dispatch(editReminderStatusAction(values));
    } catch (err) {
      console.log(err)
    }
  };
};

const addSingleReminder = (values) => {
  return async dispatch => {
    try {
      dispatch(addSingleReminderAction(values));
    } catch (err) {
      console.log(err)
    }
  };
};
// ========================================== Comments ========================================================
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

<<<<<<< HEAD

// ========================================== add vendor ========================================================
const addVendors = (values) => {
  return async dispatch => {
    try {
      dispatch(addVendorsAction(values));
=======
const addVendorName = (values) => {
  return async dispatch => {
    try {
      dispatch(addVendorNameAction(values));
>>>>>>> origin/development
    
      // dispatch(singleProjectSuccess(data));
    } catch (err) {
      console.log(err)
    }
  };
};

<<<<<<< HEAD

export { addTicket, addComment, addAllTickets, addAllComments, addReminder, addDepart, addAllReminders, editReminderStatus, addSingleReminder, addVendors};
=======
export { addTicket, addComment, addAllTickets, addAllComments, addReminder, addDepart,addVendorName, addAllReminders, editReminderStatus, addSingleReminder};
>>>>>>> origin/development
