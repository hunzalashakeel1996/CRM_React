import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Switch, Checkbox, Collapse, Spin } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { getNavigation, saveAllUserRights, getUserRights } from '../../redux/apis/DataAction';
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
    userrightJson: [],  // database parent json
    checked: null,
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    key: 0,
    sidebarRights: [],
    parentBarRight: [],
    subChildRights: {},
    isLoading: false,
    id: 0

  });

  const dispatch = useDispatch();
  useEffect(() => {
    var id = props.location.pathname.split('/')
    id = id[id.length - 1]
    console.log('aaaa', id)
    setState({ ...state, isLoading: true, id: id })
    // get balance sheet record
    Promise.all([dispatch(getNavigation({})), dispatch(getUserRights({ userid: id }))]).then(data => {

      let databaseJson = JSON.parse(data[1][0].top_navigation)
      console.log(databaseJson);
      let JsonMap = Object.values(databaseJson)
      let objectToArray = []

      JsonMap.map(value => {
        objectToArray = [...objectToArray, ...value]
      })
      setState({ ...state, isLoading: false, sidebars: data[0], userrightJson: JSON.parse(data[1][0].top_navigation), sidebarRights: objectToArray, subChildRights: JSON.parse(data[1][0].child_bar) });
      // console.log('Mapp', objectToArray);
    })

    // dispatch(getNavigation({})).then(data => {
    //   // console.log('aaaa  ', JSON.parse(`${data[0].child_bar}`))
    //   // data[0].child_bar = data[0].child_bar.replace('\\', '')
    //   // console.log('aasa', data)
    //   // console.log('ccc', data[0].top_navigation)
    //   // console.log('bbb', JSON.parse(data[0].child_bar))
    //   setState({ ...state, isLoading: false, sidebars: data });
    // })
  }, []);


  const callback = key => {
    setState({ ...state, key });
  };


  const saveUserRights = () => {
    console.log('submitting');
    // setState({ ...state, isLoading : true})
    console.log('subChildRights',state.subChildRights)
    console.log('userrightJson',state.userrightJson)
    var id = props.location.pathname.split('/')
    id = id[id.length - 1]
    console.log('aaaa', id)

    dispatch(saveAllUserRights(
      {
        userid: id,
        username: '',
        childNav: state.subChildRights,
        topNav: state.userrightJson
      })).then(data => {

        // console.log(data);
        setState({ ...state, isLoading: false })

      })

  }

  // console.log([...state.sidebarRights])
  const onAddSidebarRight = (sidebarOption, parentBar, topNavigationName) => {
    // console.log('aaa', parentBar)

    // let temp = [...state.sidebarRights]

    let sideBarRightsTemp = { ...state.userrightJson }

    let subChildRightsTemp = { ...state.subChildRights };


    // console.log('b',parentBar);
    // console.log('c', sideBarRightsTemp[parentBar]);
    if (sideBarRightsTemp[parentBar] === undefined) {
      // parent not found
      sideBarRightsTemp = { ...sideBarRightsTemp, [parentBar]: [sidebarOption] }


      subChildRightsTemp = { ...subChildRightsTemp, [sidebarOption]: topNavigationName !== undefined ? [topNavigationName] : [null] }
      // console.log('if');
      // console.log('if child', subChildRightsTemp);
    }
    else if (sideBarRightsTemp[parentBar].includes(sidebarOption)) {
      // parent and child both included so remove it from array
      let index = sideBarRightsTemp[parentBar].indexOf(sidebarOption)
      // console.log(index);
      sideBarRightsTemp[parentBar].splice(index, 1);
      // delete key if arrray length become 0 
      if (sideBarRightsTemp[parentBar].length === 0) {
        delete sideBarRightsTemp[parentBar];
        delete subChildRightsTemp[sidebarOption];
      }
      // console.log('else if', sideBarRightsTemp);

    }
    else {
      // parent found but child is not found so push that child
      sideBarRightsTemp[parentBar].push(sidebarOption)

      subChildRightsTemp = { ...subChildRightsTemp, [sidebarOption]: topNavigationName !== undefined ? [topNavigationName] : [null] }

      console.log({ ...subChildRightsTemp, [sidebarOption]: [topNavigationName] });

    }
    console.log('sideBarRightsTemp', sideBarRightsTemp);
    console.log('subChildRightsTemp', subChildRightsTemp);

    setState({ ...state, userrightJson: sideBarRightsTemp, subChildRights: subChildRightsTemp })
  }




  const onAddTopNavigationRight = (parentName, topNavigationName) => {
    let temp = { ...state.subChildRights }

    if (temp[parentName] == undefined) {
      temp = { ...temp, [parentName]: [topNavigationName] }

    }
    else if (state.subChildRights[parentName].includes(topNavigationName)) {
      // console.log(state.subChildRights);
      let index = temp[parentName].indexOf(topNavigationName)
      temp[parentName].splice(index, 1);
      if (temp[parentName].length === 0) {
        delete temp[parentName]
      }
    } else {
      temp[parentName].push(topNavigationName);
    }
    setState({ ...state, subChildRights: { ...temp } })
    console.log(temp)
  }



  return (
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >

      <>
        <PageHeader
          title="Manage Users"
          buttons={[
            <div key="1" className="page-header-actions">

              <Button size="small" type="primary" onClick={() => { saveUserRights() }}>
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
                        {/* {console.log('aasdasdas', state.userrightJson)} */}
                        {JSON.parse(sidebar.child_bar).map((singleChildBar, index2) =>
                        (<Col xs={12}>
                          {/* {console.log('vfvd', Object.value(state.userrightJson).includes(singleChildBar))} */}
                          <Checkbox id={singleChildBar} checked={state.userrightJson[sidebar.parent_bar]?.includes(singleChildBar)} onChange={() => { onAddSidebarRight(singleChildBar, sidebar.parent_bar, JSON.parse(sidebar.top_navigation)[`${singleChildBar}`][0]) }}>{singleChildBar}</Checkbox>


                          {(state.userrightJson[sidebar.parent_bar]?.includes(singleChildBar)) &&

                            <Row style={{ marginLeft: 20 }}>

                              {JSON.parse(sidebar.top_navigation)[`${singleChildBar}`].map((topNavigations, index) => (

                                <Checkbox style={{ marginLeft: 10 }} checked={state.subChildRights[singleChildBar] && state.subChildRights[singleChildBar].includes(topNavigations)} id={topNavigations} onChange={() => { onAddTopNavigationRight(singleChildBar, topNavigations) }}>{topNavigations}</Checkbox>


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