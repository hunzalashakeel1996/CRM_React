import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Table, Upload, Row, Col, DatePicker, Checkbox, Image ,notification} from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../components/utilities/utilities'
import { useDispatch, useSelector } from 'react-redux';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { inTransitsTrackingInsert,inTransitsTrackingData } from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

let sellerList=[]
const ShippingReportsView = (props) => {


    const [state, setState] = useState({
        selectionType: 'checkbox',
        selectedRowKeys: null,
        selectedRows: null,
        date: null,
        dateString: null,
        checkData: [],
        checked: null,
        values: {},
        states:[],
        file:'',
        marketplace:[],
        startDate:'',
        endDate:'',
    });
   
    const sellerName=['Amazon','Walmart','sears','Ebay','NewEgg','PU','JLC']
    const dispatch = useDispatch()
    const {states,file,marketplace,startDate,endDate}=state
    const multipleChange = childData => {
        setState({ ...state, checkData: childData });
    };
    const onChange = (date, dateString) => {
        setState({ ...state, date, dateString });

    };
    const onChangeTextArea = (event) => {
        console.log(event.target.value)
        setState({ ...state, states: event.target.value });

    };
    const changeHandler = (event) => {

        setState({ ...state, file: event.target.files[0] })

    };
    const insertTransitsSheet = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        const formData = new FormData();

        formData.append('user', username.LoginName);
        formData.append('File', file);
        dispatch(inTransitsTrackingInsert(formData)).then(data => {

            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            location.reload();
        })
    };
    let username = [];
  const onListCheckChange = (val, i, isChecked) => {
   // console.log(isChecked)
  
     if(isChecked){
         console.log('if',val)
       sellerList.push(
        val   
       
       )
     }
     else{
       
       let index = sellerList.indexOf(val)
       sellerList.splice(index, 1)
 
     }
  
     setState({ ...state, marketplace: sellerList });
     
    }
    const onChangeStartDate =(value)=>{
        console.log(value.format('MM/DD/YYYY'))
        setState({ ...state, startDate: value });
    }
    const onChangeEndDate =(value)=>{
        console.log(value.format('MM/DD/YYYY'))
        setState({ ...state, endDate: value.format('MM/DD/YYYY')});
    }
    const insertTransitsData = () => {
     

  
        dispatch(inTransitsTrackingData({state:states,orderdatefrom:startDate,orderdateto:endDate,marketplace:marketplace})).then(data => {
            downloadFile(data)
            //   message.success(`file uploaded Update ${data}`);
            notification.success({
                message: `Successfull  ${data}`,
                description: `Successfully Report`,
                onClose: close,
            });
            location.reload();
        })
    };
    return (
        <>
            <Row style={{  }}>
                <Cards title="InTransit Tracking Report" caption="The simplest use of Drawer" >
                <Col span={24}  >
               <Row gutter={50}>
                 
               {sellerName.map((val, i) => (
                     <Col span={5} style={{ marginLeft: 10, marginTop: 10  }}>
                   {/* <Cards headless > */}
                    <Checkbox onChange={(e) => {onListCheckChange(val,i, e.target.checked)}}>
              
                 {val}
               
                 {/* <img src={`/img/icons/${val}.png`} width="70" height="70" style={{marginLeft:10}}/>  */}
              
                </Checkbox>
                {/* </Cards> */}
                </Col>
                    ))}
                   
                   </Row>
                    <Row gutter={25} style={{marginTop:20}}>
                        <Col Span={8} >
                            
                                <DatePicker placeholder="StartDate" onChange={(date) => { onChangeStartDate(date) }} />
                           
                        </Col>
                        <Col span={8}  >
                           
                                <DatePicker placeholder="EndDate"  onChange={(date) => { onChangeEndDate(date) }} />
                            
                        </Col>
                        <Col span={8}>
                            
                            <TextArea placeholder="State input here" className="custom" value={states} onChange={onChangeTextArea} style={{ height: 50 }} />
                           
                        </Col>


                        
                            
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col span={6}>
                        <Button type="success" onClick={insertTransitsData}> Report Data</Button>
                        </Col>
                    </Row>
                    </Col>
                </Cards>
                
            </Row>
            {/* MARKETPLACE CHECKBOXES  */}
            <Row style={{  }}>
                <Cards title="Marketplaces" caption="The simplest use of Drawer" >
                    <Row gutter={25}>
                        
                        <Col lg={6} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                      
                                <input type="file" style={{ marginTop: 20 }} onChange={changeHandler} />

                            </div>
                        </Col>
                        <Col lg={6} xs={24}  >
                            {/* <div className="atbd-drawer" style={{ marginLeft: 20 }}><h3>Step 1</h3></div> */}
                            <div className="atbd-drawer" style={{ marginLeft: 20 }}>
                           
                                <Button size="large"  onClick={insertTransitsSheet}> <img
                                    style={{ width: 80, height: 80, marginTop: 30 }}
                                    src="/img/icons/upload_icon.png"
                                /></Button>


                            </div>
                        </Col>



                    </Row>
                    {/* MARKETPLACE CHECKBOXES  */}

                </Cards>
            </Row>




        </>
    );
};

export default ShippingReportsView;
