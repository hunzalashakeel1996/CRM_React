import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { apiItemRMASummary} from '../../../../redux/apis/DataAction';
import './style.css';




const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

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




const ItemRMASummary = (props) => {

    const {onAddRMAItem,downloadFileDataLink,orderdatefrom,orderdateto,dateFormat, isSearchPressed, activeTab, onDispatchComplete}= props
    // // console.log('dataSourceOrder',dataSourceOrder)
  const [form] = Form.useForm();
   
  const dispatch = useDispatch();
  const [state, setState] = useState({
   
    sortedInfo:[],
   
    isLoader:false,
    dataSourceOrderTemp:[],
    dataSource:[],
    orderdatetoCheck:'todate',
    orderdatefromCheck:'fromdate',
    dataDownloadLinkItemRMASummary:''
    
  });

  const {dataDownloadLinkItemRMASummary,orderdatetoCheck,orderdatefromCheck,dateFomat,sortedInfo,isLoader,dataSourceOrderTemp,dataSource}=state

  useEffect(() => {
    // console.log('aaaa',isSearchPressed,activeTab,orderdatetoCheck,orderdatefromCheck, orderdatefrom,orderdateto)

    if(isSearchPressed&&activeTab === 'ItemRMASummary'&&(orderdatetoCheck!==orderdateto ||orderdatefromCheck!==orderdatefrom)){
     
      setState({ ...state, isLoader: true })
     
      dispatch(apiItemRMASummary({ orderdateto: orderdateto, orderdatefrom:orderdatefrom})).then(data => {
       
        console.log(data)
        // setTimeout(
        //   function() {
            downloadFileDataLink(data[0])
      //     }
      //     .bind(this),
      //     2000
      // );


             let tempDataSource =[]
            data[1].map(value=>{
              const{ordertype,itemCount,RMA,Open,Process,Closed}=value

              tempDataSource.push({
                ordertype:ordertype,
                itemCount:itemCount,              
                RMA:RMA,
                percentage:`${Math.round((RMA/itemCount*100)*100)/100}%`,
                Open:Open,
                Process:Process,
                Closed:Closed,
              })      

            })

           setState({ ...state,dataDownloadLinkItemRMASummary:data[0], isLoader: false,dataSource:tempDataSource,orderdatetoCheck:orderdateto,orderdatefromCheck:orderdatefrom  })
        //    onDispatchComplete()
        onAddRMAItem(data[1])
      })
    
    }
    // if (activeTab === 'ItemRMASummary' )
    // {
  
    //   downloadFileDataLink(dataDownloadLinkItemRMASummary)
    // }
    else if (activeTab === 'ItemRMASummary' )
    {
      onAddRMAItem(dataSource)
      downloadFileDataLink(dataDownloadLinkItemRMASummary)
    }



  }, [isSearchPressed,activeTab,orderdateto,orderdatefrom])

  const columns = [
    {
      title: 'Ordertype',
      dataIndex: 'ordertype',
      key: 'ordertype'
    },
    {
      title: 'ItemCount',
      dataIndex: 'itemCount',
      key: 'itemCount'
 
    },
    {
      title: 'RMAItemCount',
      dataIndex: 'RMA',
      key: 'RMA'
 
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage'
 
    },
    {
      title: 'Open',
      dataIndex: 'Open',
      key: 'Open'
    },
    {
      title: 'Process',
      dataIndex: 'Process',
      key: 'Process'
    },
    {
      title: 'Closed',
      dataIndex: 'Closed',
      key: 'Closed'
    }
  ];
 
  

  const handleChange = (pagination, filters, sorter) =>  {
    // console.log('Various parameters', pagination, filters, sorter);
    setState({...state,
     
      sortedInfo: sorter,
    });
  };
  
  return (

    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
         <Cards headless>
                      

                            <div className="table-responsive">
                                <Table pagination={true} dataSource={dataSource} columns={columns} />
                            </div>

                    </Cards>
      
    </Spin>
  );

};

export default ItemRMASummary
