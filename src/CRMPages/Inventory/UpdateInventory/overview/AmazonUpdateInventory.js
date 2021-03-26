import { Col, Row, Select, Spin, Radio, Checkbox, Divider, Input, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../components/autoComplete/autoComplete';
import { Cards } from '../../../../components/cards/frame/cards-frame';

import { Button } from '../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { webURL, audioPlay, uploadUrl, getUpdateInventoryapi } from '../../../../redux/apis/DataAction';

const { TextArea } = Input;

const columns = [
    {
        title: 'MerchantSku',
        dataIndex: 'merchantSku',
        key: 'merchantSku',
    },
    {
        title: 'ColorName',
        dataIndex: 'colorName',
        key: 'colorName',
    },
    {
        title: 'Cost',
        dataIndex: 'Cost',
        key: 'Cost',
    },
    {
        title: 'PUPrice',
        dataIndex: 'PUPrice',
        key: 'PUPrice',
    },
    {
        title: 'PUStatus',
        dataIndex: 'PUStatus',
        key: 'PUStatus',
    },
    {
        title: 'MAPPrice',
        dataIndex: 'MAPPrice',
        key: 'MAPPrice',
    },
    {
        title: 'AmazonPrice',
        dataIndex: 'AmazonPrice',
        key: 'AmazonPrice',
    },
    {
        title: 'StyleStatus',
        dataIndex: 'styleStatus',
        key: 'styleStatus',
    }
    ,
    {
        title: 'vendorQty',
        dataIndex: 'vendorQty',
        key: 'vendorQty',
    },
    {
        title: 'UPC',
        dataIndex: 'UPC',
        key: 'UPC',
    },
    {
        title: 'ASINS',
        dataIndex: 'ASINS',
        key: 'ASINS',
    },
    {
        title: 'riznoASINS',
        dataIndex: 'riznoASINS',
        key: 'riznoASINS',
    },
    {
        title: 'isMap',
        dataIndex: 'isMap',
        key: 'isMap',
    },
    {
        title: 'inHouseQty',
        dataIndex: 'inHouseQty',
        key: 'inHouseQty',
    }
    ,
    {
        title: 'mainCost',
        dataIndex: 'mainCost',
        key: 'mainCost',
    },
    {
        title: 'saleCost',
        dataIndex: 'saleCost',
        key: 'saleCost',
    }
    ,
    {
        title: 'zone0',
        dataIndex: 'zone0',
        key: 'zone0',
    },
    {
        title: 'zone1',
        dataIndex: 'zone1',
        key: 'zone1',
    },
    {
        title: 'vendorStylecode',
        dataIndex: 'vendorStylecode',
        key: 'vendorStylecode',
    },
    {
        title: 'isAutomatedPU',
        dataIndex: 'isAutomatedPU',
        key: 'isAutomatedPU',
    },
    {
        title: 'vendorStatus',
        dataIndex: 'vendorStatus',
        key: 'vendorStatus',
    },
    {
        title: 'weight',
        dataIndex: 'minWeight',
        key: 'minWeight',
    },
    {
        title: 'marketplaceWeight',
        dataIndex: 'marketplaceWeight',
        key: 'marketplaceWeight',
    },
    {
        title: 'uploadType',
        dataIndex: 'uploadType',
        key: 'uploadType',
    }
    ,
    {
        title: 'modify',
        dataIndex: 'modify',
        key: 'modify',
    }
];
var counter = 0;
const AmazonUpdateInventory = () => {
    const dispatch = useDispatch()

    const [state, setState] = useState(
        {
            merchantskus: [],
            merchantskusResult: [],
            loaderState: false,
            dataSource: []
        }
    );


    const { merchantskus, merchantskusResult, loaderState, dataSource } = state

    const onChange = (event) => {
        console.log(event.target.value)
        setState({ ...state, merchantskus: event.target.value });

    };
    const onChangeontable = (event) => {
        console.log(event.target.value)
        const [stateTable, setStateTable] = useState(
            {
                merchantsku: event.target.value

            }
        );
        setStateTable({ ...state, merchantsku: event.target.value });

    };

    const getMerchantskuDetail = () => {

        setState({ ...state, loaderState: true });

        dispatch(getUpdateInventoryapi({ ms: merchantskus })).then(data => {

            console.log(data)
            setState({ ...state, merchantskusResult: data, loaderState: false });





            merchantskustable(data)


        })

    }
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
    const merchantskustable = (merchantskusResult) => {

        console.log('merchantskusResult', merchantskusResult);
        let tempDataSource = []
        if (merchantskusResult !== '')
            merchantskusResult.map((value, i) => {
                const { merchantsku, colorname, Cost, PU_price, pustatus, MAPprice, stylestatus, vendorqty, UPC, ASINS, RIZNOASINS, ismap, inhouseqty, maincost, sale_cost, zone0, zone1,
                    vendorstylecode, ISautomated_PU, vendorstatus, min_weight, marketplace_weight, uploadtype, amazonprice } = value;
                return tempDataSource.push({
                    key: counter++,

                    merchantSku: <span style={{ color: 'black' }} className="date-started">{merchantsku}</span>,
                    colorName: <span style={{ color: 'black' }} className="date-started">{colorname}</span>,
                    Cost: <span style={{ color: 'black' }} className="date-started">{Cost}</span>,
                    PUPrice: <Input style={{ color: 'black' }} type="text" value={PU_price} />,
                    PUStatus: <Input style={{ color: 'black' }} type="text" value={pustatus} />,
                    MAPPrice: <Input style={{ color: 'black' }} type="text" value={MAPprice} />,
                    AmazonPrice: <Input style={{ color: 'black' }} type="text" value={amazonprice} />,
                    styleStatus: <Input style={{ color: 'black' }} type="text" value={stylestatus} />,
                    vendorQty: <Input style={{ color: 'black' }} type="text" value={vendorqty} />,
                    UPC: <Input style={{ color: 'black' }} type="text" value={UPC} />,
                    ASINS: <Input style={{ color: 'black' }} type="text" value={ASINS} />,
                    riznoASINS: <Input style={{ color: 'black' }} type="text" value={RIZNOASINS} />,
                    isMap: <Input style={{ color: 'black' }} type="text" value={ismap} />,
                    inHouseQty: <Input style={{ color: 'black' }} type="text" value={inhouseqty} />,
                    mainCost: <span style={{ color: 'black' }} className="date-started">{maincost}</span>,
                    saleCost: <span style={{ color: 'black' }} className="date-started">{sale_cost}</span>,
                    zone0: <span style={{ color: 'black' }} className="date-started">{zone0}</span>,
                    zone1: <span style={{ color: 'black' }} className="date-started">{zone1}</span>,
                    vendorStylecode: <span style={{ color: 'black' }} className="date-started">{vendorstylecode}</span>,
                    isAutomatedPU: <span style={{ color: 'black' }} className="date-started">{ISautomated_PU}</span>,
                    vendorStatus: <span style={{ color: 'black' }} className="date-started">{vendorstatus}</span>,
                    minWeight: <span style={{ color: 'black' }} className="date-started">{min_weight}</span>,
                    marketplaceWeight: <Input style={{ color: 'black' }} type="text" value={marketplace_weight} />,
                    uploadType: <Input style={{ color: 'black' }} type="text" value={uploadtype} />,
                    modify: <Button size="default" type="primary"  >Update</Button>,


                   

                });
           
            });
        setState({ ...state, dataSource: tempDataSource });

    }
    const [selectionType, setSelectionType] = useState('checkbox');

    
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
       
      
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} >


                <div style={{ marginTop: 10 }}>
                    <Cards title="Insert Merchantsku">
                        <Row >


                            <Col span={8} >

                                <div className="auto-complete-input">
                                    {/* <AutoComplete
                    customComponent={<TextArea placeholder="input here" className="custom" style={{ height: 50 }} />}
                    // dataSource={dataSource}
                    // onSearch={onSearch}
                  /> */}
                                    <TextArea placeholder="input here" className="custom" value={merchantskus} onChange={onChange} style={{ height: 50 }} />
                                </div>

                            </Col>
                            <Col span={2} style={{ marginLeft: 20 }}>

                                <Button size="default" type="primary" onClick={getMerchantskuDetail} >Search</Button>
                            </Col>


                            <Col span={3} style={{ marginLeft: 20 }}>
                                <Button size="default" type="success"  >Download</Button>
                            </Col>

                        </Row>
                    </Cards>

                    <div>
                        <Cards title="View Merchantsku">
                            <div className="table-responsive">
                                <Table pagination={true} dataSource={dataSource} columns={columns} rowSelection={{ type: selectionType, ...rowSelection, }} />
                            </div>
                            {/* <div>
        <table className="">
          <thead>
            <tr>
              <th>
                Item
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <hr/>
        <input
          type="text"
          value={this.state.message}
          onChange={this.updateMessage.bind(this)}
        />
        <button
          onClick={this.handleClick.bind(this)}
        >
          Add Item
        </button>
      </div> */}
                        </Cards>
                    </div>

                </div>
            </Spin >
        </>
    )
}


export default AmazonUpdateInventory;