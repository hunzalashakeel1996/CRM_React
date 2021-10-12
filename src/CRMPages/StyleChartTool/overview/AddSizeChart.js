import { Col, Row, Input, Spin, Select, Checkbox, Divider, List, Card, Popover } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { Cards } from '../../../components/cards/frame/cards-frame';

const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
const AddSizeChart = (props) => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        loader: true,
        title: '',
        colorCode: '',
        numberOfRows: 2,
        numberOfColumns: 3
    });
    const { loader, title, colorCode, numberOfRows, numberOfColumns } = state;


    return (
        <>
            <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                <Row gutter={20}>
                    <Col span={12}>
                        <Input placeholder="Title" onChange={(val) => { console.log('val') }} />
                    </Col>

                    <Col span={12}>
                        <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                    </Col>
                </Row>

                <Row gutter={20} style={{marginTop: 20}}>
                    <Col span={12}>
                        <Select  showSearch defaultValue='' style={{ width: '100%' }} onChange={(val) => { setState({...state, numberOfRows: val}) }}>
                            <Option key=''>Rows</Option>
                            {numbers.map((number) => (
                                <Option key={number}>{number}</Option>
                            ))}
                        </Select>
                    </Col>

                    <Col span={12}>
                        <Select showSearch defaultValue='' style={{ width: '100%' }} onChange={(val) => { setState({...state, numberOfColumns: val}) }}>
                            <Option key=''>Columns</Option>
                            {numbers.map((number) => (
                                <Option key={number}>{number}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>


                <Row style={{  marginTop: 20 }}>
                    <Col style={{ overflow: 'auto' }}>
                        <div style={{ maxWidth: 1920, borderLeft: 'solid 1px grey' }}>
                            {numbers.map((number, indexRow) => (
                                numberOfRows >= indexRow + 1 &&
                                <Row gutter={20} style={{ flexWrap: 'nowrap', width: '100%' }}>
                                    {numbers.map((number, indexColumn) => (
                                        (numberOfColumns >= indexColumn + 1 ) &&
                                        <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey', borderTop: 'solid 1px grey' }} span={4}>
                                            {<Input disabled={indexRow===0&&indexColumn===0}  onChange={(val) => { console.log('val') }} />}
                                        </Col>
                                    ))}
                                </Row>
                            ))}

                            {/* <Row gutter={20} style={{ flexWrap: 'nowrap' }}>
                                <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
                                <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col>
                                <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col>
                                <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col>
                            </Row>
                            <Row gutter={20} style={{ flexWrap: 'nowrap' }}>
                                <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col>
                                <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col>
                                <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col>
                                <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
                                    <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
                                </Col>
                            </Row> */}
                        </div>
                    </Col>
                </Row>


            </div>
        </>
    );
};

export default AddSizeChart;




// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>