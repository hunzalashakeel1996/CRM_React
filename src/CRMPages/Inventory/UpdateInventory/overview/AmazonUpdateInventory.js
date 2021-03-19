import { Col, Row, Select, Spin, Radio, Checkbox, Divider, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../components/autoComplete/autoComplete';
import { Cards } from '../../../../components/cards/frame/cards-frame';

import { Button } from '../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { webURL, audioPlay, uploadUrl,getUpdateInventoryapi } from '../../../../redux/apis/DataAction';

const { TextArea } = Input;
const AmazonUpdateInventory = () => {
const dispatch = useDispatch()

    const [merchantskuState, merchantskuStatesetState] = useState([]);

    const onChange = (event) => {
        console.log(event.target.value)
        merchantskuStatesetState(event.target.value);

      };
   
      const getMerchantskuDetail = ()=>
      {
       
        
            console.log(merchantskuState);
            dispatch(getUpdateInventoryapi({ms:merchantskuState})).then(data => {
    
                console.log(data)
             }) }
      
//   if (AzabReport.length)
//   AzabReport.map(value => {
//     const { OrderNo, EShipdate, Inventory, MerchantOrderNo, OrderDate, OrderStatus, OrderType, RowIndex } = value;
//     return dataSource.push({
//       key: counter++,

//     //  OrderNo: <span style={{ color: 'black' }} className="date-started">{OrderNo}</span>,
//     OrderNo: <Link to={{pathname:`/admin/azab/viewazabreportdetails/${OrderNo}`, azab:{OrderNo}}}><span style={{color: 'black'}} className="date-started">{OrderNo}</span></Link>,
//       OrderStatus: <span style={{ color: 'black' }} className="date-started">{OrderStatus}</span>,
//       OrderDate: <span style={{ color: 'black' }} className="date-started">{OrderDate}</span>,
//       OrderEShipdate: <span style={{ color: 'black' }} className="date-started">{EShipdate}</span>,
//       OrderType: <span style={{ color: 'black' }} className="date-started">{OrderType}</span>,
//       MerchantOrderNo: <span style={{ color: 'black' }} className="date-started">{MerchantOrderNo}</span>,


//     });
//   });

// const columns = [
//   {
//     title: 'Orderno',
//     dataIndex: 'OrderNo',
//     key: 'OrderNo',
//   },
//   {
//     title: 'OrderStatus',
//     dataIndex: 'OrderStatus',
//     key: 'OrderStatus',
//   },
//   {
//     title: 'OrderDate',
//     dataIndex: 'OrderDate',
//     key: 'OrderDate',
//   },
//   {
//     title: 'OrderEShipdate',
//     dataIndex: 'OrderEShipdate',
//     key: 'EShipdate',
//   },
//   {
//     title: 'OrderType',
//     dataIndex: 'OrderType',
//     key: 'OrderType',
//   },
//   {
//     title: 'MerchantOrderNo',
//     dataIndex: 'MerchantOrderNo',
//     key: 'MerchantOrderNo',
//   }

// ];
    return (
        <>



            <div style={{ marginTop: 10 }}>
            <Cards title="Insert Merchantsku">
                <Row >

                   
                        <Col span={8} >

                            <div className="auto-complete-input">
                                {/* <AutoComplete
                    customComponent={<TextArea placeholder="input here" className="custom" style={{ height: 50 }} />}
                    // dataSource={dataSource}
                    // onSearch={onSearch}
                  /> */}
                                <TextArea placeholder="input here" className="custom" value={merchantskuState} onChange={onChange} style={{ height: 50 }} />
                            </div>

                        </Col>
                        <Col span={2}  style={{ marginLeft: 20 }}>
                       
                            <Button size="default" type="primary"  onClick={getMerchantskuDetail} >Search</Button>
                            </Col>
                         
                          
                            <Col span={3}  style={{ marginLeft: 20}}>
                            <Button size="default" type="success"  >Download</Button>
                        </Col>
                 
                </Row>
                </Cards>

                <Cards title="View Merchantsku">
                
                </Cards>
            </div>

        </>
    )
}


export default AmazonUpdateInventory;