import { Row, Col, Select, Input, Form, Spin, notification } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';

const marketplaces = ['Amazon', 'Ebay', 'Walmart', 'Sears']

const validateMessages = {
    required: '${name} is required!',
    types: {
        email: '${name} is not validate email!',
        number: '${name} is not a validate number!',
    },
    number: {
        range: '${name} must be between ${min} and ${max}',
    },
};

const EmailTemplate = ({ prohibitedWords }) => {
    const { TextArea } = Input;

    const [state, setState] = useState({
        selectedMarketplace: 'Amazon',
        emailText: '',
        isLoading: false,
        downLoadLink: '',
    });

    const { selectedMarketplace, emailText, emailRender } = state

    const dispatch = useDispatch();

    const onCheckCorrection = () => {
        let selectedMarketplaceWords = prohibitedWords.filter(value => value.marketplace_name === selectedMarketplace)
        let isCorrectEmail = true
        let temp = document.getElementById("emailCheckerTextarea").textContent

        selectedMarketplaceWords.map(({prohibited_word}) => {
            if (temp.toLowerCase().match("\\b" +prohibited_word.toLowerCase()+ "\\b")) {
                isCorrectEmail = false
                temp = temp.toLowerCase().replaceAll(prohibited_word.toLowerCase(), `<mark style='background:red; color:white'>${prohibited_word}</mark> `)
                setState({ ...state, emailText: temp })
                document.getElementById("emailCheckerTextarea").remove()
            }
            document.getElementById("textAreaParent").innerHTML = `<div contenteditable="true" style='padding:5px; border: 1px solid black;width:100% !important;min-height:200px !important;white-space: pre-line; border-color:#d9d9d9;' id='emailCheckerTextarea'>${temp}</div>`;
        })

        notification[isCorrectEmail ? 'success' : 'warning']({
            message: isCorrectEmail ? 'Successful' : 'Alert',
            description:
                isCorrectEmail ? 'Your email contains no prohibited words' : 'Your email contains prohibited words',
        });
    }

    if (document.getElementById("emailCheckerTextarea"))
        document.getElementById("emailCheckerTextarea").addEventListener("keydown", function (event) {
            //do something on keydown
            if (event.which == 13) {
                //enter key was pressed
                document.execCommand('insertHTML', false, '<br/>');
            }
        });

    return (
        <div>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={prohibitedWords.length <= 0} >
                <Row >
                    <Cards size="large" title='Email Template'>
                        <Form validateMessages={validateMessages}
                            name="basic"
                            onFinish={onCheckCorrection}
                        >
                            <Row>
                                <Col span={6}>
                                    <Form.Item name="selectedMarketPlace" initialValue="Amazon" label="" rules={[{ required: true }]}>
                                        <Select
                                            size={'medium'}
                                            style={{ width: '100%' }}
                                            onChange={(value) => { setState({ ...state, selectedMarketplace: value }) }}
                                            defaultValue='Amazon'
                                        >
                                            {marketplaces.map(marketplace => (
                                                <Option label={marketplace} value={marketplace}>{marketplace}</Option>
                                            ))}

                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="button" initialValue="" label="">
                                        <Button key="1" type="success" size="small" style={{ marginLeft: 20 }} htmlType="submit" >
                                            Check Email
                                    </Button>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row style={{ marginTop: 20 }} id='textAreaParent'>
                                {/* <Form.Item value={emailText} name="emailText"  label="" rules={[{ required: true }]} style={{ width: '100%' }} > */}
                                <div contenteditable="true" style={{ width: '100%', minHeight: 200, borderWidth: 2, borderStyle: 'solid', borderColor: '#d9d9d9', padding: 5, wordWrap: 'break-word' }} id='emailCheckerTextarea'>{emailText}</div>

                                {/* </Form.Item> */}
                            </Row>
                        </Form>
                    </Cards>
                </Row>
            </Spin>
        </div>
    );
};

export default EmailTemplate;

