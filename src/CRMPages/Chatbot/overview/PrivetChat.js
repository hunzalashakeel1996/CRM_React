import { Badge } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { textRefactor } from '../../../components/utilities/utilities';
import { filterSinglePage } from '../../../redux/chat/actionCreator';
import { BlockSpan } from '../style';

const PrivateChat = ({ match }) => {
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.chat.data);

  const dataFiltering = email => {
    dispatch(filterSinglePage(email));
  };

  return (
    <ul>
      {chatData &&
        chatData
          .sort((a, b) => {
            return b.time - a.time;
          })
          .map((user, key) => {
            const { userName, content, email, img, active } = user;
            const id = content[content.length - 1].time;
            const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
            return (
              <li key={id} className="chat-link-signle">
                <NavLink onClick={() => dataFiltering(email)} to={`${match.path}/${email}`}>
                  <div className="author-figure">
                    <img src={`/static/img/chat-author/${img}`} alt="" />
                    <span className={active ? 'active' : 'inactive'} />
                  </div>
                  <div className="author-info">
                    <BlockSpan className="author-name">{userName}</BlockSpan>

                    <BlockSpan className="author-chatText">
                      {textRefactor(content[content.length - 1].content, 5)}
                    </BlockSpan>
                  </div>
                  <div className="author-chatMeta">
                    <BlockSpan>{same ? moment(id).format('hh:mm A') : moment(id).format('dddd')}</BlockSpan>
                    {key <= 1 && <Badge className="badge-success" count={3} />}
                  </div>
                </NavLink>
              </li>
            );
          })}
    </ul>
  );
};
PrivateChat.propTypes = {
  match: PropTypes.object,
};
export default PrivateChat;
