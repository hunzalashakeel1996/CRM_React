import { Col, Row, Select, Spin, Radio, Checkbox, Divider, List, Card ,Popover} from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../components/autoComplete/autoComplete';
import { Button } from '../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { Cards } from '../../../../components/cards/frame/cards-frame';

import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, uploadUrl, getVendorapi } from '../../../../redux/apis/DataAction';
import PropTypes from 'prop-types';
//import logo from '../../../../assets/VendorLogo/Cherokee.jpg';





const defaultCheckedList = ['Cherokee'];
const plainOptions=[];
let updateVendorList=[]
const Regularsku = (props) => {

  const [updateVendorListState,setStateupdateVendorList]=useState([])

  const dispatch = useDispatch();
  const [state,setstate]=useState ({
    plainOptions:[]
  });

  const { plainOptions} = state;
  const CheckboxGroup = Checkbox.Group;

const{Regularvendor,loader,updateVendor}=props


  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [isVendorCheckedList, setIsVendorCheckedList] = React.useState([]);

  const onChange = list => {
    console.log('onChange',list)
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < Regularvendor.length);
    setCheckAll(list.length === Regularvendor.length);
  };

  const onCheckAllChange = e => {
    if(e.target.checked){
      updateVendorList = [...Regularvendor]
    }else{
      updateVendorList = []

    }
    setIsVendorCheckedList(e.target.checked ? [...Regularvendor] : [])
    setCheckAll(e.target.checked ? true : false)
  };
  let username = [];
  const onListCheckChange = (val, i, isChecked) => {
   username=JSON.parse(localStorage.getItem('user'))
 
    if(isChecked){
      updateVendorList.push(
        {vendorname:val.vendorname,
        VendorInventory_Update_Stp:val.VendorInventory_Update_Stp,
        FileName:val.FileName,
        Fileformat:val.Fileformat,
        TableName:val.TableName,
        user: username.LoginName,
        vendorconfirm:""
      }
      )
    }else{
      let index = updateVendorList.indexOf(val)
      updateVendorList.splice(index, 1)

    }


 
   
    let temp = [...isVendorCheckedList]
    if(isChecked){
      temp.push(val)
    }else{
      let index = temp.indexOf(val)
      temp.splice(index, 1)

    }
    
    setCheckAll(Regularvendor.length===temp.length ? true : false)
    setIsVendorCheckedList(temp)
  }
  const style = { background: '#fff', padding:10,marginLeft: 10,marginTop:10};
  const stylecheckbosrow = { padding:10,paddingLeft: 30, paddingRight: 10};

  const formatedate = (value) => {
   
    let a = 'avsdFasdas'
    let formatedDate = value.split("T")
    let Date =formatedDate[0];
    let Time =formatedDate[1].split(".");
     Time=Time[0]
     let format=Date+' '+Time
    return format
    }


  return (
    <>
      <Cards headless >

      <Row >
       
        <Col span={4} >
      
        <Button type="primary" onClick={()=>{updateVendor(updateVendorList)}}>Update</Button>
       
        </Col>
        <Col span={4} offset={5} >
        <h2>Regular SKU</h2>
        </Col>
        <Col span={4} offset={6}>
        <Checkbox  checked={checkAll} onChange={onCheckAllChange} >
            Check all
        </Checkbox>
      </Col>
       
      </Row>

      <Row style={stylecheckbosrow} >

       
         
       
         
        {Regularvendor.map((val, i) => (
                <Popover content={( <div>
                    <p>Updated By: <span style={{color: "red"}}>{val.UserName}</span>  </p>
                    <p>Updated At: <span style={{color: "red"}}>{formatedate(val.ActionDate)}</span></p>
                  </div>)} title="Last Update Report" trigger="hover">
              <Col span={6} style={{ marginLeft: 10, marginTop: 10 ,fontSize:30 }}>
           
     
             
                <Checkbox checked={isVendorCheckedList.includes(val)}   onChange={(e) => {onListCheckChange(val,i, e.target.checked)}} >
                 {val.vendorname}
            
                 {/* <img src={`/img/VendorLogo/${val.vendorname}.jpg`} width="40" height="40" style={{marginLeft:10}}/>  */}
              
                </Checkbox>
             
              </Col>
              </Popover>
        ))
        }
      </Row >
      </Cards >

    </>
  );
};

export default Regularsku;