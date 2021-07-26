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

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const AddNavigationView = (props) => {
    const dispatch = useDispatch();
    let parent = [];
    let child = [];
    let top = [];
    let temp = [];

    // let NavigationObject = {

    //     parent_bar: "",
    //     child_bar: "",
    //     top_navigation: "",
    //     type: ''


    // };
    const [state, setState] = useState({
        tempNavigationObject: {},
        topBar: [],
        childBar: [],
        parentbar: [],
        childBarList: [],
        parentBarList: [],
        dataSource: [],
        selectParentBar: '',
        selectChildBar: '',
        selectTopBar: '',
        statusParent: 'Enabled',
        statusChild: 'disabled',
        statusTop: 'disabled',
        type: '',
        status: '',
        selectedId: null,
    })
    const { type, selectParentBar, selectTopBar, selectChildBar, parentbar, childBar, topBar, dataSource, parentBarList, statusParent, statusChild, statusTop, childBarList, tempNavigationObject, status, selectedId } = state
    useEffect(() => {

        dispatch(getSideAndTopNavBar()).then(data => {
            data.map(value => {
                const { parent_bar, child_bar, top_navigation } = value;
                parent.push(
                    parent_bar
                )
            })

            setState({ ...state, parentbar: parent, dataSource: data })
        })


    }, []);

    const selectParent = (val) => {
        let tempChilds = dataSource.filter(value => value.parent_bar === val)
        console.log('aaaa', tempChilds)
        setState({ ...state, selectParentBar: val ? val: '', childBar: tempChilds.length > 0 ? JSON.parse(tempChilds[0].child_bar) : [], selectChildBar: '', selectTopBar: '', selectedId: tempChilds.length > 0 ? tempChilds[0].id : null })
    }

    const onParentEdit = (event) => {
        let tempDataSource = [...dataSource]
        // edit a existing
        if (selectedId !== null) {
            let tempIndex = tempDataSource.findIndex(value => value.id === selectedId)
            tempDataSource[tempIndex].parent_bar = event.target.value
            setState({ ...state, dataSource: [...tempDataSource], selectParentBar: event.target.value })

        }
        // create new 
        else {
            tempDataSource.push({ id: tempDataSource[tempDataSource.length - 1].id + 1, parent_bar: event.target.value, child_bar: JSON.stringify([]), top_navigation: JSON.stringify({}) })
            setState({ ...state, dataSource: [...tempDataSource], selectedId: tempDataSource[tempDataSource.length - 1].id, selectParentBar: event.target.value })
        }
    }

    const selectChild = (val) => {
        let tempChilds = dataSource.filter(value => value.id === selectedId)
        tempChilds = JSON.parse(tempChilds[0].top_navigation)[val]
        setState({ ...state, selectChildBar: val?val:'', selectTopBar: '', topBar: val?tempChilds:[] })
    }

    const onEditChildBar = (e) => {
        let singleRow = dataSource.filter(value => value.id === selectedId) // compete object of selected id 
        console.log('5', singleRow)
        let tempChilds = JSON.parse(singleRow[0].child_bar) // child bars of selected id 
        let tempTopNav = JSON.parse(singleRow[0].top_navigation)    // top navigation object of selected id
        let tempIndex = tempChilds.findIndex(value => value === selectChildBar) // index of edited object inside child bar array
        // if add new child bar 
        if (tempIndex === -1) {
            tempChilds.push(e.target.value)
            tempTopNav[e.target.value] = [] // create empty top navigation child for the new child bar
        }
        // if edit existing 
        else {
            tempTopNav[e.target.value] = [...tempTopNav[tempChilds[tempIndex]]] // copy top navigation of old name of child bar and set top navigation value to the new name
            delete tempTopNav[tempChilds[tempIndex]]    // delete old name child bar object from top navigation
            tempChilds[tempIndex] = e.target.value
        }
        let tempDataSource = [...dataSource]
        let tempParetIndex = tempDataSource.findIndex(value => value.parent_bar === selectParentBar)    // index of edit row from complete data source
        tempDataSource[tempParetIndex].child_bar = JSON.stringify(tempChilds)   // edit child bar value inside data source
        tempDataSource[tempParetIndex].top_navigation = JSON.stringify(tempTopNav)  // set top navigation of child bar inside data source
        console.log('4567, ', tempDataSource[tempParetIndex])
        setState({ ...state, selectChildBar: e.target.value, dataSource: [...tempDataSource], topBar: tempTopNav[e.target.value] })
    }

    const onEditTopBar = (val) => {
        let singleRow = dataSource.filter(value => value.id === selectedId) // complete object of selected id 
        console.log('134', dataSource)
        
        let tempTopNav = JSON.parse(singleRow[0].top_navigation)   // top navigation object of selected id
        let tempIndex = tempTopNav[selectChildBar].findIndex(value => value === selectTopBar) // index of edited object inside child bar array
        console.log('2', tempTopNav[selectChildBar])
        // if add new child bar 
        if (tempIndex === -1) {
            tempTopNav[selectChildBar].push(val)
        }
        // if edit existing 
        else {
            tempTopNav[selectChildBar][tempIndex] = val
        }
        let tempDataSource = [...dataSource]
        let tempParetIndex = tempDataSource.findIndex(value => value.parent_bar === selectParentBar)    // index of edit row from complete data source
        tempDataSource[tempParetIndex].top_navigation = JSON.stringify(tempTopNav)  // set top navigation of child bar inside data source
        console.log('1', tempDataSource[tempParetIndex])
        setState({...state, dataSource: tempDataSource, selectTopBar: val})
    }

    const InsertSideNavandTop = () => {
        let result = dataSource.filter(val => val.id === selectedId)
        // console.log('resilt0', result[0])

        // console.log('asdsdfzdf', dataSource)
        dispatch(insertSideNavandTop(result[0])).then(data => {

            notification.success({
                message: `Successfull Start ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
    }

    return (
        // <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >

        <>
            <PageHeader title="Add navigation" />
            <Row>
                <Cards title="Add navigation"  >
                    <Row style={{ marginTop: 20 }}>

                        <Col span={8} >
                            <Select allowClear style={{ width: 300 }} onChange={(val) => { selectParent(val) }} value={selectParentBar}>
                                {parentbar.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>

                                ))}

                            </Select>
                        </Col>
                        <Col span={8} >
                            {/* <Select style={{ width: 300 }} onChange={(val) => { selectChild(val) }} > */}
                            <Select allowClear style={{ width: 300 }} onChange={(val) => { selectChild(val) }} value={selectChildBar}>
                                {childBar.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>

                                ))}

                            </Select>
                        </Col>

                        <Col span={8} >
                            <Select allowClear style={{ width: 300 }} onChange={val => { setState({ ...state, selectTopBar: val?val:''}) }} value={selectTopBar}>
                                {topBar.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>
                                ))}

                            </Select>
                        </Col>

                    </Row>
                    <Row style={{ marginTop: 20 }}>

                        <Col span={8} >
                            <Input onChange={(event) => { onParentEdit(event) }} style={{ width: 300 }} placeholder="Parent name" value={selectParentBar} />
                        </Col>

                        {selectParentBar !== ''&&<Col span={8} >
                            <Input  onChange={(event) => { onEditChildBar(event) }} style={{ width: 300 }} placeholder="Child name" value={selectChildBar} />
                        </Col>}

                        {selectChildBar  !== ''&&<Col span={8} >
                            <Input  onChange={(event) => { onEditTopBar(event.target.value) }} style={{ width: 300 }} placeholder="Top bar" value={selectTopBar} />
                        </Col>}

                    </Row>
                    <Row style={{ marginTop: 20 }}>

                        <Col span={8} >
                            <Button type="primary" onClick={InsertSideNavandTop} >Create</Button>
                        </Col>
                    </Row>
                </Cards>
            </Row>
        </>
        // </Spin>
    );
};

export default AddNavigationView;

