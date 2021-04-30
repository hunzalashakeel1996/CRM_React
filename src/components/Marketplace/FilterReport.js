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
    // console.log('filterReport',vendornameState)
    return (
        <>

            <Row  >





            </Row>
            <Cards title={title} style={{ marginLeft: 10 }}>

                <Row gutter={50}>
                    <Col span={7} >
                      

                                <h3>Vendorname</h3>
                          

                                <Select mode="multiple" allowClear onChange={(val) => { props.genrateFilter('vendorFilter', val, true) }} style={{ width: 300 }}  >
                                    {vendornameState.map((val, i) => (
                                        <Option value={`''${val}''`} key={val}>{val}</Option>

                                    ))}

                                </Select>
                         

                    </Col>



                    <Col span={7}>

                        
                                <h3>Brandname</h3>
                           
                                <Select mode="multiple" allowClear onChange={(val) => { props.genrateFilter('brandFilter', val, true) }} style={{ width: 300 }}>
                                    {brandnameState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                          

                    </Col>
                    <Col span={7} >
                        

                                <h3>Collection</h3>
                          
                       
                                <Select mode="multiple" allowClear onChange={(val) => { props.genrateFilter('collectionFilter', val, true) }} style={{ width: 300 }}>
                                    {collectionState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                         

                    </Col>




                </Row>

                <Row  gutter={50} style={{ marginTop: 10 }}>
                    <Col span={7}>

                      
                                <h3>Category</h3>
                        
                                <Select mode="multiple" allowClear onChange={(val) => { props.genrateFilter('categoryFilter', val, true) }} style={{ width: 300 }}>
                                    {categorynameState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                       

                    </Col>
                    <Col span={7} >
                        

                                <h3>Type</h3>
                        
                                <Select onChange={(val) => { props.genrateFilter('typeFilter', val, false) }} style={{ width: 300 }}>
                                    {Type.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                         
                    </Col>



                    <Col span={7}>

                      

                                <h3>PU Status</h3>
                          
                      
                                <Select onChange={(val) => { props.genrateFilter('statusFilter', val, false) }} style={{ width: 300 }}>
                                    {puStatusState.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                        

                    </Col>
                   
                </Row>
                <Row style={{ marginTop: 10 }}>
                <Col span={6}>
                        <Row >
                            <Col >

                                <h3>Style Code</h3>
                            </Col>
                        </Row>
                        <Row >
                            <Col >
                                <Input onChange={(event) => { props.genrateFilter('stylecodeFilter', event.target.value, false) }} style={{ width: 300 }} placeholder="Style Code" />
                            </Col>
                        </Row>

                    </Col>
                    </Row>
            </Cards>
        </>
    )
};

export default filterReport;