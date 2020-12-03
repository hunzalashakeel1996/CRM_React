import { Card, Col, Row, Skeleton, Radio, notification   } from 'antd';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { addComment, addAllComments, addReminder } from '../../redux/ticket/actionCreator';
import { Main } from '../styled';
import CreateComment from './overview/CreateComment';
import CreateReminder from './overview/CreateReminder';
import { ChatSidebar, Content } from './TicketDetailStyle';
import { addCommentAPI, getCommentsAPI, addReminderAPI, onStatusChangeAPI, getTicketDetailAPI } from '../../redux/apis/DataAction';
import { Spin } from 'antd';
import {formatDate} from '../../components/time/formatDate'
import { audioPlay, webURL, uploadUrl } from './../../redux/apis/DataAction';

// import PrivetChat from './overview/PrivetChat';
// import GroupChat from './overview/GroupChat';
const SingleChat = lazy(() => import('./overview/singleChat'));
// const SingleGroup = lazy(() => import('./overview/SingleGroupChat'));

const TicketDetails = ({ match, location}) => {
    let user = useSelector(state => state.auth.login);
    let socket = useSelector(state => state.socket.socket);

    // let comments = useSelector(state => state.tickets.comments);
    // let reminders = useSelector(state => state.tickets.reminders);
    const dispatch = useDispatch();

    const { rtl, searchData } = useSelector(state => {
        return {
            rtl: state.ChangeLayoutMode.rtlData,
            searchData: state.headerSearchData,
        };
    });
    const left = !rtl ? 'left' : 'right';
    
    const [state, setState] = useState({
        search: searchData,
        visible: false,
        comments: [],
        reminders: [],
        loader: true,
        selectedStatus: 'Open',
        me: 'woadud@gmail.com',
    });

    // =================================================================================================
    const [ticketDetail, setTicketDetail] = useState(null)

    useEffect(() => {
        setState({ ...state, loader: true })
        // if props is undefined then get ticket details from API
        if (location.ticket === undefined && location.state === undefined) {
            dispatch(getTicketDetailAPI({ TicketNo: match.params.id })).then(ticketDetail => {
                setTicketDetail(ticketDetail)
                dispatch(getCommentsAPI({ TicketNo: match.params.id })).then(data => {
                    dispatch(addAllComments(data))
                    setState({ ...state, loader: false, selectedStatus: ticketDetail.Status });
                })
            })
        }
        else {
            setTicketDetail(location.state ? location.state.ticket.form : location.ticket.value)
            status = location.state ? location.state.ticket.form.Status : location.ticket.value.Status
            dispatch(getCommentsAPI({ TicketNo: match.params.id })).then(data => {
                dispatch(addAllComments(data))
                setState({ ...state, loader: false, selectedStatus: status });
            })
        }
    }, []);

    socket ? socket.onmessage = (data) => {
        let message = JSON.parse(data.data)
        // when recieve roomMessage socket 
        if (message.reason === 'newComment' && message.data.TicketNo === ticketDetail.TicketNo) {
            audioPlay()
            dispatch(addComment(message.data))
        }
        else if (message.reason === 'newReminder' && message.data.TicketNo === ticketDetail.TicketNo) {
            audioPlay()
            dispatch(addReminder(message.data))
        }
    } : null

    const cardContent = (title, value) => {
        return (
            <Row >
                {(value[0] && value[0]!=='null') && <Col span={24} >
                    <Row>
                        <Col span={7}><p style={{ fontWeight: 'bold', marginRight: 3 }}>{title[0]} </p></Col>
                        <p> {title[0]=='Phone:' ? `(${value[0].substr(0,3)}) ${value[0].substr(3,3)}-${value[0].substr(6,4)}`: value[0]}</p>
                    </Row>
                </Col>}
                {(value[1] && value[1]!=='null') && <Col span={24}>
                    <Row>
                        <Col span={7}><p style={{ fontWeight: 'bold', marginRight: 3 }}>{title[1]} </p></Col>
                        <p> {` ${value[1]}`}</p>
                    </Row>
                </Col>}
            </Row>
        )
    }

    const onAddComment = (form) => {
        setState({ ...state, loader: true, });
        form = {
            ...form, TicketNo: ticketDetail.TicketNo, CreateBy: user.LoginName, FromTicketGroup: user.GroupName,
            TicketTitle: ticketDetail.TicketTitle, OrderNo: ticketDetail.OrderNo, CustomerName: ticketDetail.CustomerName, CustomerContact: ticketDetail.CustomerContact,
            ZipCode: ticketDetail.ZipCode, Status: ticketDetail.Status
        }
        if (form.picturePath !== undefined) {
            // save image in server
            const data = new FormData()
            data.append('CRMImage', form.picturePath.file)
            console.log('inside image')
            fetch(`${uploadUrl}/api/images/crmImageUpload`, {
                method: 'POST',
                body: data
            }).then((res) => {
                return res.json()
            }).then(res => {
                form = { ...form, Attachment: res }
                onAddCommentProcess(form)
            }).catch((err) => {
                console.log(err)
            })

        } else {
            console.log('insde not image')
            // image not attached in ticket
            form = { ...form, Attachment: null }
            onAddCommentProcess(form)
        }
    }

    const onAddCommentProcess = (form) => {
        dispatch(addCommentAPI(form)).then(data => {
            form = {...form, UpdateDate: data.UpdateDate}
            socket && socket.send(JSON.stringify({ type: 'broadcastMessage', reason: 'newComment', data: form }))
            dispatch(addComment(form))
            setState({...state, visible: false, loader:false});
        })
    }

    const onAddReminder = (form) => {
        setState({ ...state, loader: true, });
        form = {
            ...form,
            TicketNo: ticketDetail.TicketNo,
            RefrenceId: ticketDetail.TicketNo,
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
        })
    }
    

    const showModal = (modelName) => {
        setState({
            ...state,
            visible: modelName,
        });
    };

    const onCancel = () => {
        setState({
            ...state,
            visible: '',
        });
    };

    const onStatusChange = (val) => {
        setState({ ...state, selectedStatus: val })
        ticketDetail.Status = val
        let data = {
            TicketNo: ticketDetail.TicketNo, CreateBy: ticketDetail.CreateBy, FromTicketGroup: ticketDetail.FromTicketGroup,
            TicketTitle: ticketDetail.TicketTitle, OrderNo: ticketDetail.OrderNo, CustomerName: ticketDetail.CustomerName, 
            CustomerContact: ticketDetail.CustomerContact, Assigned: ticketDetail.Assigned,
            ZipCode: ticketDetail.ZipCode, Status: val, TicketGroup: ticketDetail.TicketGroup, 
        }
        dispatch(onStatusChangeAPI(data))

        notification.success({
            message: 'Status Changed',
            description: `Status of Ticket#${ticketDetail.TicketNo} changed to ${val}`,
            duration: 3
        });
    }

    return (
        <>
            <PageHeader
                ghost
                title={`Ticket Number ${ticketDetail !== null ? ticketDetail.TicketNo : ''}`}
                buttons={[
                    <div key="1" className="page-header-actions">
                        {/* <CalendarButtonPageHeader />
                        <ExportButtonPageHeader />
                        <ShareButtonPageHeader /> */}
                        <div style={{marginRight: 10}}>
                            <Radio.Group
                                options={[
                                    { label: 'Open', value: 'Open' },
                                    { label: 'Waiting', value: 'Waiting' },
                                    { label: 'FollowUp', value: 'FollowUp' },
                                    { label: 'Closed', value: 'Closed' },
                                ]}
                                onChange={(val) => {onStatusChange(val.target.value)}}
                                value={state.selectedStatus}
                                optionType="button"
                            />
                        </div>

                        <Button onClick={() => { showModal('createReminder') }} size="small" type="primary">
                            <FeatherIcon icon="bell" size={14} />
                            Set Reminder
                        </Button>
                        <Button onClick={() => { showModal('createComment') }} size="small" type="primary">
                            <FeatherIcon icon="plus" size={14} />
                            Add Comment
                        </Button>
                    </div>,
                ]}
            />
            
                <Main>
                    <Row gutter={30}>
                        <Col xxl={8} lg={8} xs={24}>
                            <ChatSidebar>
                                <Cards headless>
                                    {/* <div className="chatbox-search">
                                    <AutoComplete onSearch={patternSearch} dataSource={notData} width="100%" patterns />
                                </div> */}
                                    {/* <nav>
                  <UL>
                    <li>
                      <NavLink activeClassName="active" to={`${match.path}/private/rofiq@gmail.com`}>
                        Private Chat
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active" to={`${match.path}/group/1`}>
                        Group Chat
                        <Badge className="badge-error" count={3} />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active" to={`${match.path}/all/rofiq@gmail.com`}>
                        All Contacts
                      </NavLink>
                    </li>
                  </UL>
                </nav> */}
                                <Content>
                                    {ticketDetail !== null &&
                                        <Card bordered={true} title={`${ticketDetail.TicketTitle}`} style={{ width: 450, marginLeft: 15 }}>
                                            {/* <Row >
                                            <Col span={24} >
                                                <Row className={'center'}>
                                                    <p style={{ fontWeight: 'bold', marginRight: 3 }}>Reasons:       </p>
                                                    <p style={{ fontWeight: 'bold' }}> {`${ticketDetail.reason}`}</p>
                                                </Row>
                                            </Col>

                                        </Row> */}
                                        {console.log('tsting', ticketDetail)}
                                            {cardContent(['Created On:', 'Created By:'], [`${formatDate(ticketDetail.CreateDate)}`, `${ticketDetail.CreateBy}`])}
                                            {cardContent(['From:', 'To:'], [ticketDetail.FromTicketGroup, ticketDetail.TicketGroup])}
                                            {cardContent(['Assigned:', 'Status:'], [ticketDetail.Assigned, ticketDetail.Status])}
                                            {cardContent(['Order Number:', 'Customer Name:'], [ticketDetail.OrderNo, ticketDetail.CustomerName])}
                                            {cardContent(['Phone:', 'Zip Code:'], [ticketDetail.CustomerContact, ticketDetail.ZipCode])}

                                        </Card>}
                                </Content>
                            </Cards>
                        </ChatSidebar>
                    </Col>
                    <Col xxl={16} lg={16} xs={24}>
                        <Switch>
                            <Suspense
                                fallback={
                                    <Cards headless>
                                        <Skeleton avatar paragraph={{ rows: 10 }} active />
                                    </Cards>
                                }
                            >
                                <Route exact path={match.path} render={(props) => (<SingleChat {...props} ticketDetail={ticketDetail} loader={state.loader} />)} />
                                {/* <Route exact path={`${match.path}/private/:id`} component={SingleChat} />
                                        <Route exact path={`${match.path}/all/:id`} component={SingleChat} />
                                        <Route exact path={`${match.path}/group/:id`} component={SingleGroup} /> */}
                            </Suspense>
                        </Switch>

                    </Col>
                </Row>

                    {state.visible === 'createComment' && <CreateComment onAdd={(form) => { onAddComment(form) }} onCancel={onCancel} visible={state.visible} loader={state.loader}/>}
                    {state.visible === 'createReminder' && <CreateReminder ticketDetail={ticketDetail} onAdd={(form) => { onAddReminder(form) }} onCancel={onCancel} visible={state.visible} loader={state.loader}/>}

                </Main>
                
        </>
    );
};

TicketDetails.propTypes = {
    match: PropTypes.object,
};

export default TicketDetails;
