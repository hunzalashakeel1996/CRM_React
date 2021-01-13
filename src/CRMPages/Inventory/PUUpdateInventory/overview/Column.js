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


const CheckboxGroup = Checkbox.Group;

const plainOptions = ['MERCHANTSKU', 'STYLECODE', 'STYLENAME', 'CATEGORYNAME', 'BRANDNAME', 'VENDORNAME', 'collectionname', 'COLORCODE', 'COLORNAME', 'SIZENAME', 'EAN', 'UPC', 'ASINS', 'RIZNOASINS', 'COST', 'AMAZONPRICE', 'STYLEDESCRIPTION', 'FABRIC_NAME', 'VENDORQTY', 'INHOUSEQTY', 'INHOUSEQTYOLD', 'WEIGHT', 'ISMAP', 'MAPPRICE', 'MSRP', 'WAREHOUSE_CUSTOMER_COST', 'ISPU', 'ISAMAZON', 'PUSTATUS', 'STYLESTATUS', 'PU_PRICE', 'Actual_Weight', 'Actual_Shipping', 'IsAutomated_PU', 'Suggested_Shipping', 'VendorStatus', 'IsAutomated_Rizno', 'CreatedDate', 'UpdatedDate', 'Sale_Cost', 'BULLET1', 'BULLET2', 'BULLET3', 'BULLET4', 'Zone0', 'Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5', 'Zone6', 'Zone7', 'Zone8', 'Zone9', 'min_weight', 'max_weight', 'SALE_COST_DATE', 'marketplace_mapprice', 'vendorstylecode', 'image_url', 'marketplace_weight', 'sale_map', 'old_mapprice', 'old_cost', 'sale_status'];
let selectedcol = ['MERCHANTSKU'];

const defaultCheckedList = ['Cherokee'];
const Column = (props) => {
    const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);
    const [isColumnCheckedList, setIsColumnCheckedList] = React.useState([]);
    const [column,setViewColumn] =useState(true);
    //   const {  StatusSort } = state;
    const [StatusSort, setStatusSort] = useState({});
    const [Allcolumn, setAllcolumn] = useState({});
    const [Toggelcolumn, setToggelcolumn] = useState({});

    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = e => {
        setIsColumnCheckedList(e.target.checked ? [...plainOptions] : [])
        setCheckAll(e.target.checked ? true : false)
    };

    const onListCheckChange = (val, i, isChecked) => {
        console.log(val)
        selectedcol = [...isColumnCheckedList]
        if (isChecked) {
            selectedcol.push(val)
        } else {
            let index = selectedcol.indexOf(val)
            selectedcol.splice(index, 1)
        }
        setCheckAll(plainOptions.length === selectedcol.length ? true : false)
        setIsColumnCheckedList(selectedcol)
    }
    const style = { background: '#fff', padding: 10, marginLeft: 10, marginTop: 10 };
    const stylecheckbosrow = { padding: 10, paddingLeft: 30, paddingRight: 10 };

    const handleChange = (value, i, isChecked) => {
        console.log(value);
        if (value == "ALL") {
            selectedcol = [...plainOptions];
           
            setAllcolumn(selectedcol);
        }
        if (value == "ADD AMAZON INVENTORY") {
            selectedcol = ['MERCHANTSKU', 'UPC', 'AMAZONPRICE', 'VENDORQTY'];
            console.log(selectedcol);
            setAllcolumn(selectedcol);

        }
        if (value == "OTHER") {
            selectedcol = [];


            setAllcolumn(selectedcol);

        }
    }


    return (
        <>

            <Row >


                <Col >
                  
                    <Button type="primary" value="Columns" onClick={()=>{setViewColumn(!column)}} style={{marginBottom:10}}>Column</Button>

                    <Select onChange={handleChange} defaultValue="Select " style={{ width: 270}} >

                        <Option value="ADD AMAZON INVENTORY" >ADD AMAZON INVENTORY</Option>
                        <Option value="ALL">ALL</Option>
                        <Option value="OTHER" >OTHER</Option>

                    </Select>
                </Col>

            </Row>



           { column&& 
           <Row >
                {plainOptions.map((val, i) => (
                    <Col style={{ background: '#fff',width: 270, marginTop: 10, padding: 10}} >
                        
                        <Checkbox checked={selectedcol.indexOf(val) > -1} onChange={(e) => { onListCheckChange(val, i, e.target.checked) }} >
                            {val}
                        </Checkbox>

                    </Col>

                ))}
            </Row >}



            <Row>
                <Col  style={{ marginTop: 10,  marginRight: 10 }}>
                    <Button type="primary" onClick={() =>props.GenrateFeed(selectedcol)} >Generate</Button>

                </Col>

            </Row>


        </>
    );
};

export default Column;