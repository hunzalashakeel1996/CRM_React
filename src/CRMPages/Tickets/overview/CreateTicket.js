import { Col, Form, Input, InputNumber, Row, Select, Spin, Upload  } from 'antd';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';

import { Button } from '../../../components/buttons/buttons';
import { Modal } from '../../../components/modals/antd-modals';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { BasicFormWrapper } from '../../styled';
import ImageUploader from 'react-images-upload';
// import { uploadParentSingupImages } from './../../../redux/apis/DataAction';
import InputMask from 'react-input-mask';
import { getCustomerDetailAPI } from '../../../redux/apis/DataAction';
import CustomerAutoComplete from '../../../components/customerDetailAutoComplete/CustomerAutoComplete';
import Cookies from 'js-cookie';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
const assignedToDefault={'CSR': 'Kristy', 'Processing': 'Pat', 'Shipping': 'Adnan'}

const formInit = {
  TicketGroup: '',
  Assigned: '',
  TicketTitle: '',
  Subject: '',
  Description: '',
  OrderNo: '',
  CustomerName: '',
  CustomerContact: '',
  ZipCode: '',
  Attachment: null,
}

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

const CreateTicket = ({ visible, onCancel, onAdd, loader }) => {
  let depart = useSelector(state => state.tickets.depart);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
    controls:{...formInit},
    customerDetails: [],
    assignedUsers: ['Kristy', 'Pat', 'Adnan'],
    isLoading: false
  });

  const {modalType, checked, controls, isLoading, customerDetails} = state

  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    let unmounted = false;
    let tempControls = {...controls}
    tempControls.Assigned = assignedToDefault[controls.TicketGroup]
    tempControls.TicketGroup = Cookies.get('TicketGroup')?Cookies.get('TicketGroup'):'CSR'
    if (!unmounted) {
      setState({
        ...state,
        controls: {...tempControls},
        visible,
      });
    }
    else{
      setState({
        ...state,
        controls: {...tempControls},
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const onFinish = values => {
    // values = { ...values, TicketTitle: state.selectedReason, picturePath: state.picturePath }
    form.resetFields();
    onAdd(controls)
    setState({ ...state, controls: formInit })
  };

  const handleCancel = () => {
    form.resetFields();
    setState({ ...state, controls: formInit })
    onCancel();
  };

  const onValueChange = (name, value) => {
    let temp = {...controls}
    temp[name] = value

    if('TicketGroup'===name){
      Cookies.set(name, value)
      temp['Assigned'] = assignedToDefault[value]
    }
    setState({ ...state, controls: {...temp} })

    
  }

  const onCustomerDetailSelected = (name, value) => {
    let details = customerDetails.filter(val => val[name]===value)
    form.setFieldsValue({ OrderNo:details[0].OrderNo, CustomerName: details[0].FullName, ZipCode: details[0].ZipCode, CustomerContact: details[0].PhoneNumber })
    let temp = { ...controls, OrderNo:details[0].OrderNo,  CustomerName: details[0].FullName, ZipCode: details[0].ZipCode, CustomerContact: details[0].PhoneNumber }
    setState({...state, controls: temp})
  }

  const getCustomerDetail = (name, value) => {
    if (value.length > 0) {
      setState({...state, isLoading: true})
      dispatch(getCustomerDetailAPI({ name, value })).then(res => {
        setState({...state, isLoading: false})
        // if only one customer detail fetched then auto fill fields
        if (res.length == 1) {
          form.setFieldsValue({ OrderNo:res[0].OrderNo, CustomerName: res[0].FullName, ZipCode: res[0].ZipCode, CustomerContact: res[0].PhoneNumber })
          let temp = { ...controls, OrderNo:res[0].OrderNo,  CustomerName: res[0].FullName, ZipCode: res[0].ZipCode, CustomerContact: res[0].PhoneNumber }
          setState({ ...state, controls: temp, customerDetails: res})

        } else if (res.length > 1) {
          setState({ ...state, customerDetails: res})
        }
      })
    }
  }

  const handleEnter =(event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1]&&form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  // const onAction = () => {
  //   const data = new FormData()
  //   data.append('imagesData', state.picturePath.file)
  //   dispatch(uploadParentSingupImages(options)).then(res => {

  //   })
  //   // if (state.picturePath.file.status === undefined) {
  //   //   const data = new FormData()
  //   //   data.append('imagesData', state.picturePath.file)
  //   //   fetch('http://192.168.5.110:3000/api/ticket/imageUpload', {
  //   //     method: 'POST',
  //   //     body: data
  //   //   }).then((res) => {
  //   //     return res.json()
  //   //   }).then(res => {
  //   //     return res
  //   //   }).catch((err) => {
  //   //     // console.log(err)
  //   //   })
  //   // }
  // }

  let reasons = ['Rush Free', 'Shipping Charges', 'Bad Address Correction','Sew Out', 'Stitch Out', 'Price', 'Thread Details', 'How Long Will It Take To Ship', 'Rush Fee', 'Alteration', 'General Question', 'Product Related Question']

  return (
    <Modal
      type={modalType}
      title="Create Ticket"
      visible={visible}
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
       <Spin spinning={loader||isLoading}>
      <div className="project-modal">
        <BasicFormWrapper>
          <Form {...layout} form={form} onKeyDown={(value) => {handleEnter(value)}} id="new_ticket" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
                <Col span={12}>
                  <Form.Item name="TicketGroup" >
                    <Select showSearch style={{ width: '100%' }} autoFocus={true} defaultValue={controls.TicketGroup} onChange={(val) => { onValueChange('TicketGroup', val) }}>
                      <Option key="CSR">CSR</Option>
                      <Option key="Processing">Processing</Option>
                      <Option key="Shipping">Shipping</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Assigned" label="" rules={[{ required: true }]}>
                    {(depart.length > 0 && controls.TicketGroup !== '') ?
                      <Select showSearch style={{ width: '100%' }} onChange={(val) => { onValueChange('Assigned', val) }}>
                        <Option key=''>Assigned</Option>
                        {depart.filter((val) => val.GroupName === controls.TicketGroup).map(({ Username }) => (
                          <Option key={Username}>{Username}</Option>
                        ))}
                      </Select>
                      :
                      <Input placeholder="Assigned To" onChange={(val) => { onValueChange('Assigned', val.target.value) }} />
                    }
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item name="TicketTitle" initialValue="" label="">
                    {(false) ?
                      <Select style={{ width: '100%' }}>
                        <Option value="">Reason</Option>
                        {/* {reasons[departmentName] && reasons[departmentName].map(reason => (
                        <Option value={reason}>{reason}</Option>
                      ))} */}
                      </Select>
                      :
                      <ReasonAutoComplete placeholder='Search Reason' onInputChange={(reason) => { onValueChange('TicketTitle', reason) }} selectedReason={controls.TicketTitle} style={{ width: '100%' }} dataSource={reasons} onReasonSelect={(reason)=>{onValueChange('TicketTitle', reason)}}/>}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='Subject' label="" rules={[{ required: true }]}>
                    <Input placeholder="Work Notes" onChange={(val) => { onValueChange('Subject', val.target.value) }}/>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name='Description' label="" rules={[{ required: true }]}>
                <Input placeholder="Short Description" onChange={(val) => { onValueChange('Description', val.target.value) }} />
              </Form.Item>

              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item name="OrderNo" initialValue='' label="" >
                    <Input onChange={(val) => { onValueChange('OrderNo', val.target.value) }} onBlur={(e) => { getCustomerDetail('orderno', e.target.value) }} placeholder="Order Number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item autoComplete="new-password" name="CustomerName" initialValue='' label="" >
                    <CustomerAutoComplete placeholder='Customer Name' style={{ width: '100%' }}
                      onInputChange={(option) => { onValueChange('CustomerName', option) }}
                      selectedOption={controls.CustomerName}
                      dataSource={customerDetails}
                      onOptionSelect={(option) => { onCustomerDetailSelected('FullName', option) }}
                      targetKey='FullName' />

                    {/* <Input  placeholder="Customer Name" onChange={(val) => { onValueChange('CustomerName', val.target.value) }}/> */}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item name="CustomerContact" initialValue='' label="" >
                    <InputMask style={{}} mask="(999) 999-9999" maskChar="" onChange={(val) => { onValueChange('CustomerContact', val.target.value) }}>
                      {(props) => <Input {...props}  placeholder="Phone"/>}
                    </InputMask>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="ZipCode"  initialValue='' label="" >
                    <Input onBlur={(e) => { getCustomerDetail('zipcode', e.target.value) }} onChange={(val) => { onValueChange('ZipCode', val.target.value) }} placeholder="Zip Code" />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{marginTop: 10}}>
                <Upload beforeUpload={() => false} onChange={(pic) => {onValueChange('Attachment', pic)}} onRemove={() => {onValueChange('Attachment', null)}}>
                   <Button size="large"  style={{borderWidth: 0.5, borderColor: '#ebebeb'}} icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Row>

              <Form.Item style={{ marginTop: 10 }} wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
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

CreateTicket.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onAdd: propTypes.func.isRequired,
};

export default CreateTicket;


// <Form name="createTicket" onFinish={handleOk}>
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
