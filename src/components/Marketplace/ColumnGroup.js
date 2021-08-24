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

// const Column = ['MERCHANTSKU', 'STYLECODE', 'STYLENAME', 'CATEGORYNAME', 'BRANDNAME', 'VENDORNAME', 'collectionname', 'COLORCODE', 'COLORNAME', 'SIZENAME', 'EAN', 'UPC', 'ASINS', 'RIZNOASINS', 'COST', 'AMAZONPRICE', 'STYLEDESCRIPTION', 'FABRIC_NAME', 'VENDORQTY', 'INHOUSEQTY', 'INHOUSEQTYOLD', 'WEIGHT', 'ISMAP', 'MAPPRICE', 'MSRP', 'WAREHOUSE_CUSTOMER_COST', 'ISPU', 'ISAMAZON', 'PUSTATUS', 'STYLESTATUS', 'PU_PRICE', 'Actual_Weight', 'Actual_Shipping', 'IsAutomated_PU', 'Suggested_Shipping', 'VendorStatus', 'IsAutomated_Rizno', 'CreatedDate', 'UpdatedDate', 'Sale_Cost', 'BULLET1', 'BULLET2', 'BULLET3', 'BULLET4', 'Zone0', 'Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5', 'Zone6', 'Zone7', 'Zone8', 'Zone9', 'min_weight', 'max_weight', 'SALE_COST_DATE', 'marketplace_mapprice', 'vendorstylecode', 'image_url', 'marketplace_weight', 'sale_map', 'old_mapprice', 'old_cost', 'sale_status'];


let selectedcol = ['MERCHANTSKU'];

const defaultCheckedList = ['Cherokee'];
const Column = (props) => {
 
    const {additionalColumns}=props
    const Column = ['su.SKU', 'su.merchantsku', 'ai.merchantsku', 'ai.STYLECODE', 'STYLENAME', 'ai.CATEGORYNAME', 'ai.BRANDNAME', 'su.VENDORNAME', 'ai.COLORCODE', 'ai.COLORNAME', 'ai.SIZENAME', 'su.EAN', 'su.UPC', 'su.ASIN', 'su.rizno_asin', 'su.COST', 'ai.maincost', 'su.maincost', 'su.rizno_price', 'STYLEDESCRIPTION', 'su.description', 'ai.FABRIC_NAME', 'ai.vendorqty', 'su.stock', 'ai.INHOUSEQTY', 'ai.INHOUSEQTYOLD', 'ai.WEIGHT', 'ai.ISMAP', 'su.MAPPRICE', 'ai.MSRP', 'ai.WAREHOUSE_CUSTOMER_COST', 'ai.ISPU', 'ai.ISAMAZON', 'su.STATUS', 'su.rizno_STATUS', 'su.PRICE', 'ai.Actual_Weight', 'ai.Actual_Shipping', 'ai.IsAutomated_PU', 'ai.Suggested_Shipping', 'ai.VendorStatus', 'ai.IsAutomated_Rizno', 'ai.CreatedDate', 'ai.UpdatedDate', 'ai.Sale_Cost', 'ai.BULLET1', 'ai.BULLET2', 'ai.BULLET3', 'ai.BULLET4', 'ai.Zone0', 'ai.Zone1', 'ai.Zone2', 'ai.Zone3', 'ai.Zone4', 'ai.Zone5', 'ai.Zone6', 'ai.Zone7', 'ai.Zone8', 'ai.Zone9', 'ai.min_weight', 'ai.max_weight', 'ai.SALE_COST_DATE', 'ai.marketplace_mapprice', 'ai.vendorstylecode', 'ai.image_url', 'ai.marketplace_weight', 'ai.deliveryinfo', 'ai.sale_status', 'ai.sale_map', 'su.type', 'su.image_url', 'su.image_url_top', 'su.image_url_pant',...additionalColumns];
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
        //  setaddOrOtherinventory(value)

        if (value == "ALL") {
            selectedcol = [...Column];
          //  selectedcol += [...props.additionalColumn];
          // console.log([...Column])
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

                    <Select onChange={handleChange} defaultValue="Select " style={{ width: '100%' }} >

                        <Option value="ADD AMAZON INVENTORY" >ADD AMAZON INVENTORY</Option>
                        <Option value="ALL">ALL</Option>
                        <Option value="OTHER" >OTHER</Option>

                    </Select>

                </Col>


                <Col xs={24} md={12} className='pull-right' style={{ marginLeft: 'auto', width:'auto', textAlign:'right'}}>

                <Button style={{marginRight:15}} size="default" type="default" value={!column?"Show Column":"Hide Column"} onClick={() => { setViewColumn(!column) }} >{!column?"Show Column":"Hide Column"}</Button>
                    <Button size="default" type="success" onClick={() => { props.genrateFeed(Allcolumn.column, Allcolumn.addOrOtherinventory) }} >Generate</Button>


                </Col>

            </Row>

            <hr style={{margin:' 17px 0',    border: 'none',    background: '#ccc',    height: '1px' }}/>

                {column &&
                    <Row >
                        {Column.map((val, i) => (
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