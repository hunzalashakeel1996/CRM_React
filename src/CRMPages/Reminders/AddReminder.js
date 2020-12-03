import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import { addReminderAPI } from '../../redux/apis/DataAction';
import { addReminder } from '../../redux/ticket/actionCreator';
import SelfReminderModal from './overview/SelfReminderModal';
import { useHistory } from "react-router-dom";

const AddReminder = (props) => {
    let user = useSelector(state => state.auth.login);
    let socket = useSelector(state => state.socket.socket);
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        visible: true,
        comments: [],
        reminders: [],
        loader: false,
        selectedStatus: 'Open',
        me: 'woadud@gmail.com',
    });

    const onAddReminder = (form) => {
        setState({ ...state, loader: true, });
        form = {
            ...form,
            TicketNo: null,
            RefrenceId: null,
            FromTicketGroup: user.GroupName,
            StartTime: form['range-time-picker'][0].format('YYYY-MM-DDTHH:mm:ss.000'),
            EndTime: form['range-time-picker'][1].format('YYYY-MM-DDTHH:mm:ss.000'),
            CreateBy: user.LoginName,
            Status: 'Open'
        }
        dispatch(addReminderAPI(form)).then(data => {
            console.log('res123', data)
            form = {...form, ReminderID: data.reminderID}
            socket && socket.send(JSON.stringify({type: 'broadcastMessage', reason: 'newReminder', data: form}))
            dispatch(addReminder(form))
            setState({...state, visible: false, loader:false });
            history.push(`/admin/ticket/viewReminders`)
        })
    }

    const onCancel = () => {
        history.push(`/admin/ticket/viewReminders`);
    };
   
    return (
        <SelfReminderModal onAdd={(form) => { onAddReminder(form) }} onCancel={onCancel} visible={true} loader={state.loader}/>
    )
}

export default AddReminder;
