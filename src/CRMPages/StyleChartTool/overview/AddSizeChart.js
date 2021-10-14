import { Col, Row, Input, Spin, Select, Checkbox, Divider, List, Card, Popover } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { Cards } from '../../../components/cards/frame/cards-frame';
import { apiAddSizeChart } from '../../../redux/apis/DataAction';

const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
const AddSizeChart = (props) => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        loader: true,
        title: '',
        vendor: '',
        description: '',
        numberOfRows: 0,
        numberOfColumns: 0,
        sizeChartValues: [],
        isShowChart: false
    });
    const {description,vendor, loader, title, styleCode, numberOfRows, numberOfColumns, sizeChartValues, isShowChart } = state;

    const onChangeRowColumn = (value, isRow) => {
        let tempSizeChartValues = [...sizeChartValues]
        if(isRow){
            tempSizeChartValues = [...new Array(parseInt(value))].map(e => new Array(numberOfColumns).fill(''));
            setState({...state, isShowChart: false, sizeChartValues: [...tempSizeChartValues], numberOfRows: parseInt(value)})
        }else{
            tempSizeChartValues = [...new Array(numberOfRows)].map(e => new Array(parseInt(value)).fill(''));
            setState({...state, isShowChart: false, sizeChartValues: [...tempSizeChartValues], numberOfColumns: parseInt(value)})
        }

    }

    const onValueChange = (val, row, col) => {
        console.log(val, row, col)
        let tempSizeChartValues = [...sizeChartValues]
        tempSizeChartValues[row][col] = val.target.value
        console.log('asdas', tempSizeChartValues)
    }

    const addSizeChart = () => {
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))
        // console.log('aaaaa')
        setState({ ...state, isLoader: true })
    
        dispatch(apiAddSizeChart({username:username.LoginName,values:sizeChartValues,title:title,description:description,vendorname:vendor})).then(data => {
            setState({ ...state, isLoader: false })
          // console.log('My Data: ', data)
        
          let tempDataSource = [];
          // console.log(data[0]);
        
        //   setstate({ ...state, dataSource: [...tempDataSource], isLoader: false });
    
    
    
    
        })
    
      };
    return (
        <>
            <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                <Row gutter={20}>
                    <Col span={8}>
                        <Input placeholder="Title" onChange={(val) => { setState({...state, title: val.target.value}) }} />
                    </Col>

                    <Col span={8}>
                        <Input placeholder="Vendor Name" onChange={(val) => { setState({...state, vendor: val.target.value}) }} />
                    </Col>

                    <Col span={8}>
                        <Input placeholder="Description" onChange={(val) => { setState({...state, description: val.target.value}) }} />
                    </Col>
                </Row>

                <Row gutter={20} style={{marginTop: 20}}>
                    
                    <Col span={8}>
                        <Select  showSearch defaultValue='' style={{ width: '100%' }} onChange={(val) => { onChangeRowColumn(val, true) }}>
                            <Option key=''>Number of Rows</Option>
                            {numbers.map((number) => (
                                <Option key={number}>{number}</Option>
                            ))}
                        </Select>
                    </Col>

                    <Col span={8}>
                        <Select showSearch defaultValue='' style={{ width: '100%' }} onChange={(val) => { onChangeRowColumn(val, false) }}>
                            <Option key=''>Number of Columns</Option>
                            {numbers.map((number) => (
                                <Option key={number}>{number}</Option>
                            ))}
                        </Select>
                    </Col>

                    <Col span={8}></Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                    <Button size="large" type="primary" onClick={() => {setState({...state, isShowChart: true})}}>
                        Create Chart
                    </Button>
                </Row>


                {isShowChart && <Row style={{  marginTop: 20 }}>
                    <Col style={{ overflow: 'auto' }}>
                        <div style={{ maxWidth: 1920, borderLeft: 'solid 1px grey' }}>
                            {numbers.map((number, indexRow) => (
                                numberOfRows >= indexRow + 1 &&
                                <Row gutter={20} style={{ flexWrap: 'nowrap', width: '100%', margin: 0}}>
                                    {numbers.map((number, indexColumn) => (
                                        (numberOfColumns >= indexColumn + 1 ) &&
                                        <Col style={{ padding: 10, maxWidth: indexColumn===0?150:100, minWidth: indexColumn===0?150:100, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey', borderTop: 'solid 1px grey' }} span={4}>
                                            {<Input style={{maxHeight: 10, minHeight: 10, fontSize: 12, fontWeight:indexRow===0?'bold':'' }}  onChange={(val) => { onValueChange(val, indexRow, indexColumn) }} />}
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </div>
                    </Col>
                </Row>}

                <Button size="large" type="primary" onClick={addSizeChart} style={{ marginRight: 10, }} > Add Size</Button>
            </div>
        </>
    );
};

export default AddSizeChart;




// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>
// <Row gutter={20} style={{flexWrap: 'nowrap'}}>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}></Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col><Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// <Col style={{ padding: 10, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey' }} span={4}>
//     <Input placeholder="Color Code" onChange={(val) => { console.log('val') }} />
// </Col>
// </Row>