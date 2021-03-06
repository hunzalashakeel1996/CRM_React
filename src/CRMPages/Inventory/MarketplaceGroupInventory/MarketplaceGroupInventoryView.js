import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs, Button, Table, Modal, Spin, Alert, Switch, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AmazonPU from './overview/AmazonPU';

import Walmart from './overview/Walmart';


//import { ExportData } from '../../../components/downloadtxt/exportTxt'
import { checkPageAccess, downloadFile } from '../../../components/utilities/utilities'

import { webURL, audioPlay, uploadUrl, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi, getSubInventoryapi, getWallMartasinqtyapi, getwalmart_asin_all_otherapi } from '../../../redux/apis/DataAction';


const { TabPane } = Tabs;
const vendorFilter = [];
const brandFilter = [];
const categoryFilter = [];
const collectionFilter = [];
const typeFilter = "";
const statusFilter = "";
const stylecodeFilter = "";
const addOrOtherinventory = "";

const itemType = ['Group', 'Neither', 'single', 'ScrubSet'];
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
    addOrOtherinventory: "",
    typeData: ""

};
const MarketplaceGroupInventoryView = (props) => {


    const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
    const tabChildBar = JSON.parse(userAccess.top_navigation)['Marketplace Group Inventory'];
    const [activeTab, setActiveTab] = useState('');
    let vendornameState = useSelector(state => state.tickets.vendornames);

    const dispatch = useDispatch();



    const [visible, setVisible] = useState(false);


    const [state, setState] = useState({
        downloadDataState: [],
        summaryDataState: [],
        brandnameState: [],
        collectionState: [],
        categorynameState: [],
        puStatusState: [],
        loaderState: true
    });

    const { downloadDataState, summaryDataState, brandnameState, collectionState, categorynameState, puStatusState, loaderState } = state;

    useEffect(() => {
        
            checkPageAccess(userAccess, 'Inventory', "Marketplace Group Inventory", props.history)
        

        Promise.all([dispatch(getAllbrandapi()), dispatch(getAllcollectionapi()), dispatch(getAllcategorynameapi()), dispatch(getAllpustatusapi())]).then((data) => {

            setState({
                ...state, brandnameState: data[0][0].brandname.split(","),
                collectionState: data[1][0].collectionname.split(","), categorynameState: data[2][0].categoryname.split(","), puStatusState: data[3][0].pustatus.split(","), loaderState: false
            })



        });

    }, [])




    {/* <Tabs defaultActiveKey={activeTab} onChange={(key) => {setActiveTab(key)}} type="card" style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                <TabPane tab="Amazon PU" key="Amazon PU">
                <AmazonPU genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} itemType={itemType} />
                </TabPane>
                <TabPane tab="Amazon Rizno" key="Amazon Rizno">
                    Amazon Rizno component goes here
                </TabPane>
                <TabPane tab="Amazon Canada" key="Amazon Canada">
                    Amazon Canada component goes here
                </TabPane>
                <TabPane tab="Amazon UAE" key="Amazon UAE">
                    Amazon UAE component goes here
                </TabPane>
                <TabPane tab="Walmart" key="Walmart">
                <Walmart genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} itemType={itemType} />
                </TabPane>
                <TabPane tab="Walmart Canada" key="Walmart Canada">
                    Walmart Canada component goes here
                </TabPane>
                <TabPane tab="Sears" key="Sears">
                    Sears component goes here
                </TabPane>
                <TabPane tab="Ebay" key="Ebay">
                    Ebay component goes here
                </TabPane>
            </Tabs> */}

    var dataSource = [];
    let counter = 0;


    const genrateFeed = (query, column, isAmazon, val) => {
        // console.log(requestObjInventroy)
        setState({ ...state, loaderState: true })

        //vendorFilter Array to string        
        requestObjInventroy.vendorFilter = requestObjInventroy.vendorFilter.toString();
        //brandFilter Array to string
        requestObjInventroy.brandFilter = requestObjInventroy.brandFilter.toString();
        //collectionFilter Array to string 
        requestObjInventroy.collectionFilter = requestObjInventroy.collectionFilter.toString();
        //categoryFilter Array to string 
        requestObjInventroy.categoryFilter = requestObjInventroy.categoryFilter.toString();
        //   //column Array to statusFilter 
        //   requestObjInventroy.statusFilter = statusFilter
        //column Array to column 
        requestObjInventroy.column = column.toString();
        //column Array to addOrOtherinventory 
        requestObjInventroy.addOrOtherinventory = val

        //column Array to dataFrom 
        requestObjInventroy.dataFrom = query

        requestObjInventroy.isAmazonProcedure = isAmazon


        if (isAmazon == true) {
            dispatch(getSubInventoryapi(requestObjInventroy)).then(data => {
                 console.log(data)
                setState({ ...state, summaryDataState: data[0], downloadDataState: data[1], loaderState: false })

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
                        downloadFile(data[1])
                        setVisible(false)
                    }
                }
            })
        }
        else if (isAmazon == false) {

            dispatch(requestObjInventroy.addOrOtherinventory === 'ADD WALMART INVENTORY' ? getWallMartasinqtyapi(requestObjInventroy) : getwalmart_asin_all_otherapi(requestObjInventroy)).then(data => {
             console.log(data)
                downloadFile(data)
                setState({ ...state, loaderState: false })
                // var link = data
                // var datalink = link;
                // // console.log(datalink.length);
                // for (var z = 0; z < datalink.length;) {
                //     downloadFile(datalink[z])

                //     z++
                // }
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
        //   downloadFile(data[1])
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
            tabName: <AmazonPU genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} itemType={itemType} />

        },
        {
            tab: 'Amazon Rizno',
            key: 'Amazon Rizno',
            tabName: "Amazon Rizno component goes here"
        }
        ,
        {
            tab: 'Amazon Canada',
            key: 'Amazon Canada',
            tabName: "Amazon Canada component goes here"
        }
        ,
        {
            tab: 'Amazon UAE',
            key: 'Amazon UAE',
            tabName: "Amazon UAE component goes here"
        }
        ,
        {
            tab: 'Walmart',
            key: 'Walmart',
            tabName: <Walmart genrateFeed={genrateFeed} genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState} puStatusState={puStatusState} Type={Type} itemType={itemType} />

        }
        ,
        {
            tab: 'Walmart Canada',
            key: 'Walmart Canada',
            tabName: "Walmart Canada component goes here"
        }
        ,
        {
            tab: 'Sears',
            key: 'Sears',
            tabName: "Sears component goes here"
        }
        ,
        {
            tab: 'Ebay',
            key: 'Ebay',
            tabName: "Ebay component goes here"
        }

    ];

    //  const downloadFile =(data)=>
    //  {
    //  var d = new Date();
    //  var n = d.getTime();
    //  var a = document.createElement('a');
    //  a.href = `http://localhost:47463/admin/${data}`;
    //  a.target = '_blank';
    //  a.download = `http://localhost:47463/admin/${data}`;
    //  document.body.appendChild(a);
    //  a.click();

    //  }
    return (
        <>

            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loaderState} >
                <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>

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

export default MarketplaceGroupInventoryView;
