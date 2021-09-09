import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Switch ,Spin} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getAllUserRecord } from '../../redux/apis/DataAction';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;
const { TextArea } = Input;

const UsersView = (props) => {
  const [state, setState] = useState({
    selectionType: 'checkbox',
    dataSource: [],
    filterDataSource: [],
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
    isLoading : false
  });

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setState({ ...state, isLoading: true })
    let tempDataSource = [];
    // get balance sheet record
    dispatch(getAllUserRecord({})).then(data => {
      // // console.log('12310', data)

      data.map(value => {
        const { loginid, loginName, firstname, lastname, EmailAddress, Loginstatus } = value;
        return tempDataSource.push({
          loginid: <Link to={{ pathname: `/admin/userManagement/UserRights/${loginid}` , loginid: {loginid}}}>{loginid}</Link>,
          loginName: loginName,
          firstname: firstname,
          lastname: lastname,
          EmailAddress: EmailAddress,
          Loginstatus: Loginstatus
        });
      });

      setState({ ...state, dataSource: [...tempDataSource], filterDataSource: [...tempDataSource], isLoading: false });
    })
  }, []);



  const handleSearch = (searchText, objectName) => {
    setState({ ...state })

    // // console.log(state.dataSource);
    let temp = state.dataSource.filter(item => item[objectName].toUpperCase().includes(searchText.toUpperCase()))
    // // console.log(temp)

    setState({ ...state, filterDataSource: temp, });
  };
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: 'Mike',
  //     age: 32,
  //     address: '10 Downing Street',
  //   },
  //   {
  //     key: '2',
  //     name: 'John',
  //     age: 42,
  //     address: <Link to={{pathname:`/admin/userManagement/UserRights/${'123'}`}}><span style={{color: 'black'}} className="date-started">shsh</span></Link>,
  //   },
  // ];
  const columns = [
    {
      title: 'UserID',
      dataIndex: 'loginid',
      key: 'loginid',
    },
    {
      title: 'FullName',
      dataIndex: 'loginName',
      key: 'loginName',
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'EmailAddress',
      key: 'EmailAddress',
    },
    {
      title: 'Status',
      dataIndex: 'Loginstatus',
      key: 'Loginstatus',
    },

  ];
  return (
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoading} >

      <>
        <PageHeader
          title="Manage Users"
          buttons={[
            <div key="1" className="page-header-actions">
               <Button size="large"  size="small" type="primary" onClick={() => { history.push(`/admin/userManagement/addNewUsers`);}}>
                <FeatherIcon icon="plus" size={14} />
              Add New Users
            </Button>
            </div>,
          ]}
        />

        <Row style={{ marginLeft: 20, marginRight: 20 }}>
          <Cards title="Users List" caption="The simplest use of Drawer" >
            <Row gutter={25}>
              <Col md={8} xs={24} style={{marginBottom:20,}}>
                <div className="project-sort-search">
                  <AutoComplete onSearch={(e) => { handleSearch(e, 'loginName') }} placeholder="User Name" patterns />
                </div>
              </Col>
              <Col xs={24}>
                <Table className="table-responsive" pagination={true} dataSource={state.filterDataSource} columns={columns} />
              </Col>
            </Row>

          </Cards>
        </Row>



      </>
    </Spin>
  );
};

export default UsersView;
