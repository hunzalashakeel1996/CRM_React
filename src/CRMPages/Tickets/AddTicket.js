import CreateTicket from './overview/CreateTicket';
import { Col, Row, Select, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';

import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, getDepartsAPI } from '../../redux/apis/DataAction';
import { filterProjectByStatus, sortingProjectByCategory } from '../../redux/project/actionCreator';
import { connectSocket } from '../../redux/socket/socketAction';
import { addAllTickets, addTicket, addDepart } from '../../redux/ticket/actionCreator';
import { Main } from '../styled';
import { ProjectHeader, ProjectSorting } from './style';
import { useHistory } from "react-router-dom";
import { uploadUrl } from './../../redux/apis/DataAction';

const AddTicket = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    let tickets = useSelector(state => state.tickets.tickets);
    let depart = useSelector(state => state.tickets.depart);
    let socket = useSelector(state => state.socket.socket);
    let user = useSelector(state => state.auth.login);
    const [state, setState] = useState({
        visible: true,
        categoryActive: 'all',
        filterTickets: [],
        loader: false,
    });
    const { visible, loader, filterTickets } = state;

    const onAddTicket = (form) => {
        setState({ ...state, loader: true })
        form = { ...form, LoginName: `${user.LoginName}`, FromTicketGroup: `${user.GroupName}` }
        if (![undefined, null].includes(form.Attachment)) {
            // save image in server
            const data = new FormData()
            data.append('CRMImage', form.Attachment.file)
            fetch(`${uploadUrl}/api/images/crmImageUpload`, {
                method: 'POST',
                body: data
            }).then((res) => {
                return res.json()
            }).then(res => {
                form = { ...form, Attachment: res }
                onAddTicketProcess(form)
            }).catch((err) => {
            })

        } else {
            // image not attached in ticket
            form = { ...form, Attachment: null }
            onAddTicketProcess(form)
        }
    }

    const onAddTicketProcess = (form) => {
        dispatch(addTicketAPI(form)).then(data => {
            form = { ...form, TicketNo: data.TicketNo, CreateDate: data.CreateDate, CreateBy: user.LoginName, Status: 'Open' }
            dispatch(addTicket(form))       // add ticket in redux list
            socket && socket.send(JSON.stringify({ type: 'broadcastMessage', reason: 'newTicket', data: form }))
            let temp = [...filterTickets]
            temp.unshift(form)
            setState({ ...state, visible: false, filterTickets: [...temp], loader: false });
            history.push(`/admin/ticket/ticketDetails/${form.TicketNo}`, { ticket: { form } });
        })
    }


    const onCancel = () => {
        history.push(`/admin/ticket/viewTickets`);
    };


    return (
        <CreateTicket onAdd={(form) => { onAddTicket(form) }} onCancel={onCancel} visible={visible} loader={loader} />
    )
}

export default AddTicket;
