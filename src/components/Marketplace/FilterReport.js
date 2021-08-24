import { Col, Row, Select, Spin, Radio, Checkbox, Divider, List, Card, Input } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';



import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';

const filterReport = (props) => {

    const { vendornameState, brandnameState, collectionState, categorynameState, Type, puStatusState, title } = props
    // // console.log('filterReport',vendornameState)
    return (
        <>

           
            <Cards title={title} style={{ marginLeft: 10 }}>

                <Row gutter={15} style={{marginBottom: 20}}>


                    <Col xs={24} sm={12} md={8} lg={6} >
                      

                          

                                <Select placeholder='Vendor Name' mode="multiple" allowClear onChange={(val) => { props.genrateFilter('vendorFilter', val, true) }} style={{ width:  '100%', marginBottom:10 }}  >
                                    {vendornameState.map((val, i) => (
                                        <Option value={`''${val}''`} key={val}>{val}</Option>

                                    ))}

                                </Select>
                         

                    </Col>



                    <Col xs={24} sm={12} md={8} lg={6}>

                        
                                {/* <h3>Brandname</h3> */}
                           
                                <Select placeholder='Brand Name' mode="multiple" allowClear onChange={(val) => { props.genrateFilter('brandFilter', val, true) }} style={{ width:  '100%', marginBottom:10 }}>
                                    {brandnameState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                          

                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} >
                        

                                {/* <h3>Collection</h3> */}
                          
                       
                                <Select placeholder='Collection' mode="multiple" allowClear onChange={(val) => { props.genrateFilter('collectionFilter', val, true) }} style={{ width:  '100%', marginBottom:10 }}>
                                    {collectionState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                         

                    </Col>




                
                    <Col xs={24} sm={12} md={8} lg={6}>

                      
                                {/* <h3>Category</h3> */}
                        
                                <Select placeholder='Category' mode="multiple" allowClear onChange={(val) => { props.genrateFilter('categoryFilter', val, true) }} style={{ width:  '100%', marginBottom:10 }}>
                                    {categorynameState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                       

                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        

                                {/* <h3>Type</h3> */}
                        
                                <Select  placeholder='Type' onChange={(val) => { props.genrateFilter('typeFilter', val, false) }} style={{ width:  '100%', height:42, marginBottom:10 }}>
                                    {Type.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                         
                    </Col>



                    <Col xs={24} sm={12} md={8} lg={6}>

                      

                                {/* <h3>PU Status</h3> */}
                          
                      
                                <Select placeholder='PU Status' onChange={(val) => { props.genrateFilter('statusFilter', val, false) }} style={{ width:  '100%', marginBottom:10 }}>
                                    {puStatusState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                        

                    </Col>
                   
                
                <Col xs={24} sm={12} md={8} lg={6}>
                              
                                <Input onChange={(event) => { props.genrateFilter('stylecodeFilter', event.target.value, false) }} style={{ width: '100%', height:'42px', marginBottom:10}} placeholder="Style Code" />
                       
                    </Col>
                    </Row>
            </Cards>
        </>
    )
};

export default filterReport;