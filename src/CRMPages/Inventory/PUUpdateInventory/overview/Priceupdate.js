import { Col, Row, Select, Spin, Radio, Checkbox, Divider, List, Card, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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

const Priceupdate = () => {
    const [value3, setvalue3] = useState(true)



    const onChange3 = e => {

        setvalue3(e.target.value)
    };
    return (
        <>
            <Row span={24} style={{ background: '#fff', marginLeft: 40, marginTop: 10, padding: 10 }}>

                <div style={{flex:1,textAlign:'center'}}>
                    <h3>PU Price # ASIN # Upload Type -- Update</h3>
                </div>


            </Row>

            <Row span={20} style={{ marginTop: 20, marginLeft: 18 }}>
                <Col span={10} style={{ marginLeft: 18 }}>
                <Row  >
                                <Col span={12}  >


                                    <Select defaultValue="Select" style={{ width: 220 }} >

                                        <Option value="PUPrice" >PU Price</Option>
                                        <Option value="ASIN">ASIN</Option>
                                        <Option value="Uploadtype" >Upload Type</Option>

                                    </Select>

                                </Col>

                                <Col span={12} >

                                    <Upload >
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>


                                </Col>
                            </Row>


                </Col>

                <Col span={10} >

                    <Row >
                        <Col span={12}  >


                         <Checkbox >Force To Update</Checkbox>

                        </Col>
                        <Col span={12} >

                            <Button type="primary">Submit</Button>


                        </Col>

                    </Row>


                </Col>
            </Row>



        </>
    )
};

export default Priceupdate;