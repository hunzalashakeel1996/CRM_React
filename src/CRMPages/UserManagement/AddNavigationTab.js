import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Select, Tabs, Table, Upload, Row, Col, Switch, Checkbox, Collapse, Spin } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { getSideAndTopNavBar} from '../../redux/apis/DataAction';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const AddNavigationView = (props) => {
    const dispatch=useDispatch();
    let parent =[];
        let child =[];
        let top =[];
        let temp=[];
    const [state,setState] = useState({
        topBar:[],
        childBar:[],
        parentbar:[],
        childBarList:[],
        dataSource:[],
        name:'Aqib'
    })
    const {parentbar,childBar,topBar,dataSource,childBarList}=state
    useEffect (()=>{
      
        dispatch(getSideAndTopNavBar()).then(data => {
        console.log(data)
            setState({...state,dataSource:data})
            // console.log(JSON.parse(data.top_navigation))
            //JSON.stringify(data)
            data.map(value=>{

                const { parent_bar, child_bar, top_navigation} = value;
                parent.push(
                  parent_bar  
                //   Parent: <span style={{ color: 'black' }} className="date-started">{parent_bar}</span>,
                )
            
                // JSON.parse(child_bar).map(child=>{
                //     //  console.log('child',value)
                //     temp.push({
                //      //   Parent: <span style={{ color: 'black' }} className="date-started">{value}</span>,
                //      parent_bar: <span style={{ color: 'black' }} className="date-started">{child}</span>,
                //         // 'childBar':child
                //     })
           
                //     JSON.parse(top_navigation)[child].map(top=>{
                //         //  console.log('child',value)
                //         temp.push({
                //         //     'topBar':top
                //      //   Parent: <span style={{ color: 'black' }} className="date-started">{value}</span>,
                //     //    Child: <span style={{ color: 'black' }} className="date-started">{child}</span>,
                //     child: <span style={{ color: 'black' }} className="date-started">{top}</span>,
                //         })
                            
                //     })   
                // })   

              
                // console.log('child',child)
            })     

            // console.log(temp.da)   
           setState({...state,parentbar:parent})
        })
      
        
    },[]);

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
    const selectParent =(data)=>{

        console.log('selectParent',data)
        setState({...state,childBarList:data})

        console.log([...dataSource])
        
            dataSource.filter(val=>val.child_bar===data).map(value=>{
                console.log(val.child_bar)
                child.push(value)
            })
            console.log(child)
            setState({...state,childBar:child})
                  }
  return (
    // <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >

      <>
        <PageHeader  title="Add navigation"  />
        <Row>
                <Cards title="Add navigation"  >
                     <Row style={{ marginTop: 20 }}>

                       <Col span={8} >
                          <Select   allowClear style={{ width: 300 }}   onChange={(val) => { selectParent( val) }} >
                                    {parentbar.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>

                                    ))}

                                </Select>
                         

                    </Col>

                    
                    <Col span={8} >
                          <Select   allowClear style={{ width: 300 }}   onChange={(val) => { selectchildBar( val) }} >
                                    {childBar.map((val, i) => (
                                        <Option value={val} key={val}>{val}</Option>

                                    ))}

                                </Select>
                         

                    </Col>

                    </Row>
                </Cards>
            </Row>
      </>
    // </Spin>
  );
};

export default AddNavigationView;

