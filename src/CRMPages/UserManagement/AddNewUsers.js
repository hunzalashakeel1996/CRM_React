import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, InputNumber, Tabs, Table, Upload,Form, Row,Select, Col,Switch } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Cascader } from '../../components/cascader/cascader';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const { Option } = Select;
const { TextArea } = Input;


const UsersView = (props) => {
  const [form] = Form.useForm();
  const [state, setstate] = useState({
    values: {},
    cascaderItem: [],
  });
  const handleSubmit = values => {
    setstate({ ...state, values });
  };

  const onChangeCascader = value => {
    setstate({ ...state, cascaderItem: value });
  };

  return (
    <>
    <PageHeader
        ghost
        title="Add New Users"
        buttons={[
          <div key="1" className="page-header-actions">
            <ExportButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Manage Users
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col md={12} sm={24} xs={24}>
            <Cards title="Elements of Form" caption="The simplest use of Form">
              <BasicFormWrapper>
                <Form layout="vertical" form={form} name="basicforms" onFinish={handleSubmit}>
                  
                  <Form.Item label="FirstName" name="firstname">
                    <Input placeholder="FirstName" />
                  </Form.Item>
                  <Form.Item label="LastName" name="lastname">
                    <Input placeholder="LastName" />
                  </Form.Item>
                  <Form.Item label="Username" name="username"
                  rules={[{ required: true, message: 'Please Enter UserName!', type: 'text' }]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>                  
                  <Form.Item label="Select" name="Select">
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
                    <Button htmlType="submit" size="default" type="primary">
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
