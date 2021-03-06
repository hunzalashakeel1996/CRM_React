import { Badge } from 'antd';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Button } from '../../../components/buttons/buttons';
import { textRefactor } from '../../../components/utilities/utilities';
import { filterSinglepageGroup } from '../../../redux/chat/actionCreator';
import { BlockSpan, ChatWrapper } from '../style';

const GroupChat = ({ match }) => {
  const chatData = useSelector(state => state.groupChat.data);
  const dispatch = useDispatch();

  const dataFiltering = id => {
    dispatch(filterSinglepageGroup(id));
  };

  return (
    <ChatWrapper>
      <div className="create-action">
         <Button size="large"  className="btn-add"   type="default" shape="circle" block>
          <FeatherIcon icon="edit" size={14} />
          Create New Group
        </Button>
      </div>

      <ul>
        {chatData &&
          chatData
            .sort((a, b) => {
              return b.time - a.time;
            })
            .map((user, key) => {
              const { groupName, content, id, img } = user;
              const { time } = content[content.length - 1];
              const same = moment(time).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
              return (
                <li key={id} className="chat-link-signle">
                  <NavLink onClick={() => dataFiltering(id)} to={`${match.path}/${id}`}>
                    <div className="author-figure">
                      <img src={`/static/img/chat-author/${img}`} alt="" />
                    </div>

                    <div className="author-info">
                      <BlockSpan className="author-name">{groupName}</BlockSpan>
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
    </ChatWrapper>
  );
};
GroupChat.propTypes = {
  match: PropTypes.object,
};
export default GroupChat;
