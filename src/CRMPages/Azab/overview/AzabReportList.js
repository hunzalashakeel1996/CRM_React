import { Col, Row, Table, Spin, Input, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
import { ProjectList, ProjectListTitle } from '../style';
import { formatDate } from '../../../components/time/formatDate'
//import { REPLServer } from 'repl';

const AzabReportList = (props) => {
  // let ticket = useSelector(state => state.tickets.tickets );

 // let azab = useSelector(state => state.AzabReport.AzabReport );

  const [state, setState] = useState({
    AzabReport: props.filterAzabReport,
    current: 0,
    pageSize: 0,
  });
  // const { tickets } = state;
  const { AzabReport } = state;
  useEffect(() => {
    if (props.filterAzabReport) {
      setState({
        AzabReport: props.filterAzabReport,
      });
    }
  }, [props.filterAzabReport]);

 

  const dataSource = [];
  let counter = 0;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    //console.log(`Selected: ${value}`);
    //   monthvalue(value)


    // console.log(state.monthvalue);
    if (e.target.value != '') {

      setState({
        ...state,
        AzabReport: AzabReport.filter(name => name.OrderNo.includes(capitalizeFirstLetter(e.target.value)) || name.OrderType.includes(capitalizeFirstLetter(e.target.value)) || name.EShipdate.includes(e.target.value) || name.MerchantOrderNo.includes(e.target.value) || name.OrderDate.includes(e.target.value) || name.OrderStatus.includes(capitalizeFirstLetter(e.target.value))),
        loader: false
      });
    }
    else {
      setState({ ...state, AzabReport: props.filterAzabReport, loader: false });
    }


  }

  const onChangeinventory = (e) => {


    var inv;
    if (e.target.checked === true) {
      inv = 1
      setState({ ...state, AzabReport: AzabReport.filter(name => name.Inventory === inv), loader: false });
    }
    if (e.target.checked === false) {
      inv = 0
      setState({ ...state, AzabReport: props.filterAzabReport, loader: false });
    }


  }

  if (AzabReport.length)
    AzabReport.map(value => {
      const { OrderNo, EShipdate, Inventory, MerchantOrderNo, OrderDate, OrderStatus, OrderType, RowIndex } = value;
      return dataSource.push({
        key: counter++,

      //  OrderNo: <span style={{ color: 'black' }} className="date-started">{OrderNo}</span>,
      OrderNo: <Link to={{pathname:`/admin/azab/viewazabreportdetails/${OrderNo}`, azab:{OrderNo}}}><span style={{color: 'black'}} className="date-started">{OrderNo}</span></Link>,
        OrderStatus: <span style={{ color: 'black' }} className="date-started">{OrderStatus}</span>,
        OrderDate: <span style={{ color: 'black' }} className="date-started">{OrderDate}</span>,
        OrderEShipdate: <span style={{ color: 'black' }} className="date-started">{EShipdate}</span>,
        OrderType: <span style={{ color: 'black' }} className="date-started">{OrderType}</span>,
        MerchantOrderNo: <span style={{ color: 'black' }} className="date-started">{MerchantOrderNo}</span>,


      });
    });

  const columns = [
    {
      title: 'Orderno',
      dataIndex: 'OrderNo',
      key: 'OrderNo',
    },
    {
      title: 'OrderStatus',
      dataIndex: 'OrderStatus',
      key: 'OrderStatus',
    },
    {
      title: 'OrderDate',
      dataIndex: 'OrderDate',
      key: 'OrderDate',
    },
    {
      title: 'OrderEShipdate',
      dataIndex: 'OrderEShipdate',
      key: 'EShipdate',
    },
    {
      title: 'OrderType',
      dataIndex: 'OrderType',
      key: 'OrderType',
    },
    {
      title: 'MerchantOrderNo',
      dataIndex: 'MerchantOrderNo',
      key: 'MerchantOrderNo',
    }

  ];

  return (
    <>
      <Row gutter={25}>
        <Col span={12}>
          <Input placeholder="Search" onChange={handleChange} style={{ width: '100%', marginLeft: 20, marginRight: 20, marginTop: 10 }} />
          {/* <Checkbox onChange={onChangePurchaseOrder}>Purchase Order</Checkbox> */}
        </Col>
        <Col span={12} style={{alignSelf: 'flex-end'}}>
          <Checkbox onChange={onChangeinventory} >Inventory</Checkbox>
        </Col>
      </Row>
      <Row gutter={25} style={{ marginTop: 10, marginLeft: 10}}>
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

      </Row>
    </>
  );
};

export default AzabReportList;
