import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Col, Table, Upload, Row, DatePicker,Spin,notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, DatePickerWrapper } from '../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {getRMAMonthlyreporting} from '../../redux/apis/DataAction';
import {downloadFile} from '../../components/utilities/utilities'


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const { TabPane } = Tabs;
const { TextArea } = Input;

const RMAView = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setstate({ ...state, loader: true })   
  }, []);
  const [state, setstate] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    date: null,
    dateString: null,
    values: {},
    isLoader: false,
  });
  const onChange = (date, dateString) => {
    setstate({ ...state, date, dateString });
    console.log(date);
    console.log(dateString);
  };


  const getRmaMonthlyReport = () =>
  {
    setstate({ ...state, isLoader: true })
     dispatch(getRMAMonthlyreporting({ orderdatefrom:state.dateString[0],orderdateto:state.dateString[1],})).then(data => {
      setstate({ ...state, isLoader: false })
     console.log('My Data: ', data)
      downloadFile(data);
      notification.success({
        message: 'Successfull Dowload',
        description: `Successfully Download RMA Monthly Report`,
        onClose: close,
    });
      })
  }
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  const columns = [
    {
      title: 'Order NO',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'PO number',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Tracking NO',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      key: 'address',
    },

  ];
  return (
    <>
 <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >

      <Row style={{}}>
        <Cards title="Delivery Tracking Status Report" caption="The simplest use of Drawer" >
          <Row gutter={25}>
            <Col lg={24} xs={24}  >
              {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
              <div className="atbd-drawer" style={{ marginLeft: 0 , }}>

                <RangePicker onChange={onChange} />

                <br/>

                <Button onClick={getRmaMonthlyReport} size="default" type="success" htmlType="download" style={{ marginLeft: 0, marginTop:8, }}>
                  Download
                </Button>
              </div>
            </Col>
          </Row>
        </Cards>
      </Row>
      </Spin>
    </>
  );
};

export default RMAView;
