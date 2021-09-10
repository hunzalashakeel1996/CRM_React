import { Table, Input,  Popconfirm, Form, Col, Row, Select, Spin, Radio, Checkbox, Divider,Modal } from 'antd';
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
import { webURL, audioPlay, uploadUrl, getFetchUpdateCanadaInventoryapi, getUpdateCanadaInventoryapi,getUpdateCanadaInventoryDownloadapi } from '../../../../redux/apis/DataAction';

const { TextArea } = Input;
const EditableContext = React.createContext(null);

const AmazonCanadaUpdateInvenory = () => {
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false);

    const [statelive, setstatelive] = useState(
        {
            merchantskus: [],
            merchantskusResult: [],
            loaderState: false,
            dataSource: []
        }
    );

    const { merchantskus, merchantskusResult, loaderState, dataSource } = statelive
    const onChange = (event) => {
        // console.log(event.target.value)
        setstatelive({ ...statelive, merchantskus: event.target.value });

    };
    const getMerchantskuDetail = () => {

        setstatelive({ ...statelive, loaderState: true });

        dispatch(getFetchUpdateCanadaInventoryapi({ ms: merchantskus })).then(data => {
            setstatelive({ ...statelive, dataSource: data, merchantskusResult: data, loaderState: false });
            // console.log(data)
            //  merchantskustable(data)
        })

    }
    const MerchantskuyDownload = () => {

        setstatelive({ ...statelive, loaderState: true });

        dispatch(getUpdateCanadaInventoryDownloadapi({ ms: merchantskus })).then(data => {
            setstatelive({ ...statelive,  loaderState: false });
            // console.log(data)
            downloadFile(data)
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
                        width:150,
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
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
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
            title: 'AmazonCAPrice',
            dataIndex: 'Amazon_CA_Price',
            key: 'Amazon_CA_Price',
            editable: true,
        },
        {
            title: 'AmazonCAStatus',
            dataIndex: 'Amazon_CA_Status',
            key: 'Amazon_CA_Status',
            editable: true,
        },
        {
            title: 'MAPPrice',
            dataIndex: 'MAPprice',
            key: 'MAPprice',
            editable: true,
        },
      
        
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
            dataIndex: 'Canada_Asin',
            key: 'Canada_Asin',
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
            title: 'VendorStylecode',
            dataIndex: 'vendorstylecode',
            key: 'vendorstylecode',
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
            dataIndex: 'Canada_uploadtype',
            key: 'Canada_uploadtype',
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
    const  ModalOpen=()=>{

        setVisible(true)
    }   
   
    const handleupdate = () => {
        let username = [];
        username=JSON.parse(localStorage.getItem('user'))
        const newData = [...statelive.dataSource];
        // console.log('handleupdate',newData)

        dispatch(getUpdateCanadaInventoryapi({ newData, ms: merchantskus ,user: username.LoginName})).then(data => {
            setstatelive({ ...statelive, dataSource: data, merchantskusResult: data, loaderState: false });
           
            setVisible(false)
        })
    };

    const handleSave = (row) => {
        // console.log(row)
     
        const newData = [...statelive.dataSource];

        const index = newData.findIndex((item) => row.merchantsku === item.merchantsku);

        const item = newData[index];

        newData.splice(index, 1, { ...item, ...row });
        // console.log('handleSave',newData)
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

                                 <Button size="large"    type="primary" onClick={getMerchantskuDetail} >Search</Button>
                            </Col>


                            <Col span={3} style={{ marginLeft: 20 }}>
                                 <Button size="large"  style={{backgroundColor: '#20c997', color: 'white'}}   type="success" onClick={MerchantskuyDownload}  >Download</Button>
                            </Col>
                            <Col span={2} style={{ marginLeft: 20 }}>
                               
                                 <Button size="large"     type="success"  onClick={ModalOpen} style={{backgroundColor: '#20c997', color: 'white'}}>Update</Button>
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
                onOk={handleupdate}

                onCancel={() => setVisible(false)}                >
                       <div>
                       <Cards headless>
                    <h1>Sure to Update?</h1>
                    </Cards>
                </div>

            </Modal>
        </>
    )

}
// ReactDOM.render(<EditableTable />, mountNode);


export default AmazonCanadaUpdateInvenory;