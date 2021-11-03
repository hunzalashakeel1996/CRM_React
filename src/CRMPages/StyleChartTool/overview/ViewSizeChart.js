import { Col, Row, Input, Spin, Select, Checkbox, Divider, List, Card, Popover, Notification, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { Cards } from '../../../components/cards/frame/cards-frame';
import { apiViewSizeChart, apiViewSizeChartUpdate, apiUpdateSizeChart } from '../../../redux/apis/DataAction';
import AddRowColumnModal from '../Modals/AddRowColumnModal';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const ViewSizeChart = (props) => {

    const dispatch = useDispatch();
    let vendornameState = useSelector(state => state.tickets.vendornames);

    const [state, setState] = useState({
        loader: false,
        title: '',
        vendor: '',
        description: '',
        numberOfRows: 0,
        numberOfColumns: 0,
        sizeChartValues: [],
        dataSource: [],
        sizeChartDetails: [],
        selectedId: '',
        isModalOpen: '',
        SelectedSizeChartDetails: {}
    });
    const { selectedId, sizeChartDetails, dataSource, description, vendor, loader, title, numberOfRows, numberOfColumns, sizeChartValues, isModalOpen, SelectedSizeChartDetails } = state;

    const onValueChange = (val, row, col) => {
        let tempSizeChartValues = [...sizeChartValues]
        tempSizeChartValues[row][col] = val.target.value
        setState({ ...state, sizeChartValues: [...tempSizeChartValues] })
    }

    const onViewSizeChart = () => {
        // if(title==''||vendor==''||description==''){
        //     Notification['error']({
        //         message: 'Please fill out required fields',
        //         description:
        //           '* marked fields are required',
        //       });
        // }else{

        let username = [];
        username = JSON.parse(localStorage.getItem('user'))
        setState({ ...state, loader: true })
        dispatch(apiViewSizeChart({ username: username.LoginName, values: sizeChartValues, title: title, description: description, vendorname: vendor })).then(data => {
            setState({ ...state, loader: false, dataSource: data })
            // Notification['success']({
            //     message: 'Size Chart insert successfully',
            // });
        })
        // }
    };

    const UpdateSize = (id) => {
        setState({ ...state, loader: true })

        dispatch(apiViewSizeChartUpdate({ id: id })).then(data => {
            let tempSizeChartValues = [...new Array(parseInt(data[2].filter(val => val === '@').length + 2))].map(e => new Array(data[0].length).fill(''))
            let tempSelectedSizeChartDetails = dataSource.filter(val => val.id == id)

            data.map((singleValue, index) => {
                if (index < 2)
                    tempSizeChartValues[index] = [...singleValue]
                else {
                    let descriptionArray = singleValue.join().split('@')
                    descriptionArray = descriptionArray.filter(Boolean)
                    descriptionArray.map(value => {
                        value = value.split(',').filter(Boolean)
                        tempSizeChartValues[index] = [...value]
                        index = index + 1
                    })

                }
            })
            console.log(tempSelectedSizeChartDetails[0])
            setState({
                ...state, loader: false,
                sizeChartDetails: data,
                selectedId: id,
                sizeChartValues: tempSizeChartValues,
                numberOfRows: data[2].filter(val => val === '@').length + 2,
                numberOfColumns: data[0].length,
                SelectedSizeChartDetails: tempSelectedSizeChartDetails[0]
            })

            // Notification['success']({
            //     message: 'Size Chart Update Successfully',
            // });
        })
        // }
    };

    const onUpdateSizeChart = () => {
        // if(title==''||vendor==''||description==''){
        //     Notification['error']({
        //         message: 'Please fill out required fields',
        //         description:
        //           '* marked fields are required',
        //       });
        // }else{
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))

        // validation check
        for (let i = 0; i < sizeChartValues.length; i++) {
            for (let j = 0; j < sizeChartValues[0].length; j++) {
                if (sizeChartValues[i][j] == '') {
                    Notification['error']({
                        message: 'Please fill out required fields',
                        description:
                            'All field in the size table should be filled',
                    });
                    return
                }
            }
        }

        setState({ ...state, loader: true })

        dispatch(apiUpdateSizeChart({ selectedId: selectedId, values: sizeChartValues, SelectedSizeChartDetails })).then(data => {
            setState({ ...state, loader: false, selectedId: '' })
            Notification['success']({
                message: 'Size Chart Updated Successfully',
            });
        })
        // }
    };

    const onDeleteRowColumn = (value, isRowDelete) => {
        let tempSizeChartValues = JSON.parse(JSON.stringify(sizeChartValues))
        let tempNumberOfRows = numberOfRows
        let tempNumberOfColumns = numberOfColumns

        if (isRowDelete) {
            tempSizeChartValues.splice(value, 1)
            tempNumberOfRows--
        }
        else {
            for (let i = 0; i < tempSizeChartValues.length; i++) {
                tempSizeChartValues[i].splice(value, 1)
            }
            tempNumberOfColumns--
        }
        setState({ ...state, sizeChartValues: JSON.parse(JSON.stringify(tempSizeChartValues)), numberOfRows: tempNumberOfRows, numberOfColumns: tempNumberOfColumns })
    }
    
    const onDisclaimerChange = (value, key) => {
        let temp = SelectedSizeChartDetails
        temp[key] = value
        setState({...state, SelectedSizeChartDetails: temp})
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <a onClick={() => { UpdateSize(text) }}>{text}</a>
        },

        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Vendorname',
            dataIndex: 'vendor_name',
            key: 'vendor_name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loader} >
                <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                    <Row gutter={20}>
                        {selectedId == '' ?
                            <>
                                <Col span={8}>
                                    <Input placeholder="* Title" onChange={(val) => { setState({ ...state, title: val.target.value }) }} />
                                </Col>

                                <Col span={8}>
                                    <Select showSearch placeholder='Vendor Name' allowClear onChange={(val) => { setState({ ...state, vendor: val }) }} style={{ width: '100%', marginBottom: 10 }}  >
                                        {vendornameState.map((val, i) => (
                                            <Option value={val} key={val}>{val}</Option>

                                        ))}

                                    </Select>
                                </Col>

                                <Col span={8}>
                                    <Input placeholder="* Description" onChange={(val) => { setState({ ...state, description: val.target.value }) }} />
                                </Col>
                            </>
                            :
                            <>
                                <Col span={4}>
                                    <p style={{ fontWeight: 'bold' }}>Title:</p>
                                    <p>{SelectedSizeChartDetails.title}</p>
                                </Col>
                                <Col span={4}>
                                    <p style={{ fontWeight: 'bold' }}>Vendor Name:</p>
                                    <p>{SelectedSizeChartDetails.vendor_name}</p>
                                </Col>
                                <Col span={4}>
                                    <p style={{ fontWeight: 'bold' }}>Description:</p>
                                    <p>{SelectedSizeChartDetails.description}</p>
                                </Col>
                            </>
                        }
                    </Row>
                    {selectedId &&
                        <Row gutter={20} style={{ marginTop: 20 }}>

                            <Col span={8}>
                                <Select showSearch defaultValue='' style={{ width: '100%' }} onChange={(val) => { onChangeRowColumn(val, true) }}>
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


                    }

                    <Row gutter={25} style={{ marginTop: 20 }}>
                        {selectedId == '' ? <Col xs={3}>
                            <Button size="large" type="primary" onClick={onViewSizeChart} > Search </Button>
                        </Col>
                            :
                            <Row>
                                <Col span={12}>
                                    <Button size="large" type="primary" onClick={onUpdateSizeChart} >
                                        Update Chart
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button size="large" type="primary" onClick={() => { setState({ ...state, selectedId: '' }) }} >
                                        Cancel Selection
                                    </Button>
                                </Col>
                            </Row>
                        }
                    </Row>
                </div>
                <Row style={{ marginTop: 20 }}>
                    <Col xs={24}>
                        <Cards headless>

                            {selectedId == '' ?
                                <div className="table-responsive">
                                    <Table size='large' pagination={true} dataSource={dataSource} columns={columns} onClick={(id) => { UpdateSize(id) }} />
                                </div>
                                :
                                <div>
                                    <Row gutter={20} style={{ marginTop: 20 }}>
                                        <Col span={8}>
                                            <Button size="large" type="primary" onClick={() => { setState({ ...state, isModalOpen: 'AddRowColumn' }) }} >
                                                Add Row/Column
                                            </Button>
                                        </Col>

                                    </Row>

                                    <Row style={{ marginTop: 20 }}>
                                        <Col style={{ overflow: 'auto' }}>
                                            <div style={{ maxWidth: 1920 }}>
                                                {numbers.map((number, indexRow) => (
                                                    numberOfRows >= indexRow + 1 &&
                                                    <Row gutter={20} style={{ flexWrap: 'nowrap', width: '100%', margin: 0 }}>
                                                        <a role="button" tabindex="0" disabled={[0, 1].includes(indexRow)} style={{ alignSelf: 'center', marginRight: 20, color: 'red' }} onClick={() => { onDeleteRowColumn(indexRow, true) }}>Delete</a>

                                                        {numbers.map((number, indexColumn) => (
                                                            (numberOfColumns >= indexColumn + 1) &&
                                                            <Col style={{ padding: 10, maxWidth: indexColumn === 0 ? 150 : 100, borderLeft: 'solid 1px grey', minWidth: indexColumn === 0 ? 150 : 100, borderRight: 'solid 1px grey', borderBottom: 'solid 1px grey', borderTop: 'solid 1px grey', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                                                                span={4}>
                                                                {(indexRow === 0 && indexColumn !== 0) &&
                                                                    <a style={{ alignSelf: 'center', textAlign: 'center', color: 'red', paddingBottom: 5 }} role="button" tabindex="0" onClick={() => { onDeleteRowColumn(indexColumn, false) }}>Delete</a>
                                                                }

                                                                {<Input
                                                                    disabled={[1, 0].includes(indexRow) && indexColumn == 0}
                                                                    style={{ maxHeight: 10, minHeight: 10, fontSize: 12, fontWeight: [0, 1].includes(indexRow) ? 'bold' : '' }}
                                                                    onChange={(val) => { onValueChange(val, indexRow, indexColumn) }}
                                                                    value={sizeChartValues[indexRow][indexColumn]}
                                                                />}
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: 20 }}>
                                        <Col span={7} style={{ marginRight: 10, marginBottom: 10 }}>
                                            <Input.TextArea value={SelectedSizeChartDetails.Disclaimer1} placeholder="Disclaimer 1" onChange={(val) => { onDisclaimerChange(val.target.value, 'Disclaimer1') }} />
                                        </Col>
                                        <Col span={7} style={{ marginRight: 10, marginBottom: 10 }}>
                                            <Input.TextArea value={SelectedSizeChartDetails.Disclaimer2} placeholder="Disclaimer 2" onChange={(val) => { onDisclaimerChange(val.target.value, 'Disclaimer2') }} />
                                        </Col>
                                        <Col span={7} style={{ marginRight: 10, marginBottom: 10 }}>
                                            <Input.TextArea  value={SelectedSizeChartDetails.Disclaimer3} placeholder="Disclaimer 3" onChange={(val) => { onDisclaimerChange(val.target.value, 'Disclaimer3') }} />
                                        </Col>
                                        <Col span={7} style={{ marginRight: 10, marginBottom: 10 }}>
                                            <Input.TextArea value={SelectedSizeChartDetails.Disclaimer4} placeholder="Disclaimer 4" onChange={(val) => { onDisclaimerChange(val.target.value, 'Disclaimer4') }} />
                                        </Col>
                                        <Col span={7} style={{ marginRight: 10, marginBottom: 10 }}>
                                            <Input.TextArea value={SelectedSizeChartDetails.Disclaimer5} placeholder="Disclaimer 5" onChange={(val) => { onDisclaimerChange(val.target.value, 'Disclaimer5') }} />
                                        </Col>
                                    </Row>
                                </div>
                            }

                        </Cards>
                    </Col>
                </Row>

                {isModalOpen === 'AddRowColumn' && <AddRowColumnModal
                    isModalOpen={isModalOpen}
                    loader={loader}
                    sizeChartValues={sizeChartValues}
                    sizeChartDetails={sizeChartDetails}
                    closeModal={() => { setState({ ...state, isModalOpen: '' }) }}
                    onAddRowColumn={(value, newRowsCount, newColsCount) => { setState({ ...state, sizeChartValues: JSON.parse(JSON.stringify(value)), numberOfRows: newRowsCount, numberOfColumns: newColsCount, isModalOpen: '' }) }}
                />}
            </Spin>
        </>
    );
};

export default ViewSizeChart;


