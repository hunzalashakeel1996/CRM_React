import { Col, Row, Select, Spin, Radio, Checkbox, Divider, List, Card, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';



import { Button } from '../../components/buttons/buttons';
import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
const Vendorname = ['Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs'];
const Brandname = ['Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs'];
const Collection = ['Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs'];
const Catrgory = ['Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs', 'Cherokee', 'Sanmar', 'Alpha Broder', 'Wonder Wink Scrubs'];
const Status = ['Active', 'New Pendding', 'All'];
const Type = ['All', 'Inhouse'];
const options = [
    { label: 'True', value: 'True' },
    { label: 'False', value: 'False' },

];

const filterReport = () => {
    const [value3, setvalue3] = useState(true)



    const onChange3 = e => {

        setvalue3(e.target.value)
    };
    return (
        <>
            <Row span={24} style={{ background: '#fff', marginLeft: 40, marginTop: 10, padding: 10 }}>

                <div style={{flex:1,textAlign:'center'}}>
                    <h3>Promotion</h3>
                </div>


            </Row>

            <Row span={20} style={{ marginTop: 20, marginLeft: 18 }}>
                <Col span={10} style={{ marginLeft: 18 }}>

                    <Row>

                        <Col span={12} >
                            <Row span={24} >
                                <Col span={1}  >


                                     <Button size="large"  type="primary">AB Sale Upload</Button>

                                </Col>

                                <Col span={4} offset={19}>

                                     <Button size="large"  type="danger">AB Sale End</Button>


                                </Col>
                            </Row>


                        </Col>
                    </Row>
                    <Row span={10} style={{ marginTop: 20 }}>
                        <Col span={10} style={{ width: 300, marginRight: 20 }}>
                            <Upload >
                                 <Button size="large"  icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Col>
                    </Row>

                </Col>

                <Col span={10} >

                    <Row >
                        <Col span={12}  >


                             <Button size="large"  type="primary">Sanmar Sale End </Button>

                        </Col>
                        <Col span={12} >

                             <Button size="large"  type="danger">Sanmar Sale End</Button>


                        </Col>

                    </Row>
                    <Row span={10} style={{ marginTop: 20 }}>
                        <Col span={10} >
                            <Upload >
                                 <Button size="large"  icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Col>
                    </Row>

                </Col>
            </Row>

            <Row style={{ marginTop: 20}}>
                <Col span={10} style={{ marginLeft: 18}} >

                    <Row style={{ marginLeft: 18}} >

                        <Col span={10} >


                             <Button size="large"  type="primary">Automate SKU</Button>

                        </Col>

                        <Col span={12} >

                            <Radio.Group
                                options={options}
                                onChange={onChange3}
                                value={value3}
                                optionType="button"
                                buttonStyle="solid"
                            />



                        </Col>
                    </Row>
                    <Row span={10} style={{ marginTop: 20 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
                            <Upload >
                                 <Button size="large"  icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Col>
                    </Row>

                </Col>



                <Col span={10} style={{ marginLeft: 10}}>

                    <Row  >

                        <Col span={12}  >


                             <Button size="large"  type="primary">Report Data</Button>

                        </Col>

                        <Col span={12} >


                            <Radio.Group
                                options={options}
                                onChange={onChange3}
                                value={value3}
                                optionType="button"
                                buttonStyle="solid"
                            />


                        </Col>
                    </Row>
                    <Row span={10} style={{ marginTop: 20 }}>
                        <Col span={10}>
                            <Upload >
                                 <Button size="large"  icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row span={20}>
                <Col span={10} style={{ marginLeft: 18 }}>

                    <Row span={10} >

                        <Col span={10} style={{ marginLeft: 20 }} >
                            <Row span={24} >
                                <Col span={1}  >


                                     <Button size="large"  type="primary">MarketPlace Price Weight</Button>

                                </Col>

                                
                            </Row>


                        </Col>
                    </Row>
                    <Row span={10} style={{ marginTop: 20 }}>
                        <Col span={10} style={{ width: 300, marginLeft: 20, marginRight: 20 }}>
                            <Upload >
                                 <Button size="large"  icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Col>
                    </Row>

                </Col>



            </Row>

        </>
    )
};

export default filterReport;