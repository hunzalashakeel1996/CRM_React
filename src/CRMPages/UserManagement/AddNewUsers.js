import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, InputNumber, Tabs, Table, Upload, Form, Row, Select, Col, Switch, notification } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Cascader } from '../../components/cascader/cascader';
import { useDispatch } from 'react-redux';
import { addNewUser } from '../../redux/apis/DataAction';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { checkPageAccess } from '../../components/utilities/utilities';

const { Option } = Select;
// const { TextArea } = Input;


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

const UsersView = (props) => {
  const [form] = Form.useForm();
  const [state, setstate] = useState({
    values: {},
    cascaderItem: [],
  });

  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];

  useEffect(() => {
    checkPageAccess(userAccess, 'User Management', "Add New Users", props.history)
})


  const dispatch = useDispatch();


  const onInsertUser = (values) => {


    let obj = {
      firstName: values['firstName'],
      lastName: values['lastName'],
      userName: values['userName'],
      email: values['email'],
      password: values['password'],
      status: values['status']
    }

    // console.log(obj)

    dispatch(addNewUser({
      firstName: values['firstName'],
      lastName: values['lastName'],
      userName: values['userName'],
      email: values['email'],
      password: values['password'],
      status: values['status']
    })).then(data => {

      notification.success({
        message: 'Hey There',
        description: data,
        onClose: close,
      });
    });

  };

  const onInsertUserFailed = (error) => {


    // console.log('obj', error)
  };

  return (
    <>
      <PageHeader
        ghost
        title="Add New Users"
        buttons={[
          <div key="1" className="page-header-actions">
             <Button size="large"  size="small" type="primary"  onClick={() => { history.push(`/admin/userManagement/manageUser`);}}>
              <FeatherIcon icon="plus" size={14} />
              Manage Users
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col md={12} sm={24} xs={24}>
            <Cards title="User Entry Form" caption="The simplest use of Form">
              <BasicFormWrapper>
                <Form layout="vertical"
                  form={form}
                  name="basicforms"
                  onFinish={onInsertUser}
                  onFinishFailed={onInsertUserFailed}>

                  <Form.Item name="firstName" rules={[{ required: true }]}>
                    <Input placeholder="FirstName" />
                  </Form.Item>
                  <Form.Item name="lastName" rules={[{ required: true }]}>
                    <Input placeholder="LastName" />
                  </Form.Item>
                  <Form.Item name="userName" rules={[{ required: true }]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item

                    name="password"
                    rules={[{ required: true, message: 'Please input password!' }]}
                  >
                    <Input.Password placeholder="password" />
                  </Form.Item>
                  <Form.Item name="status" rules={[{ required: true, message: 'Please Enter Status!' }]}>
                    <Select
                      showSearch
                      placeholder="Please Slelect"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="">Please Select</Option>
                      <Option value="active">Active</Option>
                      <Option value="inactive">Inactive</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                     <Button size="large"  htmlType="submit"   type="primary">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </BasicFormWrapper>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default UsersView;
