import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Select, Tabs, Table, Upload, Row, Col, Switch, Checkbox, Collapse, Spin,notification } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { getSideAndTopNavBar,insertSideNavandTop } from '../../redux/apis/DataAction';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import startOfYesterday from 'date-fns/startOfYesterday';

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
        selectParentBar: [''],
        selectChildBar: [''],
        selectTopBar: [],
        statusParent: 'Enabled',
        statusChild: 'disabled',
        statusTop: 'disabled',
        type:'',
        status: ''

    })
    const { type,selectParentBar,selectTopBar,selectChildBar, parentbar, childBar, topBar, dataSource, parentBarList, statusParent, statusChild, statusTop, childBarList, tempNavigationObject, status } = state
    useEffect(() => {

        dispatch(getSideAndTopNavBar()).then(data => {
            // console.log(data)

            // // console.log(JSON.parse(data.top_navigation))
            //JSON.stringify(data)
            data.map(value => {

                const { parent_bar, child_bar, top_navigation } = value;
                parent.push(
                    parent_bar
                    //   Parent: <span style={{ color: 'black' }} className="date-started">{parent_bar}</span>,
                )

                // JSON.parse(child_bar).map(child=>{
                //     //  // console.log('child',value)
                //     temp.push({
                //      //   Parent: <span style={{ color: 'black' }} className="date-started">{value}</span>,
                //      parent_bar: <span style={{ color: 'black' }} className="date-started">{child}</span>,
                //         // 'childBar':child
                //     })

                //     JSON.parse(top_navigation)[child].map(top=>{
                //         //  // console.log('child',value)
                //         temp.push({
                //         //     'topBar':top
                //      //   Parent: <span style={{ color: 'black' }} className="date-started">{value}</span>,
                //     //    Child: <span style={{ color: 'black' }} className="date-started">{child}</span>,
                //     child: <span style={{ color: 'black' }} className="date-started">{top}</span>,
                //         })

                //     })   
                // })   


                // // console.log('child',child)
            })

            // // console.log(temp.da)   
            setState({ ...state, parentbar: parent, dataSource: data })
        })


    }, []);


    //  const columns = [
    //       {
    //         title: 'Parent',
    //         dataIndex: 'Parent',
    //         key: 'Parent',
    //       },
    //       {
    //         title: 'Child',
    //         dataIndex: 'parent_bar',
    //         key: 'parent_bar',
    //       },
    //       {
    //         title: 'Top',
    //         dataIndex: 'child',
    //         key: 'child',
    //       }

    //     ];
    const selectParent = (data) => {
        var filter = dataSource.filter(val => val.parent_bar === data)
        setState({ ...state, statusParent: 'disabled', statusChild: 'Enabled', parentBarList: filter[0].parent_bar, childBar: JSON.parse(filter[0].child_bar), childBarList: data })
    }
    const selectChild = (data) => {

        var filterParent = dataSource.filter(val => val.parent_bar === parentBarList)

        setState({ ...state, statusChild: 'disabled', statusTop: 'Enabled', topBar: JSON.parse(filterParent[0].top_navigation)[data], selectChildBar: data })
    }
    // const createParent = (data) => {
       
    //     setState({ ...state, selectParentBar: [data],type:'Parent'  ,statusChild: 'Enabled' })     
    //     NavigationObject.parent_bar =[data]    
    //     NavigationObject.child_bar = [...selectChildBar]
    //     NavigationObject.top_navigation = [...selectTopBar]
    //     NavigationObject.type = type
    //     // console.log(NavigationObject)
  
    // }
    // const createChild = (data) => {
    //     setState({ ...state, selectChildBar:[data],type:'Child'  , statusTop: 'Enabled' })
    //     NavigationObject.parent_bar = [...selectParentBar]
    //     NavigationObject.child_bar = [data]
    //     NavigationObject.top_navigation = [...selectTopBar]
    //     NavigationObject.type = 'Child'
    //     // console.log(NavigationObject)
  
    // }
    // const createTop= (data) => {
    //     setState({ ...state, selectTopBar:[data],type:'Top'  })
    //     NavigationObject.parent_bar = [...selectParentBar]
    //     NavigationObject.child_bar = [...selectChildBar]
    //     NavigationObject.top_navigation = [data]
      
    //     NavigationObject.type = 'Top'
    //     // console.log(NavigationObject)
  
    // }

    const insertData = (value, name, selectedObjectName, enableName)=> {
        let temp = {...tempNavigationObject}
        temp[name] = [value]
        setState({...state, tempNavigationObject: temp, selectedObjectName: [value], status: enableName})
    }


    // const createChildParentexists = (data) => {
       
    //     var filter = dataSource.filter(val => val.parent_bar === parentBarList)
    //     var childArray = [] = JSON.parse(filter[0].child_bar)
    //     childArray.push(data)
    //     NavigationObject.type = 'Child'
    //     NavigationObject.parent_bar = parentBarList
    //     NavigationObject.top_navigation = JSON.parse(filter[0].top_navigation)
    //     NavigationObject.child_bar = childArray
    //     // console.log(NavigationObject)
    
    // }
    // const createTopParentandNavexists = (data) => {
    //     var filter = dataSource.filter(val => val.parent_bar === parentBarList)
    //     var childArray = [] = JSON.parse(filter[0].child_bar)
    //     var topobject = JSON.parse(filter[0].top_navigation);

    //     topobject[selectChildBar].push(data)


    //     NavigationObject.type = 'Top'
    //     NavigationObject.parent_bar = parentBarList
    //     NavigationObject.child_bar = childArray
    //     NavigationObject.top_navigation = topobject
    //     // console.log(NavigationObject)
    // }
    const InsertSideNavandTop =()=>{
       
        // console.log('asdsdfzdf', tempNavigationObject)
        dispatch(insertSideNavandTop(tempNavigationObject)).then(data => {

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
                            <Select allowClear style={{ width: 300 }} onChange={(val) => { selectParent(val) }} >
                                {parentbar.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>

                                ))}

                            </Select>
                        </Col>
                        <Col span={8} >
                            <Select style={{ width: 300 }} onChange={(val) => { selectChild(val) }} >
                                {childBar.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>

                                ))}

                            </Select>
                        </Col>

                        <Col span={8} >
                            <Select style={{ width: 300 }} >
                                {topBar.map((val, i) => (
                                    <Option value={val} key={val}>{val}</Option>
                                ))}

                            </Select>
                        </Col>

                    </Row>
                    <Row style={{ marginTop: 20 }}>

                        <Col span={8} >
                            <Input onChange={(event) => { insertData(event.target.value, 'parent_bar', 'selectParentBar', 'parent') }} style={{ width: 300 }} placeholder="Parent name" />
                        </Col>

                        <Col span={8} >
                            <Input disabled={(selectParentBar[0].length<0) ? true : false} onChange={(event) => { insertData(event.target.value, 'child_bar', 'selectChildBar', 'child') }} style={{ width: 300 }} placeholder="Child name" />
                        </Col>

                        <Col span={8} >
                            <Input disabled={(selectChildBar[0].length < 0) ? true : false} onChange={(event) => { insertData(event.target.value, 'top_navigation', 'selectTopBar', 'top') }} style={{ width: 300 }} placeholder="Top bar" />
                        </Col>

                    </Row>
                    <Row style={{ marginTop: 20 }}>

                        <Col span={8} >
                             <Button size="large"  type="primary" onClick={InsertSideNavandTop} >Create</Button>
                        </Col>
                    </Row>
                </Cards>
            </Row>
        </>
        // </Spin>
    );
};

export default AddNavigationView;

