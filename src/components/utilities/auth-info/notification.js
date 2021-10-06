import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Badge, Button } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector, useDispatch } from 'react-redux';
import { AtbdTopDropdwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';
import { getUserRemindersAPI } from '../../../redux/apis/DataAction';
import { addAllReminders } from '../../../redux/ticket/actionCreator';

const NotificationBox = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const { rtl, user, tickets } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      user: state.auth.login,
      tickets: state.tickets.tickets
    };
  });

  const [state, setState] = useState({
    isTickets: true,
    
  });

  useEffect(() => {
    dispatch(getUserRemindersAPI({ LoginName: user.LoginName })).then(data => {
      // let openReminder = data.filter(val => val.Status === 'Open')
      dispatch(addAllReminders(data))
    })
  }, []);

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div className="hello" style={thumbStyle} />;
  };

 

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: rtl && 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  renderView.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  let remainders = useSelector(state => state.tickets.reminders);
  const notificationlist = (
    state.isTickets ?
      tickets.map((ticket, i) => {
        const { TicketNo, TicketTitle } = ticket;
        return (
          <ul className=" notification-list">
            <li>
              {/* <a to="#" target='_blank' onClick={(event) => {history.push(`/admin/ticket/ticketDetails/${ticket.TicketNo}`, { ticket: { ticket } });}}> */}
              <a href={`/admin/ticket/ticketDetails/${ticket.TicketNo}`} target='_blank' >
                <div className="atbd-top-dropdwon__content notifications">
                  <div className="notification-icon bg-primary">
                    <FeatherIcon icon="hard-drive" />
                  </div>
                  <div className="notification-content d-flex">
                    <div className="notification-text">
                      <Heading as="h5">
                        <span>{TicketNo}</span> {TicketTitle}
                      </Heading>

                    </div>
                    <div className="notification-status">
                      <Badge dot />
                    </div>
                  </div>
                </div>
              </a>
            </li>


          </ul>
        );
      })
      :
      remainders.map((reminder, i) => {
        const { RefrenceId, Message, ReminderID, Status } = reminder;
        if (Status === 'Open')
          return (
            <ul className=" notification-list">
              <li>
                <a href={`/admin/ticket/viewReminders/${ReminderID}`} target='_blank'>
                  <div className="atbd-top-dropdwon__content notifications">
                    <div className="notification-icon bg-primary">
                      <FeatherIcon icon="hard-drive" />
                    </div>
                    <div className="notification-content d-flex">
                      <div className="notification-text">
                        <Heading as="h5">
                          <span>{RefrenceId != null ? RefrenceId : 'Self Assign'}:</span> {Message}
                        </Heading>

                      </div>
                      <div className="notification-status">
                        <Badge dot />
                      </div>
                    </div>
                  </div>
                </a>
              </li>


            </ul>
          );
      })
  );
  const content = (
    <AtbdTopDropdwon className="atbd-top-dropdwon"  >
      <Heading as="h5" className="atbd-top-dropdwon__title" >
        <a href="#" onClick={() => { setState({ ...state, isTickets: !state.isTickets }) }}
          style={{ flex: 0.5, textAlign: 'center', color: state.isTickets ? '#5f63f2' : null}}>
          Tickets
        </a>
        <a href="#" onClick={() => { setState({ ...state, isTickets: !state.isTickets }) }}
          style={{ flex: 0.5, textAlign: 'center', color: !state.isTickets ? '#5f63f2' : null }} >
          Reminders
        </a>
      </Heading>
      <Scrollbars
        autoHeight
        autoHide
        renderThumbVertical={renderThumb}
        renderView={renderView}
        renderTrackVertical={renderTrackVertical}
        
      >
       {notificationlist}
      </Scrollbars>
      {/* <Link className="btn-seeAll" to="#">
        See all incoming activity
      </Link> */}
    </AtbdTopDropdwon>
  );

  return (
    <div className="notification" >
      <Popover placement="bottomLeft" content={content} action="click" >
        <Badge dot offset={[-8, -5]}>
          <Link to="#" className="head-example">
            <FeatherIcon icon="bell" size={20} />
          </Link>
        </Badge>
      </Popover>
    </div>
  );
};

export const askNotification = () => {
  return Notification.requestPermission().then(permission => {
    return permission
  })
}

export default NotificationBox;