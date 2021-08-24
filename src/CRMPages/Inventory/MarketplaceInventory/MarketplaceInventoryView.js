import React, { Suspense, useEffect, useState } from 'react';

import { Tabs, Button, Table, Modal, Spin, Alert, Switch, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AmazonPU from './overview/AmazonPU';
import AmazonRizno from './overview/AmazonRizno';
import AmazonUAE from './overview/AmazonUAE';
import AmazonCanada from './overview/AmazonCanada';
import WalmartCanada from './overview/WalmartCanada';
import Walmart from './overview/Walmart';
import Sears from './overview/Sears';
import Ebay from './overview/Ebay';

import { downloadFile } from '../../../components/utilities/utilities'

import { webURL, audioPlay, uploadUrl,getVendorName, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi, getInventoryapi, getInventoryWalmart_all_otherapi, getInventoryWalmartapi, getEbayqtyapi, getSearsqtyapi, getSears_all_otherapi, getWallMartCAqtyapi, getwalmartCA_all_otherapi,getSearsPriceapi,getPriceWalmartapi } from '../../../redux/apis/DataAction';


const { TabPane } = Tabs;
const vendorFilter = [];
const brandFilter = [];
const categoryFilter = [];
const collectionFilter = [];
const typeFilter = "";
const statusFilter = "";
const stylecodeFilter = "";
const addOrOtherinventory = "";


const Type = ['All', 'Inhouse'];



let requestObjInventroy = {
    vendorFilter: "",
    brandFilter: "",
    categoryFilter: "",
    collectionFilter: "",
    column: "",
    typeFilter: "",
    statusFilter: "",
    stylecodeFilter: "",
    isAmazonProcedure: false,
    dataFrom: "",
    addOrOtherinventory: ""

};
const MarketplaceInventoryView = (props) => {

    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Marketplace Inventory'];

    //  get vendors from redux 
   let vendornameState = useSelector(state => state.tickets.vendornames);

    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('');

    const [visible, setVisible] = useState(false);

    const [state, setState] = useState({
        downloadDataState: [],
        summaryDataState: [],
        brandnameState: [],
        collectionState: [],
        categorynameState: [],
        puStatusState: [],
        loaderState: true,
        
    });

    const { downloadDataState, summaryDataState, brandnameState, collectionState, categorynameState, puStatusState, loaderState } = state;

    useEffect(() => {


        Promise.all([dispatch(getAllbrandapi()), dispatch(getAllcollectionapi()), dispatch(getAllcategorynameapi()), dispatch(getAllpustatusapi())]).then((data) => { 
             //   // console.log('promise All',data)
            setState({...state, brandnameState: data[0][0].brandname.split(","),
                collectionState: data[1][0].collectionname.split(","), categorynameState: data[2][0].categoryname.split(","), puStatusState: data[3][0].pustatus.split(","), loaderState: false
            })



        });

    }, [])


    var dataSource = [];
    let counter = 0;


    const genrateFeed = (query, column, isSeller, val) => {
        // console.log(column)
        setState({ ...state, loaderState: true })

        //vendorFilter Array to string

        requestObjInventroy.vendorFilter = requestObjInventroy.vendorFilter.toString();
        //brandFilter Array to string

        requestObjInventroy.brandFilter = requestObjInventroy.brandFilter.toString();
        //collectionFilter Array to string 

        requestObjInventroy.collectionFilter = requestObjInventroy.collectionFilter.toString();
        //categoryFilter Array to string 

        requestObjInventroy.categoryFilter = requestObjInventroy.categoryFilter.toString();
        //column Array to sring 
        requestObjInventroy.column = column.toString();

        requestObjInventroy.addOrOtherinventory = val
        //   requestObjInventroy.column = column
        requestObjInventroy.dataFrom = query
        requestObjInventroy.isAmazonProcedure = isSeller
        // console.log('requestObjInventroy', requestObjInventroy)

        if (isSeller == "Amazon") {
            dispatch(getInventoryapi(requestObjInventroy)).then(data => {


                // // console.log(data[0][0])

                setState({ ...state, summaryDataState: data[0], downloadDataState: data[1], loaderState: false })
              //  // console.log(data)

                if (data[3] === 'Amazon') {

                    if (data[2] === 'ADD AMAZON INVENTORY') {
                        setVisible(true)
                    }
                    else if (data[2] != 'ADD AMAZON INVENTORY') {
                        setVisible(false)

                        //This Coding wait for live testing 
                        // let currentDate = new Date();
                        // let currentTime = currentDate.getTime();
                        // let tempElemet = document.createElement('a');
                        // let blob = new Blob([data[1].m_StringValue], {type: "octet/stream"})
                        // let url = window.URL.createObjectURL(blob);
                        // tempElemet.href = url;
                        // tempElemet.download = 'Amazon Inventoy' + '.txt';
                        // tempElemet.click();
                        // window.URL.revokeObjectURL(url);

                        downloadFile(data[1])
                        notification.success({
                            message: 'Successfull Dowload',
                            description: `Successfully ${data[2]} Report`,
                            onClose: close,
                        });
                        setVisible(false)
                    }
                }
            })
        }
        else if (isSeller == "Walmart") {

            if (requestObjInventroy.addOrOtherinventory === 'ADD WALMART INVENTORY' ||requestObjInventroy.addOrOtherinventory === 'Walmart PRICE TEMPLATE') {

                dispatch(requestObjInventroy.addOrOtherinventory === 'ADD WALMART INVENTORY' ? getInventoryWalmartapi(requestObjInventroy) :  requestObjInventroy.addOrOtherinventory == 'Walmart PRICE TEMPLATE' ? getPriceWalmartapi(requestObjInventroy) :getInventoryWalmart_all_otherapi(requestObjInventroy)).then(data => {
                    setState({ ...state, loaderState: false })
                     // console.log(data)
                    var link = data

                    var datalink = link;
                    // console.log(datalink.length);
                    for (var z = 0; z < datalink.length;) {
                        downloadFile(datalink[z])
                        z++
                    }
                })

            }



        }
        else if (isSeller == "walmartCA") {


            if (requestObjInventroy.addOrOtherinventory == 'ADD WALMART CANADA INVENTORY') {

                dispatch(getWallMartCAqtyapi(requestObjInventroy)).then(data => {


                    setState({ ...state, loaderState: false })
                    //    // console.log(data[0])


                    var link = data

                    var datalink = link;
                    // console.log(datalink.length);
                    for (var z = 0; z < datalink.length;) {
                        downloadFile(datalink[z])

                        z++
                    }
                })

            }
            if (requestObjInventroy.addOrOtherinventory != 'ADD WALMART CANADA INVENTORY') {

                dispatch(getwalmartCA_all_otherapi(requestObjInventroy)).then(data => {



                    setState({ ...state, loaderState: false })
                    // console.log(data)
                    downloadFile(data)
                })

            }
        }
        else if (isSeller == "Ebay") {
            // if (data[3] === 'Walmart') {

            dispatch(getEbayqtyapi(requestObjInventroy)).then(data => {


                setState({ ...state, loaderState: false })
                // console.log(data)
                downloadFile(data[1])

            })

            // }
        }
        else if (isSeller == "Sears") {


            dispatch(requestObjInventroy.addOrOtherinventory == 'ADD SEARS INVENTORY' ? getSearsqtyapi(requestObjInventroy) : requestObjInventroy.addOrOtherinventory == 'SEARS PRICE TEMPLATE'? getSearsPriceapi(requestObjInventroy) :getSears_all_otherapi(requestObjInventroy)).then(data => {


                setState({ ...state, loaderState: false })
                // console.log(data)
                downloadFile(data)

            })


        }


    };

    if (summaryDataState.length)
        summaryDataState.map(value => {

            const { Add_count, Blank_ID, Del_count, isMapWhenNoMapPrice, isPuPriceSmallMapPrice, isOurMinPriceSmallPuPrice, vendorName, RowIndex } = value;

            return dataSource.push({
                key: counter++,

                Add_count: <span style={{ color: 'black' }} className="date-started">{Add_count}</span>,
                Blank_ID: <span style={{ color: 'black' }} className="date-started">{Blank_ID}</span>,
                Del_count: <span style={{ color: 'black' }} className="date-started">{Del_count}</span>,
                isMapWhenNoMapPrice: <span style={{ color: 'black' }} className="date-started">{isMapWhenNoMapPrice}</span>,
                isPuPriceSmallMapPrice: <span style={{ color: 'black' }} className="date-started">{isPuPriceSmallMapPrice}</span>,
                isOurMinPriceSmallPuPrice: <span style={{ color: 'black' }} className="date-started">{isOurMinPriceSmallPuPrice}</span>,
                vendorName: <span style={{ color: 'black' }} className="date-started">{vendorName}</span>,


            });
        });

    const columns = [
        {
            title: 'Add_count',
            dataIndex: 'Add_count',
            key: 'Add_count',
        },
        {
            title: 'Blank_ID',
            dataIndex: 'Blank_ID',
            key: 'Blank_ID',
        },
        {
            title: 'Del_count',
            dataIndex: 'Del_count',
            key: 'Del_count',
        },
        {
            title: 'isMapWhenNoMapPrice',
            dataIndex: 'isMapWhenNoMapPrice',
            key: 'isMapWhenNoMapPrice',
        },
        {
            title: 'isOurMinPriceSmallPuPrice',
            dataIndex: 'isOurMinPriceSmallPuPrice',
            key: 'isOurMinPriceSmallPuPrice',
        },
        {
            title: 'isPuPriceSmallMapPrice',
            dataIndex: 'isPuPriceSmallMapPrice',
            key: 'isPuPriceSmallMapPrice',
        },
        {
            title: 'vendorName',
            dataIndex: 'vendorName',
            key: 'vendorName',
        }

    ];
    const genrateFilter = (obj, e, isArray) => {

        if (isArray)

            requestObjInventroy[obj] = [...e]
        else {

            requestObjInventroy[obj] = e
        }

    };

    const Download = (data) => {
        downloadFile(data[1])
        notification.success({
            message: 'Successfull Dowload',
            description: `Successfully Add Amazon Inventory Template`,
            onClose: close,
        });
        downloadFile(downloadDataState)

        setVisible(false)



    }


    const topManu = [
        {
            tab: 'Amazon PU',
            key: 'Amazon PU',
            tabName: <AmazonPU genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />
        },
        {
            tab: 'Amazon Rizno',
            key: 'Amazon Rizno',
            tabName: <AmazonRizno genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />

        },
        {
            tab: `Amazon UAE`,
            key: `Amazon UAE`,
            tabName: <AmazonUAE genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />

        },
        {
            tab: 'Amazon Canada',
            key: 'Amazon Canada',
            tabName: <AmazonCanada genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />

        },
        {
            tab: 'Walmart',
            key: 'Walmart',
            tabName: <Walmart genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />

        },
        {
            tab: 'Walmart Canada',
            key: 'Walmart Canada',
            tabName: <WalmartCanada genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />

        },
        {
            tab: 'Sears',
            key: 'Sears',
            tabName: <Sears genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />

        },
        {
            tab: 'Ebay',
            key: 'Ebay',
            tabName: <Ebay genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} />
        }
    ];


    return (
        <>

            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} >
                <Tabs type={'card'}  defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>

                    {topManu.map(item => (  
                        tabChildBar?.includes(item.tab) && (
                            <TabPane tab={item.tab} key={item.key}>
                                {item.tabName}
                            </TabPane>)

                    ))}
                 
                </Tabs>

            </Spin >


            <Modal
                title="Report Summary Add Inventory Template"
                centered
                visible={visible}
                onOk={() => Download(downloadDataState)}

                onCancel={() => setVisible(false)}
                width={1000} >


                <div className="table-responsive">
                    <Table pagination={true} dataSource={dataSource} columns={columns} />
                </div>



            </Modal>

        </>
    );
};

export default MarketplaceInventoryView;
