import { Col, Row, Table, Spin, Select, Button, Input, Descriptions, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
import { ProjectList, ProjectListTitle } from '../style';
import {formatDate} from '../../../components/time/formatDate'
import { Modal } from '../../../components/modals/antd-modals';
import {reminderStatusChangeAPI} from '../../../redux/apis/DataAction'

const { Option } = Select;


const RemindersList = (props) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    reminders: props.filterReminders,
    current: 0,
    pageSize: 0,
    visible: false,
    selectedReminderDetail: null,
    filterstate: []
  });
  const { reminders, selectedReminderDetail, visible } = state;

  useEffect(() => {
    // if reminders find in props i,e open on same page
    if (props.filterReminders) {
      console.log('1', props.filterReminders)
      setState({
        ...state,
        reminders: props.filterReminders.filter(val => val.Status === props.StatusSort),
      });
    }
    // when page open through notification press
    if (props.match.params.ReminderID && props.filterReminders.length > 0) {
      setTimeout(() => {
        setState({
          ...state, visible: true,
          selectedReminderDetail: props.filterReminders.filter(val => val.ReminderID === JSON.parse(props.match.params.ReminderID))[0]
        })
      }, 500);
    }
  }, [props.filterReminders]);

  useEffect(() => {
    console.log('2', props.filterReminders)

    setState({
      ...state,
      reminders: props.filterReminders.filter(val => val.Status === props.StatusSort),
    });
  }, [props.StatusSort]);

  const onShowSizeChange = (current, pageSize) => {
        setState({ ...state, current, pageSize });
    };

    const onHandleChange = (current, pageSize) => {
        // You can create pagination in here
        setState({ ...state, current, pageSize });
    };

    const handleCancel = () => {
        setState({
            ...state,
            visible: false,
        });
    };

    const onOpenModal = (val) => {
        setState({
            ...state,
            visible: true,
            selectedReminderDetail: val
        });
    };
      
    const onStatusChange = (event) => {
        let temp = [...props.filterReminders]
        let index = temp.findIndex(val => {return val.ReminderID === selectedReminderDetail.ReminderID})
        temp[index] = {...temp[index], Status: event.target.value}

        let data = {ReminderID: selectedReminderDetail.ReminderID, Status: event.target.value}
        dispatch(reminderStatusChangeAPI(data))
        props.onReminderStatusChange(temp)
    }

  const dataSource = [];
  let counter = 0;

  if (reminders.length)
  reminders.map(value => {
      const { Status, EndTime, RefrenceId, ReminderType, TicketGroup, Message, Assigned, CreateBy, StartTime, } = value;

      return dataSource.push({
        key: counter++,
        Message: (
          <ProjectListTitle>
            <Heading as="h4">
              <Link to={'#'} onClick={() => {onOpenModal(value)}}>{Message}</Link>
            </Heading>
            {/* <p>{ticketNumber}</p> */}
            {/* <p>{comments.length>0? comments[comments.length-1].shortDesc: 'No comments at this ticket yet'}</p> */}
          </ProjectListTitle>
          ),
          RefrenceId: <Link to={'#'} onClick={() => {onOpenModal(value)}}><span style={{ color: 'black' }} className="date-started">{RefrenceId !== 'null' ? RefrenceId : '-'}</span></Link>,
          CreateBy: <Link to={'#'} onClick={() => {onOpenModal(value)}}><span style={{ color: 'black' }} className="date-started">{CreateBy}</span></Link>,
          ReminderType: <Link to={'#'} onClick={() => {onOpenModal(value)}}><span style={{ color: 'black' }} className="date-started">{ReminderType}</span></Link>,
          Assigned: <Link to={'#'} onClick={() => {onOpenModal(value)}}><span style={{ color: 'black' }} className="date-started">{Assigned} {TicketGroup && `(${TicketGroup})`}</span></Link>,
          StartTime: <Link to={'#'} onClick={() => {onOpenModal(value)}}><span style={{ color: 'black' }} className="date-started">{formatDate(StartTime)}</span></Link>,
          EndTime: <Link to={'#'} onClick={() => {onOpenModal(value)}}><span style={{ color: 'black' }} className="date-started">{formatDate(EndTime)}</span></Link>,
          Status: <Link to={'#'} onClick={() => {onOpenModal(value)}}><span style={{ color: 'black' }} className="date-started">{Status}</span></Link>,
      });
  });

  const columns = [
    {
      title: 'Message',
      dataIndex: 'Message',
      key: 'Message',
    },
    {
      title: 'RefrenceId',
      dataIndex: 'RefrenceId',
      key: 'RefrenceId',
    },
    {
      title: 'CreateBy',
      dataIndex: 'CreateBy',
      key: 'CreateBy',
    },
    {
      title: 'ReminderType',
      dataIndex: 'ReminderType',
      key: 'ReminderType',
    },
    {
      title: 'Assigned',
      dataIndex: 'Assigned',
      key: 'Assigned',
    },
    {
      title: 'StartTime',
      dataIndex: 'StartTime',
      key: 'StartTime',
    },
    {
      title: 'EndTime',
      dataIndex: 'EndTime',
      key: 'EndTime',
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
      },
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
          {visible && <Modal
              type={'primary'}
              title="Change Status"
              visible={visible}
              // footer={[
              //   <div key="1" className="project-modal-footer">
              //     <Button size="default" type="primary" key="submit" onClick={onFinish}>
              //       Add New Ticket
              //     </Button>
              //     <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
              //       Cancel
              //     </Button>
              //   </div>,
              // ]}
              footer={null}
              onCancel={handleCancel}
          >
              <Descriptions bordered size={'center'}>
                  <Descriptions.Item label="Message">{selectedReminderDetail.Message}</Descriptions.Item>
                  {selectedReminderDetail.RefrenceId !== 'null' && <Descriptions.Item label="ReferenceId">{selectedReminderDetail.RefrenceId}</Descriptions.Item>}
              </Descriptions>,
              <Descriptions bordered size={'center'}>
                  <Descriptions.Item label="Create By">{selectedReminderDetail.CreateBy}</Descriptions.Item>
                  <Descriptions.Item label="Reminder Type">{selectedReminderDetail.ReminderType}</Descriptions.Item>
              </Descriptions>,
              <Descriptions bordered size={'center'}>
                  <Descriptions.Item label="Start Date">{formatDate(selectedReminderDetail.StartTime)}</Descriptions.Item>
              </Descriptions>,
              <Descriptions bordered size={'center'}>
                  <Descriptions.Item label="End Date">{formatDate(selectedReminderDetail.EndTime)}</Descriptions.Item>
              </Descriptions>,
              <Descriptions bordered size={'center'}>
                  <Descriptions.Item label="Status">
                      <Radio.Group onChange={onStatusChange} name="radiogroup" defaultValue={selectedReminderDetail.Status}>
                          <Radio value={'Open'}>Open</Radio>
                          <Radio value={'Closed'}>Closed</Radio>
                      </Radio.Group>
                  </Descriptions.Item>
              </Descriptions>,


              <div style={{marginTop: 10, textAlign: 'end'}}>
                  <Button type="primary" size="default" onClick={handleCancel}>Save</Button>
              </div>
          </Modal>}

          {/* <Col xs={24} className="pb-30">
        <ProjectPagination>
          {reminders.length ? (
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

export default RemindersList;
