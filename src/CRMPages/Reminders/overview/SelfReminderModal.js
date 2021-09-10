import { Col, DatePicker, Form, Input, Row, Select, Spin, Checkbox } from 'antd';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
const { RangePicker } = DatePicker;
const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};
const validateMessages = {
    required: '${name} is required!',
    types: {
        email: '${name} is not validate email!',
        number: '${name} is not a validate number!',
    },
    number: {
        range: '${name} must be between ${min} and ${max}',
    },
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 25 },
};

const SelfReminderModal = ({ visible, onCancel, onAdd, ticketDetail, loader }) => {
    let depart = useSelector(state => state.tickets.depart);
    let user = useSelector(state => state.auth.login);
    const [form] = Form.useForm();

    const [state, setState] = useState({
        visible,
        modalType: 'primary',
        checked: [],
        isSelfAssigned: false,
        departmentName: '',
        assignedTo: ''
    });

    const {modalType, checked, isSelfAssigned, departmentName, assignedTo} = state

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            setState({
                ...state,
                visible,
            });
        }
        return () => {
            unmounted = true;
        };
    }, [visible]);

    const onFinish = values => {
        onAdd(values)
    };

    const handleCancel = () => {
        onCancel();
    };

    const reasons = {
        'SHIPPING': ['Rush Free', 'Shipping Charges', 'Bad Address Correction'],
        'EMBROIDERY': ['Sew Out', 'Stitch Out', 'Price'],
        'MTO': ['Rush Free', 'How long will it take to ship', 'Alteration']
    }

    const members = {
        'SHIPPING': ['William', 'Judy', 'James'],
        'EMBROIDERY': ['Harper', 'Mason', 'Ella'],
        'MTO': ['Jackson', 'David', 'Jack']
    }

    const onSelfAssignCheckboxChange = () => {
        if (!isSelfAssigned)
            form.resetFields(['Assigned'])
        form.setFieldsValue({ Assigned: !isSelfAssigned ? user.LoginName : '' })
        setState({ ...state, isSelfAssigned: !isSelfAssigned, departmentName: '', assignedTo: !isSelfAssigned ? user.LoginName : '' })
    }

    return (
        <Modal
            type={modalType}
            title="Create Reminder"
            visible={true}
            // footer={[
            //   <div key="1" className="project-modal-footer">
            //      <Button size="large"    type="primary" key="submit" onClick={onFinish}>
            //       Add New Ticket
            //     </Button>
            //      <Button size="large"    type="white" key="back" outlined onClick={handleCancel}>
            //       Cancel
            //     </Button>
            //   </div>,
            // ]}
            footer={null}
            onCancel={handleCancel}
        >
            <Spin spinning={loader}>
                <div className="project-modal">
                    <BasicFormWrapper>
                        <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>
                            {/* <Form.Item name={'reason'} label="" rules={[{ required: true }]}>
              <Input placeholder="Ticket Reason" />
            </Form.Item>
            <Form.Item name={'assigned'} label="" rules={[{ required: true }]}>
              <Input placeholder="Assigned" />
            </Form.Item>
            <Form.Item name="From" initialValue="" label="" rules={[{ required: true }]}>
              <Select style={{ width: '100%' }}>
                <Option value="">From</Option>
                <Option value="CSR">CSR</Option>
                <Option value="SHIPPING">SHIPPING</Option>
              </Select>
            </Form.Item> */}
                            <Row gutter={20}>
                                <Col span={16}>
                                    <Form.Item name="range-time-picker" label="" {...rangeConfig}>
                                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="ReminderType" initialValue="Open" label="" rules={[{ required: true }]}>
                                        <Select style={{ width: '100%' }} >
                                            <Option value="">Reminder Type</Option>
                                            <Option value="Open">Open</Option>
                                            <Option value="Completed">Completed</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={10} style={{ marginBottom: 20 }}>

                                <Col span={12}>
                                    <Form.Item name="TicketGroup" initialValue="" label="">
                                        <Select disabled={isSelfAssigned} style={{ width: '100%' }} onChange={(val) => { setState({...state, departmentName: val}) }}>
                                            <Option value="">To</Option>
                                            <Option value="CSR">CSR</Option>
                                            <Option value="Processing">Processing</Option>
                                            <Option value="Shipping">Shipping</Option>
                                        </Select>
                                    </Form.Item>

                                </Col>

                                <Col span={12}>
                                    <Form.Item name="Assigned" initialValue="" label=""  rules={[{ required: true }]}>
                                        {(depart.length > 0 && departmentName !== '') ?
                                            <Select onChange={(val) => {form.setFieldsValue({Assigned: val})}} style={{ width: '100%' }}>
                                                <Option value="">Assigned</Option>
                                                {depart.filter((val) => val.GroupName === departmentName).map(member => (
                                                    <Option value={member.Username}>{member.Username}</Option>
                                                ))}
                                            </Select>
                                            :
                                            <Input value={assignedTo} onChange={(e) => {setState({...state, assignedTo: e.target.value}); form.setFieldsValue({Assigned: e.target.value})}} disabled={isSelfAssigned} placeholder="Assigned To" />
                                        }
                                        <Checkbox checked={isSelfAssigned} onChange={onSelfAssignCheckboxChange}>Self Assign</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item name='Message' label="" rules={[{ required: true }]}>
                                <Input.TextArea placeholder="Message" />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                                 <Button size="large"  type="primary" htmlType="submit">
                                    Submit
                                    </Button>
                            </Form.Item>
                        </Form>
                    </BasicFormWrapper>
                </div>
            </Spin>
        </Modal>
    );
};

