import React, { lazy, Suspense, useEffect, useState } from 'react';
// import moment from moment;
// import React, { useState } from 'react';
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReasonAutoComplete from '../../../components/ReasonAutoComplete/ReasonAutoComplete';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { saleSummaryReport, getBalanceSheetRecord } from '../../../redux/apis/DataAction';
import { ProjectHeader, ProjectList } from '../../Tickets/style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { downloadFile, getTotals } from '../../../components/utilities/utilities';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button } from '../../../components/buttons/buttons';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;



const formInit = {
  reportType: '',
  VendorName: []
}





const UnShippedOrders = (props) => {


  const dispatch = useDispatch();


  let vendorNames = useSelector(state => state.tickets.vendornames);
  console.log(vendorNames)

  let orderType = { orderType: "Amazon,Amazonrizno,Ebay,Newegg,Rakuten,Sears,Walmart" };
  // console.log(orderType)
  const [state, setState] = useState({
    controls: { ...formInit },
    dataSource: [],
    isLoading: false,
    downLoadLink: '',
  });


  const { controls, downLoadLink } = state




  const onSubmit = (values) => {

    let object = {
      vendor: values['vendorName'],
      orderdatefrom: values['startDate'].format('YYYY-MM-DD'),
      orderdateto: values['endDate'].format('YYYY-MM-DD'),
      marketplace: values['orderType']
    }

    console.log('success:', object);

    setState({ ...state, isLoading: true })
    dispatch(saleSummaryReport({
      vendor: values['vendorName'],
      orderdatefrom: values['startDate'].format('YYYY-MM-DD'),
      orderdateto: values['endDate'].format('YYYY-MM-DD'),
      marketplace: values['orderType']
    })).then(data => {

      console.log(data[1])
      let tempDataSource = [];
      let tempLinkDownload = data[0];
      console.log(tempLinkDownload);
      data[1].map(value => {
        const { Order_Count, PPS, SalePrice, Total_Profit, Total_item_loss, Total_loss, commision, cost, final_profit, ordertype, po_shipping, profit, purchaseCost, shipping, vendorname } = value;
        return tempDataSource.push({
          Order_Count: Order_Count,
          PPS: PPS,
          SalePrice: Math.round(SalePrice),
          Total_Profit: Math.round(Total_Profit),
          Total_item_loss: Math.round(Total_item_loss),
          Total_loss: Math.round(Total_loss),
          commision: Math.round(commision),
          cost: Math.round(cost),
          final_profit: Math.round(final_profit),
          ordertype: ordertype,
          po_shipping: Math.round(po_shipping),
          profit: Math.round(profit),
          purchaseCost: Math.round(purchaseCost),
          shipping: Math.round(shipping),
          vendorname: vendorname
        });
      });


      tempDataSource.push({
        Order_Count: getTotals(tempDataSource, "Order_Count"),
        PPS: getTotals(tempDataSource, "PPS"),
        SalePrice: getTotals(tempDataSource, "SalePrice"),
        Total_Profit: getTotals(tempDataSource, "Total_Profit"),
        Total_item_loss: getTotals(tempDataSource, "Total_item_loss"),
        Total_loss: getTotals(tempDataSource, "Total_loss"),
        commision: getTotals(tempDataSource, "commision"),
        cost: getTotals(tempDataSource, "cost"),
        final_profit: getTotals(tempDataSource, "final_profit"),
        ordertype: "=",
        po_shipping: getTotals(tempDataSource, "po_shipping"),
        profit: getTotals(tempDataSource, "profit"),
        purchaseCost: getTotals(tempDataSource, "purchaseCost"),
        shipping: getTotals(tempDataSource, "shipping"),
        vendorname: "TOTAL"
      })
      setState({ ...state, dataSource: [...tempDataSource], downLoadLink: tempLinkDownload, loader: false });
    })
  }



  const downloadFiles = () => {
    setState({ ...state })

    if (downLoadLink == "") {
      notification.error({
        message: 'Download Failed',
        description: `Please Select Record First`,
        onClose: close,
      });
    }
    else {
      downloadFile(state.downLoadLink);
      notification.success({
        message: 'Successfull Dowload',
        description: `File Downloaded`,
        onClose: close,
      });
    }
  }


  
  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const handleChange = (data) => {
    console.log('ds', data)
  }



  const changeOrderType = (values) => {

    console.log('selectedOrderType', values);

  }


  const dataSource = [
    {
      key: '1',
      userName: '1038',
      Count: '1038'
    },
    {
      key: '2',
      userName: '562',
      Count: '1038'
    },
    {
      key: '3',
      userName: '178',
      Count: '1038'
    },
    {
      key: '4',
      userName: '1778',
      Count: '1038'
    }
  ];
  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Count',
      dataIndex: 'Count',
      key: 'Count',
    }

  ];


  return (
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >

      <div>
        {/* <ProjectHeader>
          <PageHeader
            ghost
          
          />
        </ProjectHeader> */}

        <Row>
          <Cards   title="Unshipped Report">
            <Form name="basic"
              onFinish={onSubmit}
              onFinishFailed={onSubmitFailed}>

              <Row>
                <Col span={6}>
                  <Form.Item name="startDate" rules={[{ required: true }]}>
                    {/* <Space label="" {...rangeConfig}> */}
                    <DatePicker style={{ padding: 10 }} size='small'
                      renderExtraFooter={() => 'extra footer'} placeholder="From" />
                    {/* </Space > */}
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={4}>
                  <Select defaultValue="1" style={{ width: 120,marginTop: 7 }} onChange={handleChange}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                  </Select>
                </Col>


                <Col span={3}>

                  <Button style={{marginTop: 7 }} key="1" type="primary" size="default" htmlType="submit">
                    Search
                           </Button>

                </Col>



              </Row>

              <Row>
              <Table dataSource={dataSource} columns={columns} />
              </Row>

            </Form>
          </Cards>
        </Row>
       
      </div>
    </Spin>
  );
};

export default UnShippedOrders;
