import { Row, Col, Menu, Card, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../../style';
import { UploadOutlined } from '@ant-design/icons';
import { Main } from '../../../../styled';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../../components/autoComplete/autoComplete';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../../../components/utilities/utilities'
import { Button } from '../../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";







const EbayHtml = (props) => {

    const [htmlState, htmlSetState] = useState({
        vendorStyleCode: '',
        styleCode: '',
        sizeMin: '',
        sizeMax: '',
        Feature_1: '',
        Feature_2: '',
        Feature_3: '',
        Feature_4: '',
        Feature_5: '',
        dataSource: [],
        size: [],
        sizeType: [],
        sizeValue: [],
        sizeDesc: []

    })
    // let dataSource = [];
    let counter = 0;

    const columns = [
        {
            title: 'SizeType',
            dataIndex: 'sizeType',
            key: 'sizeType',

        },
        {
            title: 'SizeValue',
            dataIndex: 'sizeValue',
            key: 'sizeValue',

        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',

        }
        // {
        //     title: 'S',
        //     dataIndex: 's',
        //     key: 's',
        // },
        // {
        //     title: 'M',
        //     dataIndex: 'm',
        //     key: 'm',
        // },
        // {
        //     title: 'L',
        //     dataIndex: 'l',
        //     key: 'l',
        // },
        // {
        //     title: 'XL',
        //     dataIndex: 'xl',
        //     key: 'xl',
        // },
        // {
        //     title: '2XL',
        //     dataIndex: 'xxl',
        //     key: 'xxl',
        // },
        // {
        //     title: '3XL',
        //     dataIndex: 'xxxl',
        //     key: 'xxxl',
        // },

    ];

    const data = [
        {
            key: '1',
            size: 'Body Width',
            s: '18',
            m: '18',
            l: '18',
            xl: '18',
            xxl: '18',
            xxxl: '18',
        },
        {
            key: '1',
            size: 'Body Width',
            s: '18',
            m: '18',
            l: '18',
            xl: '18',
            xxl: '18',
            xxxl: '18',
        },
        {
            key: '1',
            size: 'Body Width',
            s: '18',
            m: '18',
            l: '18',
            xl: '18',
            xxl: '18',
            xxxl: '18',
        },
        {
            key: '1',
            size: 'Body Width',
            s: '18',
            m: '18',
            l: '18',
            xl: '18',
            xxl: '18',
            xxxl: '18',
        },
        {
            key: '1',
            size: 'Body Width',
            s: '18',
            m: '18',
            l: '18',
            xl: '18',
            xxl: '18',
            xxxl: '18',
        },
        {
            key: '1',
            size: 'Body Width',
            s: '18',
            m: '18',
            l: '18',
            xl: '18',
            xxl: '18',
            xxxl: '18',
        },
        {
            key: '1',
            size: 'Body Width',
            s: '18',
            m: '18',
            l: '18',
            xl: '18',
            xxl: '18',
            xxxl: '18',
        },
        {
            key: '1',
            size: 'Body Width',
            s: '18',
            m: '18',
            l: '18',
            xl: '18',
            xxl: '18',
            xxxl: '18',
        }
    ];

    const { state } = props
    const { EbayHtml } = state
    const { vendorStyleCode, styleCode, sizeMin, sizeMax, Feature_1, Feature_2, Feature_3, Feature_4, Feature_5, dataSource, size, sizeType, sizeValue, sizeDesc } = htmlState

    useEffect(() => {

        // htmlSetState({
        //     vendorStyleCode: EbayHtml[2][0].VENDORSTYLECODE, styleCode: EbayHtml[2][0].STYLECODE,
        //     sizeMin: EbayHtml[0][0].SIZE, sizeMax: EbayHtml[0][EbayHtml[0].length - 1].SIZE,
        //     Feature_1: EbayHtml[1][0].FEATURE_1,
        //     Feature_2: EbayHtml[1][0].FEATURE_2,
        //     Feature_3: EbayHtml[1][0].FEATURE_3,
        //     Feature_4: EbayHtml[1][0].FEATURE_4,
        //     Feature_5: EbayHtml[1][0].FEATURE_5,
        // })
        // // console.log(EbayHtml[0])
        // // console.log(renderTableHeader())

        let tempdata = []
        if (EbayHtml[0].length)
            EbayHtml[0].map(value => {


                const { SIZE, SIZETYPE, SIZE_VALUE } = value;


                tempdata.push({
                    key: counter++,

                    //  OrderNo: <span style={{ color: 'black' }} className="date-started">{OrderNo}</span>,
                    sizeType: <span style={{ color: 'black' }} className="date-started">{SIZETYPE}</span>,
                    size: <span style={{ color: 'black' }} className="date-started">{SIZE}</span>,
                    sizeValue: <span style={{ color: 'black' }} className="date-started">{SIZE_VALUE}</span>,



                });
            });
        // // console.log('tempdata', tempdata)
        htmlSetState({
            vendorStyleCode: EbayHtml[2][0].VENDORSTYLECODE, styleCode: EbayHtml[2][0].STYLECODE,
            sizeMin: EbayHtml[0][0].SIZE, sizeMax: EbayHtml[0][EbayHtml[0].length - 1].SIZE,
            Feature_1: EbayHtml[1][0].FEATURE_1,
            Feature_2: EbayHtml[1][0].FEATURE_2,
            Feature_3: EbayHtml[1][0].FEATURE_3,
            Feature_4: EbayHtml[1][0].FEATURE_4,
            Feature_5: EbayHtml[1][0].FEATURE_5,
            dataSource: tempdata,
            size: [...new Set(EbayHtml[0].map(value => value.SIZE))],
            sizeType: [...new Set(EbayHtml[0].map(value => value.SIZETYPE))],
            sizeDesc: [...new Set(EbayHtml[0].map(value => value.SIZETYPEDESCRIPTION))],
            sizeValue: EbayHtml[0]
        })
        //const dist =[...new Set(EbayHtml[0].map(value=>value.SIZE))]
    }, [])


    return (
        <>
            <div>

                <Row className="top-header">
                    <Col>
                        <p>(8AM-9PM Mon-Fri EST)</p>
                    </Col>
                </Row>

                <Row align="middle" className="header">
                    <Col span={12}>
                        <img src="https://www.pulseuniform.com/images/logo.png" />
                    </Col>
                    <Col span={12}>
                        <Menu className="nav">
                            <Menu.Item>
                                <a href="#">Home</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">About</a>
                            </Menu.Item>
                            <Menu.Item>
                                <a href="#">Feedback</a>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>

                <Row className="content-box">
                    <Col>
                        <Card title="Browse Category" style={{ width: 300 }}>
                            <ul className="category-list">
                                <li><a href="#">Scrub Tops</a></li>
                                <li><a href="#">Scrub Paints</a></li>
                                <li><a href="#">Lab Coats</a></li>
                                <li><a href="#">Scrub Jacket</a></li>
                                <li><a href="#">Custom Uniform</a></li>
                            </ul>
                        </Card>
                    </Col>
                </Row>

                <Row className="content-box">
                    <Col>
                        <Card title="Why PulseUniform?" style={{ width: 300 }}>
                            <ul className="category-list">
                                <li>
                                    <p>A one stop resource for your all discounted medical
                                    uniforms & nursing uniforms need. Our Discount Price policy make
                                    us unique in medical uniform industry. We do made to order uniforms
                                    for Plus and Petites size. You will find unisex scrubs, women scrubs,
                                    men scrubs, printed jackets, scrub pants, lab coats, nurse shoes, clogs, plogs,
                                    cartoon scrubs, denim scrub sets & more. Major medical uniforms brands available
                                    </p>
                                </li>
                            </ul>
                        </Card>
                    </Col>
                </Row>


                <Row className="content-box">
                    <Col span={24}>
                        <h2>DESCRIPTION</h2>
                    </Col>
                    <Col span={16}>
                        {/* <p className="description-pera">
                            A one stop resource for your all discounted medical uniforms & nursing uniforms need. 
                            A one stop resource for your all discounted medical uniforms & nursing uniforms need.
                        </p> */}

                        <h1>Style {vendorStyleCode}</h1>
                        <h1>Style#: {styleCode}</h1>
                    </Col>
                    <Col span={8}>

                        <h1> {sizeMin}-{sizeMax}</h1>

                    </Col>

                    <Col span={24} className="description-conn">
                        {/* <h1>Personalization</h1> */}

                        {/* <h3>For Name  / Title Embroidery</h3> */}
                        <p>
                            {Feature_1}
                        </p>
                        <p>
                            {Feature_2}
                        </p>
                        <p>
                            {Feature_3}
                        </p>
                        <p>
                            {Feature_4}
                        </p>
                        <p>
                            {Feature_5}
                        </p>
                    </Col>
                    <Col span={24}>
                        <h2>SIZING</h2>
                        <p>Please double check size prior to shopping. Perhaps by comparing the size to one of your own scrub tops.</p>
                    </Col>
                </Row>


                <Row className="content-box">

                    <Col span={24}>
                        <p className="description-pera">
                            A one stop resource for your all discounted medical uniforms & nursing uniforms need.
                            A one stop resource for your all discounted medical uniforms & nursing uniforms need.
                        </p>
                    </Col>
                    <Col span={24}>
                        {/* <Table columns={columns} dataSource={dataSource} /> */}
                        <table>
                            <thead>
                                <tr>
                                    <th>SIZE</th>

                                    {

                                        size.map(value => (
                                            <th>


                                                <td>{value}</td>
                                            </th>


                                        ))

                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sizeType.map(value => (

                                        // <tr key={item.id}>
                                        <tr><td>{value}</td>


                                            {

                                                sizeValue.map(sizeValue => (
                                                    sizeValue.SIZETYPE === value && <td>{sizeValue.SIZE_VALUE}</td>
                                                ))
                                            }
                                        </tr>
                                    ))

                                }
                            </tbody>
                        </table>
                    </Col>
                    <Col span="24">
                        <table>
                            <tbody>
                                <h2>PERSONALIZATION</h2>
                                {
                                    sizeType.map(value => (


                                        <tr><td>{value}</td>


                                            {
        // console.log('asdas0', sizeDesc[0]),
                                                sizeValue.map(sizeValue => (

  sizeValue.SIZETYPE === value && sizeValue.SIZETYPEDESCRIPTION === sizeDesc[0] && <td> {sizeDesc[0]}</td>
                                                    
                                                ))
                                            }
                                        </tr>
                                    ))

                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>

            </div>

        </>
    )

}



export default EbayHtml;