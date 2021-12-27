import React, { Suspense, useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Switch, DatePicker, Space, Row, Col, Upload, Skeleton, Image, message, notification, Select, Modal, } from 'antd';
import './style.css';
import moment from 'moment'

const { Option } = Select;
const { RangePicker } = DatePicker;

const EditCouponModal = ({ isModalVisible, loader, setLoader, coupon, updateCoupon, handleCancel }) => {
  const [showTime, setShowTime] = useState(false);
  const IsCartDiscountType = coupon.DISCOUNTTYPE == 'CART';
  const initValues = {
    code: coupon.COUPONSCODE,
    description: coupon.COUPONSDESCRIPTION,
    limitFrom: coupon.COUPONSLIMIT,
    limitTo: coupon.COUPONSLIMIT1,
    discount: JSON.parse(coupon.Method == 'Amount' ? coupon.Discount.slice(1) : coupon.Discount.slice(0, -1)),
    method: coupon.Method,
    percent: coupon.COUPONSPERCENT,
    amount: coupon.COUPONSAMOUNT,
    CouponStatus: coupon.CouponStatus,
    status: coupon.COUPONSSTATUS,
    couponDate: [moment(coupon.COUPONSSTARTDATE), moment(coupon.COUPONSENDDATE)]
  }

  const initRules = {
    Code: [{ required: true, message: 'Code is required' }],
    Description: [{ required: true, message: 'Description is required' }],
    CartLimit: [{ required: true, message: 'Cart Limit From ($) is required' }],
    CartLimit1: [{ required: true, message: 'Cart Limit To ($) is required' }],
    Discount: [{ required: true, message: 'Discount is required' }],
    Method: [{ required: true, message: 'Method is required' }],
    Date: [{ required: true, message: 'Date is required' }],
    Status: [{ required: true, message: 'Status is required' }]
  }

  const onFinish = (values) => {
    setLoader(true)
    let data = {
      ...values,
      id: coupon.COUPONSID,
      percent: values.method == 'Percent' ? values.discount : 0,
      amount: values.method == 'Amount' ? values.discount : 0,
      limitTo: values.limitTo ?? coupon.COUPONSLIMIT1,
      startDate: values.couponDate[0].format('YYYY-MM-DD HH:mm:ss.000'),
      endDate: values.couponDate[1].format('YYYY-MM-DD HH:mm:ss.000'),
    }
    console.log(values.couponDate)
    console.log(data)
    updateCoupon(data)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeDate = (val) => {
    if (!showTime) {
      // change time to 12:00 am on date change
      { val[0].toString() != moment(coupon.COUPONSSTARTDATE).toString() && val[0].set({ h: 0, m: 0 }) }
      { val[1].toString() != moment(coupon.COUPONSENDDATE).toString() && val[1].set({ h: 0, m: 0 }) }
    }
  }

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 20 },
  };

  return (
    <>
      <Modal
        width={600}
        confirmLoading={loader}
        title="Edit Coupon"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} htmlType="submit">
            Cancel
          </Button>,
          <Button key="submit" form="coupon" type="primary" htmlType="submit">
            Submit
          </Button>
        ]} >
        <Form
          name="coupon"
          {...layout}
          initialValues={initValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size={'small'}
        >
          {/* <Form.Item label="Discount Type Card" valuePropName="checked">
            <Switch />
          </Form.Item> */}

          <Form.Item name='code' label="Code" rules={initRules.Code}>
            <Input disabled={IsCartDiscountType} />
          </Form.Item>

          <Form.Item name='description' label="Description" rules={initRules.Description}>
            <Input />
          </Form.Item>

          <Form.Item label="Cart Limit ($)" style={{ marginBottom: 0 }}>
            <Form.Item name='limitFrom' rules={initRules.CartLimit}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', width: 90 }}>
              <InputNumber min={0} />
            </Form.Item>
            {IsCartDiscountType && (<>
              <span style={{ display: 'inline-block', width: '32px', lineHeight: '32px', textAlign: 'center' }}>
                {' --- '}
              </span>
              <Form.Item name='limitTo' rules={initRules.CartLimit1}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', width: 90 }}>
                <InputNumber min={0} />
              </Form.Item>
            </>)}
          </Form.Item>

          <Form.Item label="Discount" style={{ marginBottom: 0 }}>
            <Form.Item
              name="discount"
              rules={initRules.Discount}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', width: 90 }}>
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="method"
              rules={initRules.Method}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
              <Select>
                <Option value="Percent">Percent</Option>
                <Option value="Amount">Amount</Option>
              </Select>
            </Form.Item>
          </Form.Item>

          <Form.Item name="couponDate" label="Date" rules={initRules.Date}>
            <RangePicker onChange={onChangeDate} renderExtraFooter={() => <a onClick={() => setShowTime(!showTime)}>Show Time</a>} showTime={showTime} format="YYYY-MM-DD hh:mm A" />
          </Form.Item>

          <Form.Item name='status' label="Status" rules={initRules.Status}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="InActive">InActive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditCouponModal;

