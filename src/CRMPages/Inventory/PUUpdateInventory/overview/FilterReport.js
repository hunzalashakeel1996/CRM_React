import { Col, Row, Select, Spin, Radio, Checkbox, Divider, List, Card, Input } from 'antd';
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
import { webURL, audioPlay, uploadUrl, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi } from '../../../../redux/apis/DataAction';
import PropTypes from 'prop-types';

const filterReport = (props) => {
   
  const{Vendornamestate,Brandnamestate,Collectionstate,categorynamestate,Type,puStatusstate} = props
  
    return (
        <>
            <Row span={24} style={{ background: '#fff', marginLeft: 40, marginTop: 10, padding: 10 }}>

                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h3>Report Filter</h3>
                </div>


            </Row>

            <Row span={20}>
                <Col span={10} style={{ marginLeft: 18 }}>
                    <Row span={10} style={{ marginTop: 10 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>

                            <h3>Vendorname</h3>
                        </Col>
                    </Row>
                    <Row span={10}>
                        <Col span={10}>
                            <Select  mode="multiple"  allowClear onChange={ (val) => {props.Genratefilter('vendorfilter',val, true)}}  style={{ width: 300, marginLeft: 20, marginRight: 20 }}  >
                                {Vendornamestate.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>
                                ))}
                                {/* (e) => { props.Genratefilter('vendorfilter',Vendorname) } */}
                            </Select>
                        </Col>
                    </Row>

                </Col>



                <Col span={10}>

                    <Row span={10} style={{ marginTop: 10 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>

                            <h3>Brandname</h3>
                        </Col>
                    </Row>
                    <Row span={10}>
                        <Col span={10}>
                            <Select mode="multiple" allowClear onChange={ (val) => {props.Genratefilter('brandfilter',val, true)}}  style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
                                {Brandnamestate.map((val, i) => (
                                    <Option  value={val} key={val}>{val}</Option>
                                ))}

                            </Select>
                        </Col>
                    </Row>

                </Col>
            </Row>

            <Row span={20}>
                <Col span={10} style={{ marginLeft: 18 }}>
                    <Row span={10} style={{ marginTop: 10 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>

                            <h3>Collection</h3>
                        </Col>
                    </Row>
                    <Row span={10}>
                        <Col span={10}>
                            <Select mode="multiple" allowClear onChange={ (val) => {props.Genratefilter('collectionfilter',val, true)}}   style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
                                {Collectionstate.map((val, i) => (
                                    <Option  value={val} key={val}>{val}</Option>
                                ))}

                            </Select>
                        </Col>
                    </Row>

                </Col>



                <Col span={10}>

                    <Row span={10} style={{ marginTop: 10 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>

                            <h3>Category</h3>
                        </Col>
                    </Row>
                    <Row span={10}>
                        <Col span={10}>
                            <Select mode="multiple" allowClear onChange={ (val) => {props.Genratefilter('categoryfilter',val, true)}}   style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
                                {categorynamestate.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>
                                ))}

                            </Select>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row span={20}>
                <Col span={10} style={{ marginLeft: 18 }}>
                    <Row span={10} style={{ marginTop: 10 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>

                            <h3>Type</h3>
                        </Col>
                    </Row>
                    <Row span={10}>
                        <Col span={10}>
                            <Select onChange={ (val) => {props.Genratefilter('Typefilter',val, false)}}  style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
                                {Type.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>
                                ))}

                            </Select>
                        </Col>
                    </Row>

                </Col>



                <Col span={10}>

                    <Row span={10} style={{ marginTop: 10 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>

                            <h3>PU Status</h3>
                        </Col>
                    </Row>
                    <Row span={10}>
                        <Col span={10}>
                            <Select onChange={ (val) => {console.log(val);props.Genratefilter('pustatusfilter',val, false)}}  style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
                                {puStatusstate.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>
                                ))}

                            </Select>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row span={20}>
                <Col span={10} style={{ marginLeft: 18 }}>
                    <Row span={10} style={{ marginTop: 10 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>

                            <h3>Style Code</h3>
                        </Col>
                    </Row>
                    <Row span={10}>
                        <Col span={10}>
                            <Input  onChange={ (event) => {props.Genratefilter('stylecodefilter',event.target.value, false)}}  style={{ width: 300, marginLeft: 20, marginRight: 20 }} placeholder="Style Code" />
                        </Col>
                    </Row>

                </Col>



            </Row>
        </>
    )
};

export default filterReport;