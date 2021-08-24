import { Col, Row, Select, Spin, Radio, Checkbox, Divider, List, Card } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { Cards } from '../../components/cards/frame/cards-frame';

import { Button } from '../../components/buttons/buttons';

import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
//import logo from '../../../../assets/VendorLogo/Cherokee.jpg';


const CheckboxGroup = Checkbox.Group;

// const plainOptions = ['MERCHANTSKU', 'STYLECODE', 'STYLENAME', 'CATEGORYNAME', 'BRANDNAME', 'VENDORNAME', 'collectionname', 'COLORCODE', 'COLORNAME', 'SIZENAME', 'EAN', 'UPC', 'ASINS', 'RIZNOASINS', 'COST', 'AMAZONPRICE', 'STYLEDESCRIPTION', 'FABRIC_NAME', 'VENDORQTY', 'INHOUSEQTY', 'INHOUSEQTYOLD', 'WEIGHT', 'ISMAP', 'MAPPRICE', 'MSRP', 'WAREHOUSE_CUSTOMER_COST', 'ISPU', 'ISAMAZON', 'PUSTATUS', 'STYLESTATUS', 'PU_PRICE', 'Actual_Weight', 'Actual_Shipping', 'IsAutomated_PU', 'Suggested_Shipping', 'VendorStatus', 'IsAutomated_Rizno', 'CreatedDate', 'UpdatedDate', 'Sale_Cost', 'BULLET1', 'BULLET2', 'BULLET3', 'BULLET4', 'Zone0', 'Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5', 'Zone6', 'Zone7', 'Zone8', 'Zone9', 'min_weight', 'max_weight', 'SALE_COST_DATE', 'marketplace_mapprice', 'vendorstylecode', 'image_url', 'marketplace_weight', 'sale_map', 'old_mapprice', 'old_cost', 'sale_status'];


let selectedcol = ['MERCHANTSKU'];

const defaultCheckedList = ['Cherokee'];
const Column = (props) => {
 
    const {additionalColumns,columnDropdown}=props
    const plainOptions = ['MERCHANTSKU', 'STYLECODE', 'STYLENAME', 'CATEGORYNAME', 'BRANDNAME', 'VENDORNAME', 'collectionname', 'COLORCODE', 'COLORNAME', 'SIZENAME', 'EAN', 'UPC', 'COST', 'STYLEDESCRIPTION', 'FABRIC_NAME', 'VENDORQTY', 'INHOUSEQTY', 'INHOUSEQTYOLD', 'WEIGHT', 'ISMAP', 'MAPPRICE', 'MSRP', 'WAREHOUSE_CUSTOMER_COST', 'Actual_Weight', 'Actual_Shipping', 'Suggested_Shipping', 'VendorStatus', 'CreatedDate', 'UpdatedDate', 'Sale_Cost', 'BULLET1', 'BULLET2', 'BULLET3', 'BULLET4', 'Zone0', 'Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5', 'Zone6', 'Zone7', 'Zone8', 'Zone9', 'min_weight', 'max_weight', 'SALE_COST_DATE', 'marketplace_mapprice', 'vendorstylecode', 'image_url', 'marketplace_weight', 'sale_map', 'old_mapprice', 'old_cost', 'sale_status'];
    const [column, setViewColumn] = useState(true);
    const [Allcolumn, setAllcolumn] = useState({
        column: [],
        addOrOtherinventory: ""
    });
    const [Toggelcolumn, setToggelcolumn] = useState({});

    const onListCheckChange = (val, i, isChecked) => {
        if (Allcolumn.addOrOtherinventory === 'OTHER') {
            selectedcol = [...Allcolumn.column]
            if (isChecked) {
                selectedcol.push(val)
            } else {
                let index = selectedcol.indexOf(val)
                selectedcol.splice(index, 1)
            }
            setAllcolumn({ ...Allcolumn, column: selectedcol })
        }

    }

    const style = { background: '#fff', padding: 10, marginLeft: 10, marginTop: 10 };
    const stylecheckbosrow = { padding: 10, paddingLeft: 30, paddingRight: 10 };
    const handleChange = (value, i, isChecked) => {
         // console.log('handleChange',value)

        if (value == "ALL") {
            selectedcol = [...plainOptions];
            selectedcol += [...additionalColumns];
          // console.log([...plainOptions])
         //  // console.log(additionalColumns)
         //  selectedcol = additionalColumns;
        }
        else if (value == "ADD AMAZON INVENTORY") {
            selectedcol = ['MERCHANTSKU', 'UPC', 'AMAZONPRICE', 'VENDORQTY'];
        }
        else if (value == "OTHER") {
            selectedcol = [];
        }
        setAllcolumn({ column: selectedcol, addOrOtherinventory: value });
    }


    return (
        <>
            <Cards headless >

            <Row style={{marginBottom:10}}>

               
                <Col xs={24} md={8} lg={6} style={{ marginBottom:8 }}>

                    {/* <Select onChange={handleChange} defaultValue="Select " style={{ width: 270 }} >

                        <Option value="ADD AMAZON INVENTORY" >ADD AMAZON INVENTORY</Option>
                        <Option value="ALL">ALL</Option>
                        <Option value="OTHER" >OTHER</Option> 

                    </Select> */}
                        {/* onChange={(val) => { props.genrateFilter('vendorFilter', val, true) }} */}
                    <Select onChange={(val) => {handleChange(val)}} defaultValue="Select " style={{ width: '100%' }} >
                                {columnDropdown.map((val, i) => (
                                    <Option value={`${val}`} key={val}>{val}</Option>

                                ))}

                            </Select>

                </Col>
               
              
                <Col xs={24} md={12} className='pull-right' style={{ marginLeft: 'auto', width:'auto', textAlign:'right'}}>

                <Button  style={{marginRight:15}} size="default" type="default" value={!column?"Show Column":"Hide Column"} onClick={() => { setViewColumn(!column) }} >{!column?"Show Column":"Hide Column"}</Button>
                    <Button size="default" type="success" onClick={() => { props.genrateFeed(Allcolumn.column, Allcolumn.addOrOtherinventory) }} >Generate</Button>


                </Col>

            </Row>

            <hr style={{margin:' 17px 0',    border: 'none',    background: '#ccc',    height: '1px' }}/>

                {column &&
                    <Row >
                        {plainOptions.map((val, i) => (
                            <Col xs={24} sm={12} lg={7} style={{  marginTop: 10, padding: 4,backgroundColor: '#fff', color: '#9299B8'  }} >
                                <Checkbox checked={Allcolumn.column.indexOf(val) > -1} onChange={(e) => { onListCheckChange(val, i, e.target.checked) }} >
                                    {val}
                                </Checkbox>

                            </Col>

                        ))}
                        {additionalColumns.map((val, i) => (

                            <Col xs={24} sm={12} lg={7} style={{  marginTop: 10, padding: 4,backgroundColor: '#fff', color: '#9299B8' }} >

                                <Checkbox checked={Allcolumn.column.indexOf(val) > -1} onChange={(e) => { onListCheckChange(val, i, e.target.checked) }} >
                                    {val}
                                </Checkbox>

                            </Col>

                        ))}
                    </Row >}



                {/* <Row>
                <Col style={{ marginTop: 10, marginRight: 10 }}>
                    <Button type="primary" onClick={() => { props.genrateFeed(Allcolumn.column, Allcolumn.addOrOtherinventory) }} >Generate</Button>


                </Col>

            </Row> */}

            </Cards>
        </>
    );
};

export default Column;