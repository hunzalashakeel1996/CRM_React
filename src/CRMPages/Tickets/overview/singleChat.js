/* eslint-disable jsx-a11y/accessible-emoji */
import { Tabs, Spin, Image } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';

import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
import { BackShadowEmoji, MessageList, SingleChatWrapper } from '../TicketDetailStyle';
import {formatDate} from '../../../components/time/formatDate'

// eslint-disable-next-line import/no-extraneous-dependencies
const { TabPane } = Tabs;import { uploadUrl } from './../../../redux/apis/DataAction';


const SingleChat = ({ match, ticketDetail, loader }) => {
  const dispatch = useDispatch();

  let comments = useSelector(state => state.tickets.comments);
  let reminders = useSelector(state => state.tickets.reminders);

  const { rtl } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  const left = !rtl ? 'left' : 'right';

  const [pickerShow, setPickerShow] = useState(false);
  const [tabName, setTabName] = useState('tickets');

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: 'auto',
      [rtl ? 'left' : 'right']: '2px',
      [rtl ? 'marginLeft' : 'marginRight']: '-19px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  const renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
      [left]: '2px',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '6px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div style={thumbStyle} />;
  };

  const renderThumbHorizontal = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  function onTabChange(key) {
    setTabName(key)
  }

  const ticketsChat = (
    <Scrollbars
      className="custom-scrollbar"
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      renderThumbHorizontal={renderThumbHorizontal}
      renderThumbVertical={renderThumbVertical}
      renderView={renderView}
      renderTrackVertical={renderTrackVertical}
    >
      {(comments.length && !loader) ? (
        comments.map((comment, index) => {
          const id = index;

          const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
          return (
            <Fragment key={id}>
              <li className="atbd-chatbox__single" key={id} style={{ overflow: 'hidden' }}>
                <div className={'left'}>
                  <div className="atbd-chatbox__content">

                    <div>
                      <Heading as="h5" className="atbd-chatbox__name">
                        {comment.CreateBy} {!['null', 'undefined'].includes(comment.FromTicketGroup)? `(${comment.FromTicketGroup})`: ''}
                        <span>{formatDate(comment.UpdateDate)}</span>
                        <span className={'right'} style={{ fontWeight: 'bold', color: 'black' }}>Assigned To: {comment.Assigned} {comment.TicketGroup ? `(${comment.TicketGroup})`: ''}</span>
                      </Heading>

                      <div className="atbd-chatbox__contentInner d-flex">
                        <div className="atbd-chatbox__message" >
                          <MessageList className="message-box">
                            <span style={{ fontWeight: 'bold' }}>{comment.Subject}</span>
                            <p style={{ fontSize: 12 }}>
                              {`${comment.Description}`}
                              {/* <span>{comment.Attachment !== null ? <a style={{color: '#f0f0f0',  fontStyle:'italic', marginLeft: 10}} target='_blank' href={`${uploadUrl}/${comment.Attachment}`}> View Attachment</a> : ''}</span> */}
                            </p>
                            {comment.Attachment !== null &&<Image height={200} width={200} style={{borderRadius: 0, maxWidth: 200}} src={`${uploadUrl}/${comment.Attachment}`}/>}
                          </MessageList>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </li>
            </Fragment>
          );
        })
      ) : (
          !loader ?
            <div style={{ textAlign: 'center' }}><p>No data found</p></div>
            : <div style={{ textAlign: 'center' }}><Spin /></div>
        )}
    </Scrollbars>
  )

  const remindersChat = (
    <Scrollbars
      className="custom-scrollbar"
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      renderThumbHorizontal={renderThumbHorizontal}
      renderThumbVertical={renderThumbVertical}
      renderView={renderView}
      renderTrackVertical={renderTrackVertical}
    >
      {reminders.length ? (
        reminders.map((reminder, index) => {
          const id = index;
          formatDate(reminder.StartTime)
          const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
         return (
            <Fragment key={id}>
              <li className="atbd-chatbox__single" key={id} style={{ overflow: 'hidden' }}>
                <div className={'left'}>
                  <div className="atbd-chatbox__content">
                    <Heading as="h5" className="atbd-chatbox__name">
                      Assigned To: {reminder.Assigned} {reminder.TicketGroup ? `(${reminder.TicketGroup})` : ''}
                      {/* <span>{reminder.reminderAt}</span> */}
                      <span className={'right'} style={{ fontWeight: 'bold', color: 'black' }}>Reminder Type: {reminder.ReminderType}</span>
                    </Heading>

                    <div className="atbd-chatbox__contentInner d-flex">
                      <div className="atbd-chatbox__message" >
                        <MessageList className="message-box">
                          <p style={{ fontWeight: 'bold', fontSize: 14 }}>{reminder.Message}</p>
                          <span style={{ fontSize: 12 }}>{formatDate(reminder.StartTime)} TO {formatDate(reminder.EndTime)}</span>
                        </MessageList>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </Fragment>
          );
        })
      ) : (
          <div style={{ textAlign: 'center' }}><p>No data found</p></div>
        )}
    </Scrollbars>

  )

  return (
    <SingleChatWrapper>
      {pickerShow && <BackShadowEmoji onClick={() => setPickerShow(false)} />}
      <Cards
        title={
          <>
            <Tabs type="card"defaultActiveKey="1" onChange={onTabChange}>
              <TabPane tab="Tickets" key="tickets">
              </TabPane>
              <TabPane tab="Reminders" key="reminders">
              </TabPane>

            </Tabs>
          </>
        }
      // isbutton={[
      //   <Dropdown content={content} key="1">
      //     <Link to="#">
      //       <FeatherIcon icon="more-vertical" />
      //     </Link>
      //   </Dropdown>,
      // ]}
      >
        <ul className="atbd-chatbox">
          {tabName === 'tickets' ?
            ticketsChat
            :
            remindersChat}
        </ul>

      </Cards>
    </SingleChatWrapper>
  );
};

SingleChat.propTypes = {
  match: PropTypes.object,
};
export default SingleChat;
