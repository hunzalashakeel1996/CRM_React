import { Col, Row, Select, Spin, Radio, Checkbox, Divider, List, Card } from 'antd';
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
import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, uploadUrl, getVendorapi } from '../../../../redux/apis/DataAction';
import PropTypes from 'prop-types';
//import logo from '../../../../assets/VendorLogo/Cherokee.jpg';





const defaultCheckedList = ['Cherokee'];
const plainOptions=[];

const Regularsku = (props) => {

  const dispatch = useDispatch();
  const [state,setstate]=useState ({
    plainOptions:[]
  });

  const { plainOptions} = state;
  const CheckboxGroup = Checkbox.Group;

const{Regularvendor}=props



  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [isVendorCheckedList, setIsVendorCheckedList] = React.useState([]);

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < Regularvendor.length);
    setCheckAll(list.length === Regularvendor.length);
  };

  const onCheckAllChange = e => {
    setIsVendorCheckedList(e.target.checked ? [...Regularvendor] : [])
    setCheckAll(e.target.checked ? true : false)
  };

  const onListCheckChange = (val, i, isChecked) => {
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



  return (
    <>


      

      <Row style={{marginLeft:44}}>
       
        <Col span={4} >
        <Button type="primary">Update</Button>
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

        {/* <CheckboxGroup style={{padding: 10}} options={plainOptions} value={checkedList} onChange={onChange} /> */}
        {/* {plainOptions.map((val, i) => (
               <CheckboxGroup options={plainOptions[i]} value={val} onChange={onChange} />
            
              ))} */}
         
       
         
        {Regularvendor.map((val, i) => (
              <Col span={4} style={style}>
              
                <Checkbox checked={isVendorCheckedList.includes(val)}   onChange={(e) => {onListCheckChange(val,i, e.target.checked)}} >
                 {val}
               
                 <img src={require(`../../../../assets/VendorLogo/${val}.jpg`)} width="20" height="20" style={{marginLeft:10}}/> 
                </Checkbox>
              </Col>
            
        ))
        }
      </Row >



    </>
  );
};

export default Regularsku;