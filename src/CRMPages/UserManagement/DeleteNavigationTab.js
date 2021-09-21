import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Select, Tabs, Table, Upload, Row, Col, Switch, Checkbox, Collapse, Spin, notification } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { getSideAndTopNavBar, insertSideNavandTop } from '../../redux/apis/DataAction';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import startOfYesterday from 'date-fns/startOfYesterday';
import e from 'cors';


const DeleteNavigationTab = (props) => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        isLoader: true,
        selectedParent: '',
        selectedChild: '',
        selectedTopNav: '',
        parentBarList: [],
        childBarList: {},
        topNavList: {},
        dataSource: [],
    })
    const { isLoader, selectedParent, selectedChild, selectedTopNav, parentBarList, childBarList, topNavList, dataSource } = state

    useEffect(() => {
        setState({ ...state, isLoader: true })
        dispatch(getSideAndTopNavBar()).then(data => {
            let parentBarTemp = []
            let childBarTemp = {}
            let topNavTemp = {}

            console.log('data', data)
            data.map(value => {
                const { parent_bar, child_bar, top_navigation } = value;
                parentBarTemp.push(parent_bar)
                childBarTemp[parent_bar] = JSON.parse(child_bar)
                topNavTemp[parent_bar] = JSON.parse(top_navigation)
            })
            setState({ ...state, parentBarList: parentBarTemp, dataSource: data, childBarList: childBarTemp, topNavList: topNavTemp, isLoader: false })
        })
    }, []);

    const onDelete = () => {
        let index = dataSource.findIndex(val => val.parent_bar === selectedParent)

        if(selectedChild===''){
            let data = {id:dataSource[index].id, isRemoveRow: true}
        }else{
            let tempChilds = [...JSON.parse(dataSource[index].child_bar)]
            let tempTopNav = {...JSON.parse(dataSource[index].top_navigation)}

            if(selectedTopNav===''){
                tempChilds.splice(tempChilds.indexOf(selectedChild), 1)
                delete tempTopNav[selectedChild]
            }else{
                tempTopNav[selectedChild].splice(tempTopNav[selectedChild].indexOf(selectedTopNav),1)
                console.log('top', tempTopNav)
            }
        }
    }

    return (
        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={isLoader} >

            <>
                <Row>
                    <Cards title="Delete Navigation"  >
                        <Row>
                            <Col span={8}>
                                <Select style={{ width: 300 }} onChange={(val) => { setState({ ...state, selectedParent: val, selectedChild: '', selectedTopNav:''}) }} value={selectedParent}>
                                    {parentBarList.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select>
                            </Col>
                            <Col span={8}>
                                {selectedParent !== '' &&
                                    <Select style={{ width: 300 }} onChange={(val) => { setState({ ...state, selectedChild: val, selectedTopNav:'' }) }} value={selectedChild}>
                                        {childBarList[selectedParent].map((val, i) => (
                                            <Option value={val} key={val}>{val}</Option>

                                        ))}
                                    </Select>}
                            </Col>
                            <Col span={8}>
                                {selectedChild !== '' && 
                                    <Select style={{ width: '100%' }} onChange={(val) => { setState({ ...state, selectedTopNav:val }) }} value={selectedTopNav}>
                                        {topNavList[selectedParent][selectedChild].map((val, i) => (
                                            <Option value={val} key={val}>{val}</Option>

                                        ))}
                                    </Select>
                                }
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 20 }}>

                            <Col span={8} >
                                <Button disabled={selectedParent === ''} size="large" type="primary" onClick={onDelete}>Delete</Button>
                            </Col>
                        </Row>
                    </Cards>
                </Row>

            </>
        </Spin>
    )

}

export default DeleteNavigationTab