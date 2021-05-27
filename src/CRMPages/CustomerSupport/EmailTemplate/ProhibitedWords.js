import { Row, Col, Select, Input, Form, Collapse, Spin, notification } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { insertProhibitedWord } from '../../../redux/apis/DataAction';

const { Panel } = Collapse;

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

const ProhibitedWords = (props) => {
    const { TextArea } = Input;

    const [state, setState] = useState({
        isLoading: false,
        prohibitedWords: props.prohibitedWords,
        filterProhibitedWords: [],
        selectedMarketplace: 'Amazon'
    });
    const { filterProhibitedWords, isLoading, selectedMarketplace, prohibitedWords } = state
    const dispatch = useDispatch();

    const filterWordsAccordingMarketplace = (key) => {
        let temp = prohibitedWords.filter(value => key === value.marketplace_name)
        setState({ ...state, filterProhibitedWords: temp })
    }

    const onInsertWord = ({ marketplaceName, prohibitedWord }) => {
        // if word is already inside the list then show error else insert new word 
        if (prohibitedWords.filter(value => prohibitedWord.toLowerCase() === value.prohibited_word.toLowerCase()).length > 0) {
            notification['error']({
                message: 'Sorry',
                description:
                    'This word is already in the list',
            });
        } else {
            setState({ ...state, isLoading: true })
            dispatch(insertProhibitedWord({ marketplaceName: selectedMarketplace, prohibitedWord })).then(data => {
                setState({ ...state, isLoading: false, prohibitedWords: [...prohibitedWords, { marketplace_name: selectedMarketplace, prohibited_word: prohibitedWord }] })
                props.onNewWordInserterd({ marketplaceName: selectedMarketplace, prohibitedWord })
                notification['success']({
                    message: 'Successful',
                    description:
                        'New word insert successfully',
                });
            })
        }
    }

    return (
        <div>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoading} >

                <Cards title="Create New Prohibited Word"  >
                    <Form
                        validateMessages={validateMessages}
                        name="basic"
                        onFinish={onInsertWord}
                        layout="inline"
                    >
                        <Row gutter={20} >
                            <Form.Item name="marketplaceName" style={{ width: 200, marginRight: 50}}>
                                <Col >
                                    <Select
                                        size='medium'
                                        style={{ width: '100%' }}
                                        onChange={(value) => { setState({ ...state, selectedMarketplace: value }) }}
                                        defaultValue='Amazon'
                                    >
                                        {marketplaces.map(marketplace => (
                                            <Option label={marketplace} value={marketplace}>{marketplace}</Option>
                                        ))}

                                    </Select>
                                </Col>
                            </Form.Item>
                            <Form.Item name="prohibitedWord" rules={[{ required: true }]} style={{ marginRight: 50}} >
                                <Col >
                                    <Input placeholder='Prohibited Word' />
                                </Col>
                            </Form.Item>
                            <Form.Item name="button" >
                                <Col >
                                    <Button size="default" type="primary" htmlType="submit" >
                                        Insert
                                </Button>
                                </Col>
                            </Form.Item>
                        </Row>
                    </Form>
                </Cards>

                <Cards title='List of Prohibited Words'>
                    <Collapse defaultActiveKey={['1']} accordion onChange={(key) => { filterWordsAccordingMarketplace(key) }}>
                        {marketplaces.map((marketplace, i) => (
                            <Panel header={marketplace} key={marketplace}>
                                <Row>
                                    {filterProhibitedWords.map(prohibitedWord => (
                                        <Col span={6} style={{ marginTop: 10 }}>
                                            <Row style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                                                <FeatherIcon icon="alert-octagon" size={10} />
                                                <p style={{ textAlign: 'center', marginBottom: 0, marginLeft: 5 }}>{prohibitedWord.prohibited_word}</p>
                                            </Row>
                                        </Col>
                                    ))}
                                </Row>
                            </Panel>
                        ))}
                    </Collapse>
                </Cards>
            </Spin>
        </div>
    );
};

export default ProhibitedWords;

