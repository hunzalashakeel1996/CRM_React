import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, Spin, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getPolyBags } from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;
const { TextArea } = Input;

const PolyBagsAndThermalLabelsView = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setstate({ ...state, loader: true })
  }, []);

  dispatch(getPolyBags("")).then(data => {
    setstate({ ...state, isLoader: false })
    console.log('My Data: ', data)
    // downloadFile(data);
    // notification.success({
    //   message: 'Successfull Dowload',
    //   description: `Successfully Download PONetAmount With ${state.POType} Breakup From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
    //   onClose: close,
    // });
  })
  
    const [state, setstate] = useState({
      selectionType: 'checkbox',
      selectedRowKeys: null,
      selectedRows: null,
      date: null,
      dateString: null,
      checkData: [],
      checked: null,
      POType: null,
      values: {},
      isLoader: false,
    });


    const getPolyBagsReporting = () => {

      setstate({ ...state, isLoader: true })
      // dispatch(getPolyBags("")).then(data => {
      //   setstate({ ...state, isLoader: false })
      //   console.log('My Data: ', data)
      //   // downloadFile(data);
      //   // notification.success({
      //   //   message: 'Successfull Dowload',
      //   //   description: `Successfully Download PONetAmount With ${state.POType} Breakup From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
      //   //   onClose: close,
      //   // });
      // })

    };
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
        title: 'Date',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Shipped Items',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Remaining Small',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Remaining Large',
        dataIndex: 'address',
        key: 'address',
      },

    ];
    return (
      <>
        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
          <Row style={{}}>
            <Cards title="Endica Shiping Label" caption="The simplest use of Drawer" >
              <Row gutter={25}>
                <Col lg={8} xs={24}  >
                  <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Small</h3></div>
                  <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                    <Input />

                  </div>
                </Col>
                <Col lg={8} xs={24}>
                  <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Large</h3></div>
                  <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                    <Input />

                  </div>
                </Col>
                <Col lg={8} xs={24}>
                  <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Update</h3></div>
                  <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                    <Button size="default" type="success" htmlType="Update">
                      Update
                        </Button>
                    {/* </Cards> */}
                  </div>
                </Col>

              </Row>
            </Cards>
          </Row>
          {/* Summary Div  */}
          <Row style={{}}>
            <Cards title="Summary" caption="The simplest use of Drawer" >
              <Row style={{ marginTop: 20 }}>

                <Col xs={24}>
                  <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                </Col>

              </Row>
            </Cards>
          </Row>

        </Spin>

      </>
    );
  };

  export default PolyBagsAndThermalLabelsView;
