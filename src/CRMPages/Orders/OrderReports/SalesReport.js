import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image,notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { getSalesReport } from '../../../redux/apis/DataAction';
import { downloadFile } from '../../../components/utilities/utilities'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


const OrderReportsView = (props) => {

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
        checkData: [],
        checked: null,
        values: {},
    });
    

    const onChange = (date, dateString) => {
        // console.log('aaa', date, dateString)
        setstate({ ...state, [dateString]: date });
        console.log(dateString);
    };

    
  
  const getSalesReporting = () => {

    //    console.log('bbb', state.startDate.format('MM/DD/YYYY'))
    //  console.log('bbb', state.endDate.format('MM/DD/YYYY'))
    dispatch(getSalesReport({ orderdatefrom: state.startDate.format('MM/DD/YYYY'), orderdateto: state.endDate.format('MM/DD/YYYY'), })).then(data => {
        console.log('My Data: ', data)
        downloadFile(data);
        notification.success({
            message: 'Successfull Dowload',
            description: `Successfully Download Sales Report From ${state.startDate.format('MM/DD/YYYY')} to ${state.endDate.format('MM/DD/YYYY')}`,
            onClose: close,
        });
    })

};
    
    
    return (
        <>
            <Row style={{  }}>
                <Cards title="Sales Report" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>StartDate</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <DatePicker onChange={(date) => { onChange(date, 'startDate') }}/>
                            </div>
                        </Col>
                        <Col lg={8} xs={24}  >
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>EndDate</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <DatePicker onChange={(date) => { onChange(date, 'endDate') }} />
                            </div>
                        </Col>
                        <Col lg={8} xs={24}  >
                        <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Download</h3></div>
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                                <Button onClick={getSalesReporting} size="default" type="success" htmlType="Submit">
                                Download
                        </Button>

                            </div>
                        </Col>



                    </Row>


                </Cards>
            </Row>
            




        </>
    );
};

export default OrderReportsView;
