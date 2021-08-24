const actions = {
  // ==================================================== Tickets =============================================
  ADD_TICKET: 'ADD_TICKET',
  ADD_ALL_TICKETS: 'ADD_ALL_TICKETS',

  addTicketAction: data => {
    // console.log('1 action', data)
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

  // ======================================================= Comments ============================================
  ADD_COMMENT: 'ADD_COMMENT',
  ADD_ALL_COMMENTS: 'ADD_ALL_COMMENTS',

  addCommentAction: data => {
    return {
      type: actions.ADD_COMMENT,
      data,
    };
  },

  addAllCommentsAction: data => {
    return {
      type: actions.ADD_ALL_COMMENTS,
      data,
    };
  },

  // ========================================================== Reminders =========================================
  ADD_REMINDER: 'ADD_REMINDER',
  ADD_DEPART: 'ADD_DEPART',
  ADD_ALL_REMINDERS: 'ADD_ALL_REMINDERS',
  EDIT_REMINDER_STATUS: 'EDIT_REMINDER_STATUS',
  ADD_SINGLE_REMINDER: 'ADD_SINGLE_REMINDER',
  ADD_VENDOR_NAME: 'ADD_VENDOR_NAME',

  addReminderAction: data => {
    return {
      type: actions.ADD_REMINDER,
      data,
    };
  },

  addDepartAction: data => {
    return {
      type: actions.ADD_DEPART,
      data,
    };
  },

  addAllRemindersAction: data => {
    return {
      type: actions.ADD_ALL_REMINDERS,
      data,
    };
  },

  editReminderStatusAction: data => {
    return {
      type: actions.EDIT_REMINDER_STATUS,
      data,
    };
  },

  addSingleReminderAction: data => {
    return {
      type: actions.ADD_SINGLE_REMINDER,
      data,
    };
  },
  addVendorNameAction: data => {
    return {
      type: actions.ADD_VENDOR_NAME,
      data,
    };
  },
};



export default actions;
