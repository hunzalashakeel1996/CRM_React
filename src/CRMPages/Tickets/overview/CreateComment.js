import { Col, Form, Input, Row, Select, Spin, Upload } from 'antd';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import { BasicFormWrapper } from '../../styled';
import { useDispatch, useSelector } from 'react-redux';

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

    const [departmentName, setDepartmentName] = useState('');

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

    const reasons = {
        'SHIPPING': ['Rush Free', 'Shipping Charges', 'Bad Address Correction', 'Upgrade Shipping To 2nd or NDA'],
        'EMBROIDERY': ['Sew Out', 'Stitch Out', 'Price', 'Thread Details', 'How Long Will It Take To Ship', 'Rush Fee'],
        'MTO': ['Rush Free', 'How long will it take to ship', 'Alteration', 'General Question', 'Product Related Question']
    }

    const members = {
        'SHIPPING': ['William', 'Judy', 'James'],
        'EMBROIDERY': ['Harper', 'Mason', 'Ella'],
        'MTO': ['Jackson', 'David', 'Jack']
    }

    return (
        <Modal
            type={state.modalType}
            title="Add Comment"
            visible={state.visible === 'createComment'}
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
            <Spin spinning={loader}>
                <div className="project-modal">
                    <BasicFormWrapper>
                        <Form {...layout} id="new_comment" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
                                <Input placeholder="Short Description" />
                            </Form.Item>
                            <Form.Item name={'Subject'} label="" rules={[{ required: true }]}>
                                <Input placeholder="Work Notes" />
                            </Form.Item>

                            <Row gutter={10} style={{ marginBottom: 20 }}>

                                <Col span={12}>
                                    <Form.Item name="TicketGroup" initialValue="" label="">
                                        <Select style={{ width: '100%' }} onChange={(val) => { setDepartmentName(val) }}>
                                            <Option value="">To</Option>
                                            <Option value="CSR">CSR</Option>
                                            <Option value="Processing">Processing</Option>
                                            <Option value="Shipping">Shipping</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="Assigned" initialValue="" label="" rules={[{ required: true }]}>
                                        {(depart.length > 0 && departmentName !== '') ?
                                            <Select style={{ width: '100%' }}>
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
                                    <Button style={{ borderWidth: 0.5, borderColor: '#ebebeb' }} icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Row>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                                <Button type="primary" htmlType="submit">
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