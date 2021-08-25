import { Checkbox, Col, Collapse, Input, notification, Row, Select, Spin, Tabs } from 'antd';
import e from 'cors';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getSideAndTopNavBar, insertSideNavandTop } from '../../redux/apis/DataAction';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const AddNavigationTab = (props) => {
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
        onChecked: false,
        isLoader: true,
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

            setState({ ...state, parentbar: parent, dataSource: data, isLoader: false })
        })


    }, []);

    const selectParent = (val) => {
        let tempChilds = dataSource.filter(value => value.parent_bar === val)
        console.log('aaaa', tempChilds)
        setState({ ...state, selectParentBar: val ? val : '', childBar: tempChilds.length > 0 ? JSON.parse(tempChilds[0].child_bar) : [], selectChildBar: '', selectTopBar: '', selectedId: tempChilds.length > 0 ? tempChilds[0].id : null })
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
        setState({ ...state, selectChildBar: val ? val : '', selectTopBar: '', topBar: val ? tempChilds : [] })
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
        setState({ ...state, dataSource: tempDataSource, selectTopBar: val })
    }


    const onCheckboxClick = (data) => {
        console.log(data.target.checked);
        if (data.target.checked == true) {
            console.log('OK bye')
            setState({ ...state, onChecked: true })
        }
        else {
            setState({ ...state, onChecked: false })
        }
    }

    const InsertSideNavandTop = () => {
        let result = dataSource.filter(val => val.id === selectedId)

        result[0]['isNew'] = state.onChecked;
        console.log('asdsdfzdf', result[0])
        dispatch(insertSideNavandTop(result[0])).then(data => {

            notification.success({
                message: `Successfull Start ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });

        })
    }

    return (
        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

            <>
                <Row>
                    <Cards title="Add/Update navigation"  >
                        <Row>
                            <Col span={3}>
                                <text>New parent tab..?</text>
                            </Col>
                            <Col span={21}>

                                <Checkbox
                                    type="checkbox"
                                    //     label={label}
                                    onChange={(val) => { onCheckboxClick(val) }}
                                //     key={label}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>

                            <Col span={8} >
                                <Select disabled={state.onChecked} allowClear style={{ width: 300 }} onChange={(val) => { selectParent(val) }} value={selectParentBar}>
                                    {parentbar.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>

                                    ))}

                                </Select>
                            </Col>
                            <Col span={8} >
                                <Select disabled={state.onChecked} allowClear style={{ width: 300 }} onChange={(val) => { selectChild(val) }} value={selectChildBar}>
                                    {childBar.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>

                                    ))}

                                </Select>
                            </Col>

                            <Col span={8} >
                                <Select disabled={state.onChecked} allowClear style={{ width: 300 }} onChange={val => { setState({ ...state, selectTopBar: val ? val : '' }) }} value={selectTopBar}>
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

                            {selectParentBar !== '' && <Col span={8} >
                                <Input onChange={(event) => { onEditChildBar(event) }} style={{ width: 300 }} placeholder="Child name" value={selectChildBar} />
                            </Col>}

                            {selectChildBar !== '' && <Col span={8} >
                                <Input onChange={(event) => { onEditTopBar(event.target.value) }} style={{ width: 300 }} placeholder="Top bar" value={selectTopBar} />
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
        </Spin>
    );
};

export default AddNavigationTab;
