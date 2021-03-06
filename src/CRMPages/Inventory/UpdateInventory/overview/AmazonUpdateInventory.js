import { Table, Input, Popconfirm, Form, Col, Row, Select, Spin, Radio, Checkbox, Divider, Modal } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../components/autoComplete/autoComplete';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../../components/utilities/utilities'
import { Button } from '../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { webURL, audioPlay, uploadUrl, getFetchUpdateInventoryapi, getUpdateInventoryapi, getUpdateInventoryDownloadapi } from '../../../../redux/apis/DataAction';

const { TextArea } = Input;
const EditableContext = React.createContext(null);

const AmazonUpdateInventory = () => {
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false);

    const [statelive, setstatelive] = useState(
        {
            merchantskus: [],
            merchantskusResult: [],
            loaderState: false,
            dataSource: [],
            textAreaStatus: 'disabled',
            buttonStatus: true,
            reasonText:''
        }
    );

    const {reasonText,buttonStatus, textAreaStatus,merchantskus, merchantskusResult, loaderState, dataSource } = statelive
    const onChange = (event) => {
        // console.log(event.target.value)
        setstatelive({ ...statelive, merchantskus: event.target.value });

    };
    const getMerchantskuDetail = () => {

        setstatelive({ ...statelive, loaderState: true });

        dispatch(getFetchUpdateInventoryapi({ ms: merchantskus })).then(data => {
            setstatelive({ ...statelive, dataSource: data, merchantskusResult: data, loaderState: false });
            // console.log(data)
            //  merchantskustable(data)
        })

    }
    const MerchantskuDownload = () => {
    
        setstatelive({ ...statelive, loaderState: true });

        dispatch(getUpdateInventoryDownloadapi({ ms: merchantskus })).then(data => {
            setstatelive({ ...statelive, loaderState: false });
            
         //   downloadFile(data)
        })

    }


    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                // console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                        width: 150,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                   
                    style={{  width: 150,
                        margin: 0,
                        border: '2px solid rgba(140, 148, 255, 1)',
                        textAlign: 'center'
                     
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const EditableTable = () => { }


    const columns = [
        {
            title: 'MerchantSku',
            dataIndex: 'merchantsku',
            key: 'merchantsku',
        },
        {
            title: 'ColorName',
            dataIndex: 'colorname',
            key: 'colorname',
        },
        {
            title: 'Cost',
            dataIndex: 'Cost',
            key: 'Cost',
        },
        {
            title: 'PUPrice',
            dataIndex: 'PU_price',
            key: 'PU_price',
            editable: true,
        },
        {
            title: 'PUStatus',
            dataIndex: 'pustatus',
            key: 'pustatus',
            editable: true,
        },
        {
            title: 'MAPPrice',
            dataIndex: 'MAPprice',
            key: 'MAPprice',
            editable: true,
        },
        {
            title: 'AmazonPrice',
            dataIndex: 'amazonprice',
            key: 'amazonprice',
            editable: true,
        },
        {
            title: 'StyleStatus',
            dataIndex: 'stylestatus',
            key: 'stylestatus',
            editable: true,
        }
        ,
        {
            title: 'VendorQty',
            dataIndex: 'vendorqty',
            key: 'vendorqty',
            editable: true,
        },
        {
            title: 'UPC',
            dataIndex: 'UPC',
            key: 'UPC',
            editable: true,
        },
        {
            title: 'ASINS',
            dataIndex: 'ASINS',
            key: 'ASINS',
            editable: true,
        },
        {
            title: 'RIZNOASINS',
            dataIndex: 'RIZNOASINS',
            key: 'RIZNOASINS',
            editable: true,
        },
        {
            title: 'IsMap',
            dataIndex: 'ismap',
            key: 'ismap',
            editable: true,
        },
        {
            title: 'InHouseQty',
            dataIndex: 'inhouseqty',
            key: 'inhouseqty',
            editable: true,
        }
        ,
        {
            title: 'MainCost',
            dataIndex: 'maincost',
            key: 'maincost',
        },
        {
            title: 'SaleCost',
            dataIndex: 'sale_cost',
            key: 'sale_cost',
        }
        ,
        {
            title: 'Zone0',
            dataIndex: 'zone0',
            key: 'zone0',
        },
        {
            title: 'Zone1',
            dataIndex: 'zone1',
            key: 'zone1',
        },
        {
            title: 'VendorStylecode',
            dataIndex: 'vendorstylecode',
            key: 'vendorstylecode',
        },
        {
            title: 'IsAutomatedPU',
            dataIndex: 'ISautomated_PU',
            key: 'ISautomated_PU',
        },
        {
            title: 'VendorStatus',
            dataIndex: 'vendorstatus',
            key: 'vendorstatus',
        },
        {
            title: 'Weight',
            dataIndex: 'min_weight',
            key: 'min_weight',
        },
        {
            title: 'MarketplaceWeight',
            dataIndex: 'marketplace_weight',
            key: 'marketplace_weight',
            editable: true,
        },
        {
            title: 'UploadType',
            dataIndex: 'uploadtype',
            key: 'uploadtype',
            editable: true,
        },
        // {
        //     title: 'operation',
        //     dataIndex: 'operation',
        //     render: (_, record) =>
        //         statelive.dataSource.length >= 1 ? (
        //             <Popconfirm title="Sure to Update?" onConfirm={() => handleupdate(record)}>
        //                 Update
        //             </Popconfirm>
        //         ) : null,
        // }

    ];
    const ModalOpen = () => {

        setVisible(true)
    }

    const handleupdate = () => {
        
        let username = [];
        username = JSON.parse(localStorage.getItem('user'))
        const newData = [...statelive.dataSource];
        

        dispatch(getUpdateInventoryapi({ newData, ms: merchantskus, user: username.LoginName,reason:reasonText })).then(data => {
            setstatelive({ ...statelive, dataSource: data, merchantskusResult: data, loaderState: false });
            // console.log(data)
            setVisible(false)
        })
    };

    const handleSave = (row) => {
        // console.log(row)

        const newData = [...statelive.dataSource];

        const index = newData.findIndex((item) => row.merchantsku === item.merchantsku);

        const item = newData[index];

        newData.splice(index, 1, { ...item, ...row });
        // console.log('handleSave', newData)
        setstatelive({ ...statelive, dataSource: newData });


    };



    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const column = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });

    const onChangetextArea = (e) => {


        if (e.target.value == "") {
            setstatelive({ ...statelive, buttonStatus: true, textAreaStatus: 'able' })
        }
        else if (e.target.value.length != "") {
            setstatelive({ ...statelive, reasonText: e.target.value, buttonStatus: false, textAreaStatus: 'able' })
        }


    }
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} >
                <div>
                    <Cards title="Insert Merchantsku">
                        <Row >


                            <Col span={8} >

                                <div className="auto-complete-input">

                                    <TextArea placeholder="input here" className="custom" value={merchantskus} onChange={onChange} style={{ height: 50 }} />
                                </div>

                            </Col>




                            <Col span={2} style={{ marginLeft: 20 }}>

                                <Button size="large" type="primary" onClick={getMerchantskuDetail} >Search</Button>
                            </Col>


                            <Col span={3} style={{ marginLeft: 20 }}>
                                <Button size="large" style={{ backgroundColor: '#20c997', color: 'white' }} type="success" onClick={{MerchantskuDownload}}  >Download</Button>
                            </Col>
                            <Col span={2} style={{ marginLeft: 20 }}>

                                <Button size="large" type="success" onClick={ModalOpen} style={{ backgroundColor: '#20c997', color: 'white' }}>Update</Button>
                            </Col>


                        </Row>


                    </Cards>
                    <div className="table-responsive">
                        <Table
                            components={components}
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={dataSource}
                            columns={column}

                        />
                    </div>
                </div>
            </Spin >
            <Modal

                centered
                visible={visible}
                
                // onOk={buttonStatus === 'enable'?handleupdate:null}
                   
                 onOk={handleupdate}
                 okButtonProps={{ disabled: buttonStatus  }}
                onCancel={() => setVisible(false)}                >
                <div>
                    <Cards headless>
                        <h1>Sure to Update?</h1>
                    </Cards>
                    <TextArea style={{width:300}}   PlaceHolder="Insert Reason"  onChange={onChangetextArea} ></TextArea>
                </div>

            </Modal>
        </>
    )

}
// ReactDOM.render(<EditableTable />, mountNode);


export default AmazonUpdateInventory;