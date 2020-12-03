const actions = {
  ADD_TICKET: 'ADD_TICKET',
  ADD_ALL_TICKETS: 'ADD_ALL_TICKETS',
  ADD_COMMENT: 'ADD_COMMENT',
  ADD_REMINDER: 'ADD_REMINDER',
  ADD_ALL_COMMENTS: 'ADD_ALL_COMMENTS',
  ADD_DEPART: 'ADD_DEPART',

  addTicketAction: data => {
    console.log('1 action', data)
    return {
      type: actions.ADD_TICKET,
      data,
    };
  },

  addAllTicketsAction: data => {
    return {
      type: actions.ADD_ALL_TICKETS,
      data,
    };
  },

  addCommentAction: data => {
    return {
      type: actions.ADD_COMMENT,
      data,
    };
  },

  addReminderAction: data => {
    return {
      type: actions.ADD_REMINDER,
      data,
    };
  },

  addAllCommentsAction: data => {
    return {
      type: actions.ADD_ALL_COMMENTS,
      data,
    };
  },

  addDepartAction: data => {
    return {
      type: actions.ADD_DEPART,
      data,
    };
  },
};

export default actions;
