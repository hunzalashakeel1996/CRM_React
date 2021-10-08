import actions from './actions';

const {
  ADD_TICKET,
  ADD_COMMENT,
  ADD_ALL_COMMENTS,
  ADD_REMINDER,
  ADD_ALL_TICKETS,
  ADD_DEPART,
  ADD_ALL_REMINDERS,
  EDIT_REMINDER_STATUS,
  ADD_SINGLE_REMINDER,
  ADD_VENDOR_NAME
} = actions;

const ticketState = {
  tickets: [],
  comments: [],
  reminders: [],
  depart: [],
  vendornames: [],
  loading: false,
  error: null,
};

const ticketReducer = (state = ticketState, action) => {
  const { type, data, err } = action;
  
  let temp = ''
  switch (type) {
    case ADD_TICKET:
      temp = [...state.tickets]
      temp.unshift(data)
      return {
        ...state,
        tickets: temp,
        loading: false,
      };
    case ADD_ALL_TICKETS:
      return {
        ...state,
        tickets: data,
        loading: false,
      };
    case ADD_COMMENT:
      temp = [...state.comments]
      temp.unshift(data)
      return {
        ...state,
        comments: temp,
        loading: false,
      };
    case ADD_REMINDER:
      temp = [...state.reminders]
      temp.unshift(data)
      return {
        ...state,
        reminders: temp,
        loading: false,
      };
    case ADD_VENDOR_NAME:
      return {
        ...state,
        vendornames: data.vendorname.split(','),
        loading: false,
      };
      //  // console.log(vendornames)
    case ADD_ALL_COMMENTS:
      return {
        ...state,
        comments: data.comments,
        reminders: data.reminders,
        loading: false,
      };
    case ADD_DEPART:
      return {
        ...state,
        depart: data,
        loading: false,
      };
    case ADD_ALL_REMINDERS:
      return {
        ...state,
        reminders: data
      }
    case EDIT_REMINDER_STATUS:
      temp = [...state.reminders]
      let index = temp.findIndex(val => { return val.ReminderID === data.selectedReminderDetail.ReminderID })
      temp[index] = { ...temp[index], Status: data.Status }
      return {
        ...state,
        reminders: temp
      }
    case ADD_SINGLE_REMINDER:
      temp = [...reminders]
      temp.unshift(data)
      return {
        ...state,
        reminders: temp
      }
    default:
      return state;
  }
};

// const commentState = {
//   comments: localStorage.getItem('comments') ?JSON.parse(localStorage.getItem('comments')): commentsData,
//   loading: false,
//   error: null,
// };


// const commentReducer = (state = commentState, action) => {
//   const { type, data, err } = action;
//   switch (type) {
//     case ADD_COMMENT:
//       let temp = [...state.comments]
//       temp.push(data)
//       localStorage.setItem('comments', JSON.stringify(temp))
//       return {
//         ...state,
//         comments: temp,
//         loading: false,
//       };
//     case ADD_COMMENT_ERR:
//       return {
//         ...state,
//         error: err,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

// const reminderState = {
//   reminders: localStorage.getItem('reminders') ?JSON.parse(localStorage.getItem('reminders')): remindersData,
//   loading: false,
//   error: null,
// };


// const reminderReducer = (state = reminderState, action) => {
//   const { type, data, err } = action;
//   switch (type) {
//     case ADD_REMINDER:
//       let temp = [...state.reminders]
//       temp.push(data)
//       localStorage.setItem('reminders', JSON.stringify(temp))
//       return {
//         ...state,
//         reminders: temp,
//         loading: false,
//       };
//     case ADD_REMINDER_ERR:
//       return {
//         ...state,
//         error: err,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };


export { ticketReducer };
