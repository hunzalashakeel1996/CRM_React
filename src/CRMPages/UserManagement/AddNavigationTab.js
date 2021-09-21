import { Checkbox, Col, Collapse, Input, notification, Row, Select, Spin, Tabs } from 'antd';
import e from 'cors';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { checkPageAccess } from '../../components/utilities/utilities';
import { getSideAndTopNavBar, insertSideNavandTopApi } from '../../redux/apis/DataAction';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;

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
        parentBarList: [],
        childBarList: {},
        topNavList: {},
        dataSource: [],
        selectedParentBar: '',
        selectedChildBars: [],
        isNewParent: false,

    })
    const { topNavList, selectedParentBar, isNewParent, selectChildBar, parentbar, childBar, topBar, dataSource, parentBarList, statusParent, statusChild, statusTop, childBarList, tempNavigationObject, status, selectedId, selectedChildBars} = state
   
    useEffect(() => {
        setState({...state, isLoader: true})
        dispatch(getSideAndTopNavBar()).then(data => {
            let parentBarTemp = []
            let childBarTemp = {}
            let topNavTemp = {}

            console.log('data', data)
            data.map(value => {
                const { parent_bar, child_bar, top_navigation } = value;
                parentBarTemp.push(parent_bar)
                childBarTemp[parent_bar]=JSON.parse(child_bar)
                topNavTemp[parent_bar]=JSON.parse(top_navigation)
            })
            setState({ ...state, parentBarList: parentBarTemp, dataSource: data, childBarList:childBarTemp, topNavList:topNavTemp, isLoader: false })
        })
    }, []);

    const InsertSideNavandTop = () => {
        let index = dataSource.findIndex(val => val.parent_bar===selectedParentBar)
        let data = {id:isNewParent?index+1:dataSource[index].id, parent_bar:selectedParentBar, child_bar: JSON.stringify(childBarList[selectedParentBar]), top_navigation: JSON.stringify(topNavList[selectedParentBar]), isNew: isNewParent}
        setState({...state, isLoader: true})
        console.log('result', data)
        dispatch(insertSideNavandTopApi(data)).then(res => {
            notification.success({
                message: `navigation insert successfully`,
                description: `Successfully inserted`,
                onClose: close,
            });
        setState({...state, isLoader: false})
        })
    }

    const onChildBarAdd = (value) => {
        // get list of selected parent child bar from actualy datasource data 
        let index = dataSource.findIndex(val => val.parent_bar===selectedParentBar)
        console.log('childBar',dataSource)
        let actualChildbarList = [...JSON.parse(dataSource[index].child_bar)]
        
        // copy all values into child bar list and update it 
        let tempChildBar = {...childBarList}
        tempChildBar[selectedParentBar] = [...actualChildbarList,...value]
        tempChildBar[selectedParentBar] = [...new Set(tempChildBar[selectedParentBar])] // to remove duplicate items

        // check if added value is in top nav object if not then enter add empty arrray 
        let tempTopNav = JSON.parse(JSON.stringify({...topNavList}))
        if(!Object.keys(tempTopNav[selectedParentBar]).includes(value)){
            tempTopNav[selectedParentBar][value]=[]
        }

        setState({...state, selectedChildBars: [...value],childBarList:{...tempChildBar},  topNavList: {...tempTopNav}})
    }

    const onTopNavAdd = (value, childBar) => {
        // get list of selected top navigation from actualy datasource data 
        let index = dataSource.findIndex(val => val.parent_bar === selectedParentBar)
        let actualTopNavList = {...JSON.parse(dataSource[index].top_navigation)}
        // copy all values into child bar list and update it 
        let topNavListTemp = JSON.parse(JSON.stringify({...topNavList}))
        topNavListTemp[selectedParentBar][childBar] = [...actualTopNavList[childBar]?actualTopNavList[childBar]:[],...value]
        topNavListTemp[selectedParentBar][childBar] = [...new Set(topNavListTemp[selectedParentBar][childBar])] // to remove duplicate items
        setState({...state, topNavList:{...topNavListTemp} })
    }

    const onAddNewParent = (value) => {
        let tempDataSource = [...dataSource]
        let parentBarTemp = [...parentBarList]
        let childBarTemp = {...childBarList}
        let topNavTemp = {...topNavList}

        // remove previos name values from variables
        tempDataSource.pop()
        parentBarTemp.pop()
        delete childBarTemp[selectedParentBar!='' ?selectedParentBar:'temp']
        delete topNavTemp[selectedParentBar!='' ?selectedParentBar:'temp']

        // insert new objects with new name in variables
        tempDataSource.push({child_bar: JSON.stringify([]), parent_bar: value, top_navigation: JSON.stringify({})})
        parentBarTemp.push(value)
        childBarTemp[value] = []
        topNavTemp[value] = {}

        setState({...state, dataSource: [...tempDataSource], 
            selectedParentBar: value, parentBarList: [...parentBarTemp], childBarList: {...childBarTemp},
            topNavList: {...topNavTemp}})
    }

    const onAddParentCheck = (val) => {
        let tempDataSource = [...dataSource]
        let parentBarTemp = [...parentBarList]
        let childBarTemp = {...childBarList}
        let topNavTemp = {...topNavList}

        // if user remove check from add new parent 
        if(isNewParent){
            tempDataSource.pop()
            parentBarTemp.pop()
            delete childBarTemp[selectedParentBar!='' ?selectedParentBar:'temp']
            delete topNavTemp[selectedParentBar!='' ?selectedParentBar:'temp']
        }
        // if user check to add new parent bar
        else{
            tempDataSource.push({child_bar: JSON.stringify([]), parent_bar: 'temp', top_navigation: JSON.stringify({})})
            parentBarTemp.push('temp')
            childBarTemp['temp'] = []
            topNavTemp['temp'] = {}
        }
        
        setState({...state,isNewParent: !isNewParent, dataSource: [...tempDataSource], 
                selectedParentBar: '', parentBarList: [...parentBarTemp], childBarList: {...childBarTemp},
                topNavList: {...topNavTemp}})
    }

    return (
        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

            <>
                <Row>
                    <Cards title="Add navigation"  >
                        <Row>
                            <Col span={3}>
                                <text>New parent tab?</text>
                            </Col>
                            <Col span={21}>

                                <Checkbox
                                    type="checkbox"
                                    onChange={(val) => { onAddParentCheck(val) }}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>

                            <Col span={8} >
                                {!isNewParent ?
                                <Select style={{ width: 300 }} onChange={(val) => { setState({...state, selectedParentBar: val, selectedChildBars: []}) }} value={selectedParentBar}>
                                    {parentBarList.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>

                                    ))}

                                </Select>
                                :
                                <Input onChange={(e) => { onAddNewParent(e.target.value) }} style={{ width: 300 }} placeholder="Parent name" />
                                }
                            </Col>

                            <Col span={8} >
                               
                                {selectedParentBar!==''&&
                                <Select mode="tags" style={{ width: 300 }} onChange={ (val) => {onChildBarAdd(val)}} tokenSeparators={[',']} value={selectedChildBars}>
                                    {childBarList[selectedParentBar].map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>

                                    ))}
                                </Select>}
                            </Col>

                            <Col span={8} >
                                {/* <Select disabled={state.onChecked} style={{ width: 300 }} onChange={val => { setState({ ...state, selectTopBar: val ? val : '' }) }} value={selectTopBar}>
                                    {topBar.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>
                                    ))}

                                </Select> */}
                                {selectedChildBars.length > 0 && selectedChildBars.map(selectedChildBar => (
                                    <div style={{ marginBottom: 10 }}>
                                        <p style={{ margin: 0 }}>{selectedChildBar} Top Childs:</p>
                                        <Select mode="tags" style={{ width: '100%' }} onChange={(val) => {onTopNavAdd(val, selectedChildBar)}} tokenSeparators={[',']}>
                                            
                                        </Select>
                                    </div>
                                ))
                                }
                            </Col>

                        </Row>
                        
                        <Row style={{ marginTop: 20 }}>

                            <Col span={8} >
                                <Button disabled={selectedParentBar===''} size="large" type="primary" onClick={InsertSideNavandTop} >Create</Button>
                            </Col>
                        </Row>
                    </Cards>
                </Row>
            </>
        </Spin>
    );
};

export default AddNavigationTab;