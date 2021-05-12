import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Switch, Checkbox, Collapse ,Spin} from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { getNavigation ,saveAllUserRights } from '../../redux/apis/DataAction';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;

const UsersView = (props) => {
  const [state, setState] = useState({
    sidebars: [],
    checked: null,
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    key: 0,
    sidebarRights: [],
    parentBarRight:[],
    subparentRights : {},
    subChildRights: {},
    isLoading : false,
   
  });

  const dispatch = useDispatch();
  useEffect(() => {
    setState({ ...state, isLoading: true })
    // get balance sheet record
    dispatch(getNavigation({})).then(data => {
      // console.log('aaaa  ', JSON.parse(`${data[0].child_bar}`))
      // data[0].child_bar = data[0].child_bar.replace('\\', '')
      // console.log('aasa', data)
      // console.log('ccc', data[0].top_navigation)
      // console.log('bbb', JSON.parse(data[0].child_bar))
      setState({ ...state, isLoading: false, sidebars: data });
    })
  }, []);


  const callback = key => {
    setState({ ...state, key });
  };


  const saveUserRights = () => {
    console.log('submitting');
    // setState({ ...state, isLoading : true})

    dispatch(saveAllUserRights(
      {userid : JSON.parse(localStorage.getItem('user')).LoginID,
      username : JSON.parse(localStorage.getItem('user')).LoginName,
       topNav : state.subChildRights,
        childNav : state.subparentRights })).then( data => {

      console.log(data);
      setState({...state, isLoading: false})

    })

  } 

  // console.log([...state.sidebarRights])
  const onAddSidebarRight = (sidebarOption,parentBar, topNavigationName  ) => {
    // console.log('aaa', topNavigationName)
    let temp = [...state.sidebarRights]
    console.log(temp);
    let subChildRightsTemp = {...state.subChildRights}

    let subParentRightsTemp = {...state.subparentRights}
    // console.log('89', subParentRightsTemp);

    if (temp.includes(sidebarOption)) {
      // remove this sidebar option from array
      let index = temp.indexOf(sidebarOption)
      temp.splice(index, 1);
      delete subChildRightsTemp[sidebarOption]
      let index2 = subParentRightsTemp[parentBar].indexOf(sidebarOption)
      subParentRightsTemp[parentBar].splice(index2,1)
      if(subParentRightsTemp !==undefined && subParentRightsTemp[parentBar].length===0){
       console.log('coming')
       delete subParentRightsTemp[parentBar]
     }
   
    } else {
      // console.log('else');
      // insert this sidebat option from array   
      temp.push(sidebarOption)
      subChildRightsTemp[sidebarOption] = [];
      subChildRightsTemp[sidebarOption].push(topNavigationName);
    
      subParentRightsTemp = {...subParentRightsTemp, 
        [parentBar]: subParentRightsTemp.hasOwnProperty(parentBar) ? [...subParentRightsTemp[parentBar],
         sidebarOption]: [sidebarOption]}
    
    }
      
    console.log('right ', subParentRightsTemp)
    setState({ ...state, sidebarRights: temp, subChildRights: subChildRightsTemp , subparentRights : subParentRightsTemp  })
    // console.log(state.subparentRights);
  };

  const onAddTopNavigationRight = (parentName, topNavigationName) => {
    // console.log(parentName,topNavigationName )
    let temp = { ...state.subChildRights }


    if (state.subChildRights[parentName].includes(topNavigationName)) {
      // console.log(state.subChildRights);
      let index = temp[parentName].indexOf(topNavigationName)
      temp[parentName].splice(index, 1);

      // if(temp[parentName].length ===0)
      // {
      //   console.log('coming IN CHILD');
      //   delete temp[parentName]
      // }
    } else {
      temp[parentName].push(topNavigationName);
    }
    setState({ ...state, subChildRights: temp })
    console.log(state.subChildRights)
  }



  return (
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >

    <>
      <PageHeader
        title="Manage Users"
        buttons={[
          <div key="1" className="page-header-actions">

            <Button size="small" type="primary" onClick={() => { saveUserRights()} }>
              <FeatherIcon size={14} />
             Save User
            </Button>
          </div>,
        ]}
      />

      <Row style={{ marginLeft: 20, marginRight: 20 }}>
        <Cards title="User Rights" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col xs={24}>
              <Collapse defaultActiveKey={['0']} onChange={callback}>
                {state.sidebars.map((sidebar, index) => (

                  <Panel header={sidebar.parent_bar} key={index}>
                    <Row>
                      {/* {console.log(JSON.parse(sidebar.child_bar))} */}
                      {/* {console.log(JSON.parse(sidebar.top_navigation))} */}
                      {JSON.parse(sidebar.child_bar).map(singleChildBar => 
                        (<Col xs={12}>
                        <Checkbox id={singleChildBar} onChange={() => { onAddSidebarRight(singleChildBar,sidebar.parent_bar, JSON.parse(sidebar.top_navigation)[`${singleChildBar}`][0]) }}>{singleChildBar}</Checkbox>
                        {/* {console.log(state.sidebarRights.includes(singleChildBar) )} */}
                        {state.sidebarRights.includes(singleChildBar) &&
                          <Row style={{marginLeft: 20}}>
                              {JSON.parse(sidebar.top_navigation)[`${singleChildBar}`].map((topNavigations, index) => (
                            
                                <Checkbox style={{marginLeft:10}}  defaultChecked={index === 0}  id={topNavigations} onChange={() => { onAddTopNavigationRight(singleChildBar, topNavigations) }}>{topNavigations}</Checkbox>
                              ))
                              }
                            
                          </Row>
                       } 
                      </Col>))}

                    </Row>

                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>

        </Cards>
      </Row>
    </>
    </Spin>
  );
};

export default UsersView;


// {/* <Collapse defaultActiveKey={['1']} onChange={callback}>
//   {/* ORDERS  */}
//   <Panel header="Orders" key="1">
//     <Row>

//       <Col xs={8}>
//         <Checkbox id="OrderReports" onChange={() => { onAddSidebarRight('OrderReports') }}>OrderReports</Checkbox>
        // {state.sidebarRights.includes('OrderReports') &&
        //   <Row>
        //     <Col>
        //       <Checkbox checked={state.subChildRights['OrderReports'].includes('Testbox')} onChange={() => { onAddTopNavigationRight('OrderReports', 'Testbox') }}>TestBox</Checkbox>
        //       <Checkbox >TestBox</Checkbox>
        //       <Checkbox >TestBox</Checkbox>
        //       <Checkbox >TestBox</Checkbox>
        //       <Checkbox >TestBox</Checkbox>
        //       <Checkbox >TestBox</Checkbox>
        //     </Col>
        //   </Row>
        // }


//       </Col>
//       <Col xs={8}>
//         <Checkbox id="Marketplace Orders" onChange={() => { onAddSidebarRight('Marketplace Orders') }}>Marketplace Orders</Checkbox>

//         {state.sidebarRights.includes('Marketplace Orders') &&
//           <Row>
//             <Col>
//               <Checkbox >TestBox</Checkbox>
//               <Checkbox >TestBox</Checkbox>
//               <Checkbox >TestBox</Checkbox>
//               <Checkbox >TestBox</Checkbox>
//               <Checkbox >TestBox</Checkbox>
//               <Checkbox >TestBox</Checkbox>
//             </Col>
//           </Row>
//         }


//       </Col>
//     </Row>


//   </Panel>
// </Collapse> */}


  // console.log('aaasss', subParentRightsTemp)
    //  if(subParentRightsTemp[parentBar]&& subParentRightsTemp[parentBar].includes(sidebarOption))
    //  {
    //   //  let index2 = subParentRightsTemp[parentBar].indexOf(sidebarOption)
    //   //  subParentRightsTemp[parentBar].splice(index2,1)
    //   //  console.log(subParentRightsTemp[parentBar]);
    //   //  if(subParentRightsTemp[parentBar] == null)
    //   //  {
    //   //    console.log('coming')
    //   //   delete subParentRightsTemp[parentBar]
    //   //  }
    //  }
    //  else{