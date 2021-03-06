import { Col, Row, Table, Spin} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
import { ProjectList, ProjectListTitle } from '../style';
import {formatDate} from '../../../components/time/formatDate'

const TicketsList = (props) => {
  
  let ticket = useSelector(state => state.tickets.tickets );
  let user = useSelector(state => state.auth.login);
  

  const [state, setState] = useState({
    tickets: props.filterTickets,
    current: 0,
    pageSize: 0,
  });
  const { tickets } = state;

  useEffect(() => {
    if (props.filterTickets) {
      setState({
        tickets: props.filterTickets,
      });
    }
  }, [props.filterTickets]);

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  const dataSource = [];
  let counter = 0;

  if (tickets.length)
  tickets.map(value => {
      const { TicketNo, CreateDate, CustomerName, TicketTitle, TicketGroup, OrderNo, Assigned, Status, UpdateDate, CreateBy } = value;
      return dataSource.push({
        key: counter++,
        TicketTitle: (
          <ProjectListTitle>
            <Heading as="h4">
              <Link to={{pathname:`/admin/ticket/ticketDetails/${TicketNo}`, ticket:{value}}}><span style={{color: user.LoginName ===Assigned? 'blue':'black' }}>{TicketTitle}</span></Link>
            </Heading>
            {/* <p>{ticketNumber}</p> */}
            {/* <p>{comments.length>0? comments[comments.length-1].shortDesc: 'No comments at this ticket yet'}</p> */}
          </ProjectListTitle>
        ),
        TicketNo: <Link  to={{pathname:`/admin/ticket/ticketDetails/${TicketNo}`, ticket:{value}}}><span style={{color: user.LoginName ===Assigned? 'blue':'black' }} className="date-started">{TicketNo}</span></Link>,
        Status: <Link to={{pathname:`/admin/ticket/ticketDetails/${TicketNo}`, ticket:{value}}}><span style={{color: user.LoginName ===Assigned? 'blue':'black' }} className="date-started">{Status}</span></Link>,
        orderNumber: <Link to={{pathname:`/admin/ticket/ticketDetails/${TicketNo}`, ticket:{value}}}><span style={{color: user.LoginName ===Assigned? 'blue':'black' }} className="date-started">{[null,'null', ''].includes(OrderNo) ? '-': OrderNo}</span></Link>,
        Assigned: <Link to={{pathname:`/admin/ticket/ticketDetails/${TicketNo}`, ticket:{value}}}><span style={{color: user.LoginName ===Assigned? 'blue':'black' }} className="date-started">{Assigned} </span></Link>,
        CustomerName: <Link to={{pathname:`/admin/ticket/ticketDetails/${TicketNo}`, ticket:{value}}}><span style={{color: user.LoginName ===Assigned? 'blue':'black' }} className="date-started">{[null,'null', ''].includes(CustomerName)?'-':CustomerName}</span></Link>,
        createdBy: <Link to={{pathname:`/admin/ticket/ticketDetails/${TicketNo}`, ticket:{value}}}><span style={{color: user.LoginName ===Assigned? 'blue':'black' }} className="date-started">{CreateBy}</span></Link>,
        createdAt: <Link to={{pathname:`/admin/ticket/ticketDetails/${TicketNo}`, ticket:{value}}}><span style={{color: user.LoginName ===Assigned? 'blue':'black' }} className="date-started">{[undefined, null,'null', ''].includes(UpdateDate) ? '-': formatDate(UpdateDate)}</span></Link>,
        
      });
    });

  const columns = [
    {
      title: 'Reason',
      dataIndex: 'TicketTitle',
      key: 'TicketTitle',
    },
    {
      title: 'Ticket Number',
      dataIndex: 'TicketNo',
      key: 'TicketNo',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'Status',
    //   key: 'Status',
    // },
    {
      title: 'Assigned To',
      dataIndex: 'Assigned',
      key: 'Assigned',
    },
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: 'Customer Name',
      dataIndex: 'CustomerName',
      key: 'CustomerName',
    },
    {
      title: 'Last Update',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    // {
    //   title: 'Assigned To',
    //   dataIndex: 'Assigned',
    //   key: 'Assigned',
    // },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    // {
    //   title: 'Completion',
    //   dataIndex: 'completion',
    //   key: 'completion',
    // },

    // {
    //   title: '',
    //   dataIndex: 'action',
    //   key: 'action',
    // },
  ];

  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Cards headless>
          <ProjectList>
            {!props.loader ?
              <div className="table-responsive">
                <Table pagination={true} dataSource={dataSource} columns={columns} />
              </div>
              :
              <div style={{ textAlign: 'center' }}>
                <Spin />
              </div>
            }

          </ProjectList>
        </Cards>
      </Col>
      {/* <Col xs={24} className="pb-30">
        <ProjectPagination>
          {tickets.length ? (
            <Pagination
              onChange={onHandleChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSize={10}
              defaultCurrent={1}
              total={40}
            />
          ) : null}
        </ProjectPagination>
      </Col> */}
    </Row>
  );
};

export default TicketsList;
