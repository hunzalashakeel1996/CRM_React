import { Col, Row, Select, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';

import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, uploadUrl, TicketStatusChangeAPI, insertDeviceToken } from '../../redux/apis/DataAction';
import { filterProjectByStatus, sortingProjectByCategory } from '../../redux/project/actionCreator';
import { connectSocket } from '../../redux/socket/socketAction';
import { addAllTickets, addTicket, addDepart } from '../../redux/ticket/actionCreator';
import { Main } from '../styled';
import CreateTicket from './overview/CreateTicket';
import { ProjectHeader, ProjectSorting } from './style';
import { useHistory } from "react-router-dom";
import firebase from './../../firebase';
const Grid = lazy(() => import('./overview/Grid'));
const TicketsList = lazy(() => import('./overview/TicketsList'));
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const ViewTickets = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = props.match;
  const [state, setState] = useState({
    visible: false,
    categoryActive: 'all',
    filterTickets: [],
    loader: true,
    StatusSort: 'Open'
  });
  const { visible, loader, filterTickets, StatusSort } = state;

  // get items from redux
  let tickets = useSelector(state => state.tickets.tickets);
  let depart = useSelector(state => state.tickets.depart);
  let socket = useSelector(state => state.socket.socket);
  let user = useSelector(state => state.auth.login);

  let mount = false

  useEffect(() => {
    setState({ ...state, loader: true })
    if (window.navigator.platform === 'Win32') {
      Notification.requestPermission().then(permission => {
        console.log('grad', permission)
        if (permission == 'denied') {
          alert('Please give permission for notification from (i) icon')
        }

        if (permission == 'granted') {
          firebase.messaging().getToken()
            .then(token => {
              // save token in data base api
              let data = { deviceToken: token, jwtToken: user.jwtToken, loginName: user.LoginName }
              dispatch(insertDeviceToken(data))
            })
            .catch(e => {
              // console.log('check error')
            })
        }
      });
    }

    // get tickets 
    dispatch(TicketStatusChangeAPI({ LoginName: user.LoginName, StatusSort: "Open"})).then(data => {
      // dispatch(addAllTickets(data))
      setState({ ...state, filterTickets: data, loader: false });
    })

    // if (depart.length === 0)
    // get departments for users 
    // dispatch(getDepartsAPI({})).then(departs => {
    //   dispatch(addDepart(departs))
    //   // setState({ ...state, departs, loader: false  });
    // })
  }, []);

  // sockets
  socket ? socket.onmessage = (data) => {
    let message = JSON.parse(data.data)
    
    if (message.reason === 'newTicket' ) {
      let descData = message.data.data
      if(descData.CreateBy !== user.LoginName){
        audioPlay()
        let temp = [...filterTickets]
        temp.unshift(descData)
        setState({ ...state, filterTickets: [...temp] });
      }
    }
  } : null

  const handleSearch = (searchText, objectName) => {
    let temp = tickets.filter(item => item[objectName].toUpperCase().includes(searchText.toUpperCase()))
    setState({ ...state, filterTickets: temp, });
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
    setState({ ...state, visible: true });
  };

  const onCancel = () => {
    setState({ ...state, visible: false });
  };

  const onAddTicket = (form) => {
    setState({ ...state, loader: true })
    form = { ...form, LoginName: `${user.LoginName}`, FromTicketGroup: `${user.GroupName}` }
    if (form.Attachment !== null) {
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
      form = { ...form }
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

  const onStatusChange = (val) => {
    setState({ ...state, loader: true, StatusSort: val })
    let data = { StatusSort: val, LoginName: `${user.LoginName}` }
    dispatch(TicketStatusChangeAPI(data)).then(res => {
      setState({ ...state, filterTickets: res, loader: false, StatusSort: val });
    })
  }

  return (
    <>
      <ProjectHeader>
        <PageHeader
          ghost
          title="Tickets"
          // subTitle={<>{tickets.length} Running Tickets</>}
          buttons={[
             <Button disbaled={loader} size="large"  onClick={showModal} key="1" type="primary"  >
              <FeatherIcon icon="plus" size={16} /> Create Ticket
            </Button>,
          ]}
        />
      </ProjectHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Row style={{ marginBottom: 10 }} gutter={10}>
              <Col sm={12} md={8} lg={5} xs={24} >
                <div className="project-sort-search" style={{marginBottom:10, }}>
                  <AutoComplete  onSearch={(e) => { handleSearch(e, 'TicketNo') }} placeholder="Ticket Number" patterns />
                </div>
              </Col>

              <Col sm={12} md={8} lg={5} xs={24}>
                <div className="project-sort-search" style={{marginBottom:10, }}>
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'OrderNo') }} placeholder="Order Number" patterns />
                </div>
              </Col>

              <Col sm={12} md={8} lg={5} xs={24}>
                <div className="project-sort-search" style={{marginBottom:10, }}>
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'CustomerName') }} placeholder="Customer Name" patterns />
                </div>
              </Col>
              <Col sm={12} md={8} lg={5} xs={24}>
                <div className="project-sort-search" style={{marginBottom:10, }}>
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'TicketTitle') }} placeholder="Reason" patterns />
                </div>
              </Col>

              <Col xs={24} style={{ marginTop: 10 }} >
                 <Button size="large"  variant="danger" onClick={(val) => onStatusChange('Open')} style={{ borderWidth: 1, borderColor: StatusSort == "Open" ? '#5F63F2' : null }}>Open</Button>
                 <Button size="large"  variant="danger" onClick={(val) => onStatusChange('Waiting')} style={{ borderWidth: 1, borderColor: StatusSort == "Waiting" ? '#5F63F2' : null }}>Waiting</Button>
                 <Button size="large"  variant="danger" onClick={(val) => onStatusChange('FollowUp')} style={{ borderWidth: 1, borderColor: StatusSort == "FollowUp" ? '#5F63F2' : null }}>FollowUp</Button>
                 <Button size="large"  variant="primary" onClick={(val) => onStatusChange('Closed')} style={{ borderWidth: 1, borderColor: StatusSort == "Closed" ? '#5F63F2' : null }} >Closed</Button>
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
                  <Route path={path} render={(props) => <TicketsList {...props} loader={loader} filterTickets={filterTickets} StatusSort={StatusSort} />} exact />
                  <Route path={`${path}/grid`} render={(props) => <TicketsList {...props} loader={loader} filterTicket={filterTickets} StatusSort={StatusSort} />} />
                  <Route path={`${path}/list`} render={(props) => <TicketsList {...props} loader={loader} filterTicket={filterTickets} StatusSort={StatusSort} />} />
                </Suspense>
              </Switch>
            </div>
          </Col>
        </Row>
       <CreateTicket onAdd={(form) => { onAddTicket(form) }} onCancel={onCancel} visible={visible} loader={loader} />
      </Main>
    </>
  );
};

