import { Col, Row, Spin, Button } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { PageHeader } from '../../components/page-headers/page-headers';
import { audioPlay, getUserRemindersAPI } from '../../redux/apis/DataAction';
import { filterProjectByStatus, sortingProjectByCategory } from '../../redux/project/actionCreator';
import { Main } from '../styled';
import { ProjectHeader } from './style';

const RemindersList = lazy(() => import('./overview/RemindersList'));
import HeaderSearch from './../../components/header-search/header-search';
import ReasonAutoComplete from './../../components/ReasonAutoComplete/ReasonAutoComplete';

const ViewReminders = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = props.match;

  const [state, setState] = useState({
    visible: false,
    categoryActive: 'all',
    filterReminders: [],
    reminders: [],
    loader: true,
    StatusSort:'Open',
  });
  const { visible, loader, filterReminders, reminders, StatusSort } = state;

  // get items from redux
  let socket = useSelector(state => state.socket.socket);
  let user = useSelector(state => state.auth.login);

  let mount = false

  useEffect(() => {
    setState({ ...state, loader: true })
    dispatch(getUserRemindersAPI({ LoginName: user.LoginName })).then(data => {
      //   dispatch(addAllTickets(data))
      setState({ ...state, filterReminders: data, reminders: data, loader: false, StatusSort:'Open'});
    })
  }, []);

    // sockets
    socket ? socket.onmessage = (data) => {
        let message = JSON.parse(data.data)
   
        if (message.reason === 'newReminder' && message.data.Assigned.toLowerCase() === user.LoginName.toLowerCase()) {
            console.log('socekt', message.data)
            audioPlay()
            let temp = [...reminders]
            temp.unshift(message.data)
            setState({ ...state, filterReminders: temp, reminders: temp });
        }
    } : null

  const handleSearch = (searchText, objectName) => {
    let temp = reminders.filter(item => item[objectName].toUpperCase().includes(searchText.toUpperCase()))
    setState({...state, filterReminders: temp, });
  };

  const onSorting = selectedItems => {
    dispatch(sortingProjectByCategory(selectedItems));
  };

  const onChangeCategory = value => {
    setState({
      ...state,
      categoryActive: value,
    });
    dispatch(filterProjectByStatus(value));
  };

  const showModal = () => {
    // socket.send(JSON.stringify({ type: 'roomMessage', roomId: 123, message: 'hello' }))
    setState({...state, visible: true });
  };

  const onCancel = () => {
    setState({...state, visible: false });
  };

  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Reminders"
          subTitle={<>{reminders.length} Running Reminders</>}
          buttons={[
            // <Button onClick={showModal} key="1" type="primary" size="default">
            //   <FeatherIcon icon="plus" size={16} /> Create Ticket
            // </Button>,
          ]}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Row style={{marginBottom: 10}} gutter={10}>
              <Col md={8} xs={24}>
                <div className="project-sort-search">
                  <AutoComplete onSearch={(e) => {handleSearch(e, 'RefrenceId')}} placeholder="Reference Id" patterns />
                </div>
              </Col>
              {/* <Col md={8} xs={24}>
                <div className="project-sort-search">
                  <ReasonAutoComplete dataSource={['abc', 'def', 'hih']}/>
                </div>
              </Col> */}
              <Col md={8} xs={24}>
                <div className="project-sort-search">
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'CreateBy') }} placeholder="Create By" patterns />
                </div>
              </Col>

              <Col md={8} xs={24}>
                <div className="project-sort-search">
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'Message') }} placeholder="Message" patterns />
                </div>
              </Col>

              <Col md={24} xs={24} style={{ marginTop: 10 }} >
                <Button variant="danger" onClick={(val) => {setState({ ...state, StatusSort: 'Open' });}} style={{ borderColor: StatusSort == "Open" ? '#5F63F2' : null }}>Open</Button>
                <Button variant="primary" onClick={(val) => {setState({ ...state, StatusSort: 'Closed' });}} style={{ borderColor: StatusSort == "Closed" ? '#5F63F2' : null }}>Closed</Button>
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
                  <Route path={path} render={(props) => <RemindersList {...props} loader={loader} filterReminders={filterReminders} StatusSort={StatusSort} onReminderStatusChange={(reminders) => {setState({...state, filterReminders: reminders})}} /> }  exact />
                  <Route path={`${path}/grid`}  render={(props) => <RemindersList {...props} loader={loader} filterReminders={filterReminders} StatusSort={StatusSort} onReminderStatusChange={(reminders) => {setState({...state, filterReminders: reminders})}}/> }/>
                  <Route path={`${path}/list`}  render={(props) => <RemindersList {...props} loader={loader} filterReminders={filterReminders}  StatusSort={StatusSort} onReminderStatusChange={(reminders) => {setState({...state, filterReminders: reminders})}}/> }/>
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