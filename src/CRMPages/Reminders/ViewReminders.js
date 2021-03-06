import { Col, Row, Spin, Button } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { PageHeader } from '../../components/page-headers/page-headers';
import { audioPlay, getUserRemindersAPI, userRemindersOnStatus } from '../../redux/apis/DataAction';
import { filterProjectByStatus, sortingProjectByCategory } from '../../redux/project/actionCreator';
import { Main } from '../styled';
import { ProjectHeader } from './style';

const RemindersList = lazy(() => import('./overview/RemindersList'));
import HeaderSearch from './../../components/header-search/header-search';
import ReasonAutoComplete from './../../components/ReasonAutoComplete/ReasonAutoComplete';
import { addAllReminders, addSingleReminder } from '../../redux/ticket/actionCreator';

const ViewReminders = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = props.match;

  // get items from redux
  const { socket, user, reminders } = useSelector(state => {
    return {
      socket: state.socket.socket,
      user: state.auth.login,
      reminders: state.tickets.reminders
    };
  });

  const [state, setState] = useState({
    visible: false,
    categoryActive: 'all',
    filterReminders: reminders,
    loader: false,
    StatusSort: 'Open',
  });
  const { visible, loader, filterReminders, StatusSort } = state;

  useEffect(() => {
    setState({...state, loader: true})
    dispatch(userRemindersOnStatus({ LoginName: user.LoginName, status: "Open" })).then(data => {
      setState({ ...state, filterReminders: data, loader: false })

    })
  }, [])

  // sockets
  socket ? socket.onmessage = (data) => {
    let message = JSON.parse(data.data)
    if (message.reason === 'newReminder') {
      let descData = message.data.data
      if (descData.Assigned.toLowerCase() === user.LoginName.toLowerCase()) {
        audioPlay()
        if(StatusSort == 'Open'){
          let temp = [...filterReminders]
          temp.unshift(descData)
          setState({ ...state, filterReminders: [...temp] });
          dispatch(addSingleReminder(descData))

        }
       
      }

      
    }
  } : null

  const handleSearch = (searchText, objectName) => {
    let temp = reminders.filter(item => item[objectName].toUpperCase().includes(searchText.toUpperCase()))
    setState({ ...state, filterReminders: temp, });
  };

  const onStatusChange = (status) => {
    setState({...state, loader: true})
    dispatch(userRemindersOnStatus({ LoginName: user.LoginName, status })).then(data => {
      setState({ ...state, filterReminders: data, StatusSort: status, loader: false})

    })
  }

  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Reminders"
          // subTitle={<>{reminders.length} Running Reminders</>}
          buttons={[
            //  <Button size="large"  onClick={showModal} key="1" type="primary"  >
            //   <FeatherIcon icon="plus" size={16} /> Create Ticket
            // </Button>,
          ]}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Row style={{ marginBottom: 10 }} gutter={10}>

              <Col md={8} lg={6} xl={5} xs={24} sm={12} style={{marginBottom:7}}>
                <div className="project-sort-search">
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'RefrenceId') }} placeholder="Reference Id" patterns />
                </div>
              </Col>
              {/* <Col md={8} xs={24}>
                <div className="project-sort-search">
                  <ReasonAutoComplete dataSource={['abc', 'def', 'hih']}/>
                </div>
              </Col> */}
              <Col md={8} lg={6} xl={5} xs={24} sm={12}  style={{marginBottom:7}}>
                <div className="project-sort-search">
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'CreateBy') }} placeholder="Create By" patterns />
                </div>
              </Col>

              <Col md={8} lg={6} xl={5} xs={24} sm={12}  style={{marginBottom:7}}>
                <div className="project-sort-search">
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'Message') }} placeholder="Message" patterns />
                </div>
              </Col>

              </Row>
              
              <Row>
              <Col md={24} xs={24} style={{ marginBottom: 10 }} >
                 <Button size="large"  variant="danger" onClick={(val) => { onStatusChange('Open') }} style={{ borderColor: StatusSort == "Open" ? '#5F63F2' : null }}>Open</Button>
                 <Button size="large"  variant="primary" onClick={(val) => { onStatusChange('Closed') }} style={{ borderColor: StatusSort == "Closed" ? '#5F63F2' : null }}>Closed</Button>
              </Col>
            </Row>

            <div>
              <Switch>
                <Suspense
                  fallback={
                    <div className="spin">
                      <Spin />
                    </div>
                  }
                >
                  <Route path={path} render={(props) => <RemindersList {...props} loader={loader} filterReminders={filterReminders} StatusSort={StatusSort} />} exact />
                  <Route path={`${path}/grid`} render={(props) => <RemindersList {...props} loader={loader} filterReminders={filterReminders} StatusSort={StatusSort} />} />
                  <Route path={`${path}/list`} render={(props) => <RemindersList {...props} loader={loader} filterReminders={filterReminders} StatusSort={StatusSort} />} />
                </Suspense>
              </Switch>
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

// ViewReminders.propTypes = {
//   props.match: propTypes.object,
// };

export default ViewReminders;