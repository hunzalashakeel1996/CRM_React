import { Col, Form, Input, Row, Select, Spin, Upload } from 'antd';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

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

const createComment = ({ visible, onCancel, onAdd, loader }) => {
    let depart = useSelector(state => state.tickets.depart);

    const [state, setState] = useState({
        visible,
        modalType: 'primary',
        checked: [],
        picturePath: null
    });

    const [departmentName, setDepartmentName] = useState(Cookies.get('commentTicketGroup')?Cookies.get('commentTicketGroup'):'CSR');

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            setState({
                visible,
            });
        }
        return () => {
            unmounted = true;
        };
    }, [visible]);

    const onFinish = values => {
        values = { ...values, picturePath: state.picturePath }
        document.getElementById("new_comment").reset();
        onAdd(values)
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleEnter =(event) => {
        if (event.keyCode === 13) {
          const form = event.target.form;
          const index = Array.prototype.indexOf.call(form, event.target);
          form.elements[index + 1]&&form.elements[index + 1].focus();
          event.preventDefault();
        }
      }

    return (
        <Modal
            type={state.modalType}
            title="Add Comment"
            visible={state.visible === 'createComment'}
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
                        <Form {...layout} id="new_comment" onKeyDown={(value) => {handleEnter(value)}} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
                            <Form.Item name={'Description'} label="" rules={[{ required: true }]}>
                                <Input autoFocus={true} placeholder="Short Description" />
                            </Form.Item>
                            <Form.Item name={'Subject'} label="" rules={[{ required: true }]}>
                                <Input placeholder="Work Notes" />
                            </Form.Item>

                            <Row gutter={10} style={{ marginBottom: 20 }}>

                                <Col span={12}>
                                    <Form.Item name="TicketGroup" label="">
                                        <Select  defaultValue={Cookies.get('commentTicketGroup')?Cookies.get('commentTicketGroup'):'CSR'} style={{ width: '100%' }} onChange={(val) => { setDepartmentName(val); Cookies.set('commentTicketGroup', val) }}>
                                            <Option value="CSR">CSR</Option>
                                            <Option value="Processing">Processing</Option>
                                            <Option value="Shipping">Shipping</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="Assigned" initialValue="" label="" rules={[{ required: true }]}>
                                        {(depart.length > 0 && departmentName !== '') ?
                                            <Select showSearch style={{ width: '100%' }}>
                                                <Option value="">Assigned</Option>
                                                {depart.filter((val) => val.GroupName === departmentName).map(member => (
                                                    <Option value={member.Username}>{member.Username}</Option>
                                                ))}
                                            </Select>
                                            :
                                            <Input placeholder="Assigned To" />
                                        }
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: 10 }}>
                                <Upload beforeUpload={() => false} onChange={(pic) => { setState({ ...state, picturePath: pic }) }} onRemove={() => { setState({ ...state, picturePath: null }) }}>
                                     <Button size="large"  style={{ borderWidth: 0.5, borderColor: '#ebebeb' }} icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Row>

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

createComment.propTypes = {
    visible: propTypes.bool.isRequired,
    onCancel: propTypes.func.isRequired,
    onAdd: propTypes.func.isRequired,
};

export default createComment;