SelfReminderModal.propTypes = {
    visible: propTypes.bool.isRequired,
    onCancel: propTypes.func.isRequired,
    onAdd: propTypes.func.isRequired,
};

export default SelfReminderModal;


// <Form name="createProject" onFinish={handleOk}>
//             <Form.Item name="reason" label="">
//               <Input placeholder="Ticket Reason" />
//             </Form.Item>
//             <Form.Item name="assigned" label="">
//               <Input placeholder="Assigned" />
//             </Form.Item>
//             <Form.Item name="From" initialValue="" label="">
//               <Select style={{ width: '100%' }}>
//                 <Option value="">From</Option>
//                 <Option value="one">CSR</Option>
//                 <Option value="two">SHIPPING</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item name="To" initialValue="" label="">
//               <Select style={{ width: '100%' }}>
//                 <Option value="">To</Option>
//                 <Option value="one">CSR</Option>
//                 <Option value="two">SHIPPING</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item name="orderNumber" label="">
//               <Input placeholder="Order Number" />
//             </Form.Item>
//             <Form.Item name="customer" label="">
//               <Input placeholder="Customer Name" />
//             </Form.Item>
//             <Form.Item name="phone" label="">
//               <Input placeholder="Phone" />
//             </Form.Item>
//             <Form.Item name="zip" label="">
//               <Input placeholder="Zip Code" />
//             </Form.Item>
//             {/* <Form.Item name="pricacy" initialValue={['team']} label="Project Privacy">
//               <CheckboxGroup options={options} />
//             </Form.Item>
//             <Form.Item name="members" label="Project Members">
//               <Input placeholder="Search Members" />
//             </Form.Item>
//             <div className="projects-members mb-30">
//               <img style={{ width: '35px' }} src={require(`../../../static/img/users/1.png`)} alt="" />
//               <img style={{ width: '35px' }} src={require(`../../../static/img/users/2.png`)} alt="" />
//               <img style={{ width: '35px' }} src={require(`../../../static/img/users/3.png`)} alt="" />
//               <img style={{ width: '35px' }} src={require(`../../../static/img/users/4.png`)} alt="" />
//               <img style={{ width: '35px' }} src={require(`../../../static/img/users/5.png`)} alt="" />
//             </div>
//             <Row gutter={15}>
//               <Col md={12}>
//                 <Form.Item name="start" label="Start Date">
//                   <DatePicker placeholder="mm/dd/yyyy" format={dateFormat} />
//                 </Form.Item>
//               </Col>
//               <Col md={12}>
//                 <Form.Item name="end" label="End Date">
//                   <DatePicker placeholder="mm/dd/yyyy" format={dateFormat} />
//                 </Form.Item>
//               </Col>
//             </Row> */}
//           </Form>