// ViewTickets.propTypes = {
//   props.match: propTypes.object,
// };

export default ViewTickets;



// <ProjectSorting>
//               <div className="project-sort-bar">
//                 <div className="project-sort-nav">
//                   <nav>
//                     <ul>
//                       <li className={state.categoryActive === 'all' ? 'active' : 'deactivate'}>
//                         <Link onClick={() => onChangeCategory('all')} to="#">
//                           All
//                         </Link>
//                       </li>
//                       <li className={state.categoryActive === 'progress' ? 'active' : 'deactivate'}>
//                         <Link onClick={() => onChangeCategory('progress')} to="#">
//                           In Progress
//                         </Link>
//                       </li>
//                       <li className={state.categoryActive === 'complete' ? 'active' : 'deactivate'}>
//                         <Link onClick={() => onChangeCategory('complete')} to="#">
//                           Complete
//                         </Link>
//                       </li>
//                       <li className={state.categoryActive === 'late' ? 'active' : 'deactivate'}>
//                         <Link onClick={() => onChangeCategory('late')} to="#">
//                           Late
//                         </Link>
//                       </li>
//                       <li className={state.categoryActive === 'early' ? 'active' : 'deactivate'}>
//                         <Link onClick={() => onChangeCategory('early')} to="#">
//                           Early
//                         </Link>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>
//                 <div className="project-sort-search">
//                   <AutoComplete onSearch={handleSearch} placeholder="Ticket Number" patterns />
//                 </div>

//                 <div className="project-sort-group">
//                   <div className="sort-group">
//                     <span>Sort By:</span>
//                     <Select onChange={onSorting} defaultValue="category">
//                       <Select.Option value="category">Project Category</Select.Option>
//                       <Select.Option value="rate">Top Rated</Select.Option>
//                       <Select.Option value="popular">Popular</Select.Option>
//                       <Select.Option value="time">Newest</Select.Option>
//                       <Select.Option value="price">Price</Select.Option>
//                     </Select>
//                     {/* <div className="layout-style">
//                       <NavLink to={`${path}/grid`}>
//                         <FeatherIcon icon="grid" size={16} />
//                       </NavLink>
//                       <NavLink to={`${path}/list`}>
//                         <FeatherIcon icon="list" size={16} />
//                       </NavLink>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             </ProjectSorting>
