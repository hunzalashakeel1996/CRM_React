import actions from '../authentication/actions';
import sound from '../../static/sounds/notificationBeep.wav'
import { useSelector } from 'react-redux';
import { Button, notification, Space } from 'antd';


export const webURL = `http://localhost:3001`
// export const webURL = "http://mergemtvw.herokuapp.com";

// export const socketUrl = "ws://192.168.1.101:3005"
// export const socketUrl = "wss://crm.rizno.com:3001"
export const socketUrl = "wss://pu-crm-backend.herokuapp.com/"

//##################### Node Server Live ########################
export const url = "https://crm.rizno.com:3001";
//##################### Node Server Local ########################
//  export const url = "http://192.168.1.103:3005";

// export const url = "http://192.168.4.104:3000";
// export const url = "https://pu-crm-backend-develop.herokuapp.com";
// export const url = "http://beu4uojtuot0pa:ikjkj3q9hmd8rmka5i9biap7hb2my@us-east-static-06.quotaguard.com:9293";

//#################### Dot NET Local URL ####################
//export const urlDotNet ="http://localhost:47463/api"

//#################### Dot NET Live URL ####################
export const urlDotNet = "https://crm.rizno.com/api"


export const uploadUrl = "https://images.vanwala.pk";

const { uiStartLoading, uiStopLoading } = actions;


let headerWithWebToken = {
    Accept: "application/json",
    "Content-Type": "application/json",
    'Cache-Control': 'no-cache',
    "jsonwebtoken": localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).jwtToken : null
}

let headerDotNetWithJwt = {
    "Content-Type": "application/json",
    "Authorization": `bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).jwtToken : null}`
}

let multipartHeader = {
    Accept: 'application/json',
    "Authorization": `bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).jwtToken : null}`
    // "Content-Type": "multipart/form-data",
}

export const setHeader = () => {
    headerWithWebToken = {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        "jsonwebtoken": JSON.parse(localStorage.getItem('user')).jwtToken
    }
}

export const setHeaderWithWebToken = () => {
    // console.log('adfdfdfd')
    // localStorage.getItem('user').then((val) => {
        // headerWithWebToken = {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //     'Cache-Control': 'no-cache',
        //     "jsonwebtoken": val.jwtKey
        // }
        headerDotNetWithJwt = {
            "Content-Type": "application/json",
            "Authorization": `bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).jwtToken : null}`
        }
        multipartHeader = {
            Accept: 'application/json',
            "Authorization": `bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).jwtToken : null}`
            // "Content-Type": "multipart/form-data",
        }
    // })
}

export const audioPlay = () => {
    let audio = new Audio(sound).play()
    audio.then(() => {
        // console.log('suiccess')
    }).catch(err => {
        // console.log('err', err)
    })
}

export const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
}


const headerDotNet = {
    "Content-Type": "application/json"
}

const headerFileDotNet = {
    "content-type": "multipart/form-data;"
}

export const apiTrackingSummaryFetch = (data) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            // dispatch(uiStartLoading());
            fetch(`http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID="622PULSE3418"><TrackID ID=${JSON.stringify(data.trackingNO)}></TrackID></TrackRequest>`
                , {
                    method: 'GET'
                }
            )
                .then(res => {
                    return res.text()
                })
                .then(resJson => {
                    if (resJson) {
                        resolve(resJson.split('<TrackSummary>')[1].split('</TrackSummary>')[0]);
                    }
                    // dispatch(uiStopLoading())
                })
                .catch(err => { return saveErrorLog(err, `http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID="622PULSE3418"><TrackID ID=${JSON.stringify(data.trackingNO)} ></TrackID></TrackRequest>`) })
        });
    }
};

export const apiFetchDotNet = (apiUrl, apiMethod, apiHeader, apiBody) => {
    let headerParameters = apiMethod === 'GET' ? { method: apiMethod, headers: apiHeader } : { method: apiMethod, headers: apiHeader, body: apiBody }
    return dispatch => {
   
        return new Promise((resolve, reject) => {
            fetch(`${urlDotNet}/${apiUrl}`, headerParameters)
                .then(res => {
             
                    return res.json()
                })
                .then(resJson => {
              
                    if (resJson) {
                        resolve(resJson);
                    }
                })
                .catch(err => {
                 
                    return saveErrorLog(err, apiUrl)
                })
        });
    }
};

export const apiFetch = (apiUrl, apiMethod, apiHeader, apiBody, isImage = false) => {

    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(uiStartLoading());
            fetch(`${isImage ? uploadUrl : url}/${apiUrl}`, {
                method: apiMethod,
                headers: apiHeader,
                body: apiBody
            })
                .then(res => {
                    return res.json()
                })
                .then(resJson => {
                    if (resJson) {
                        // dispatchAction && dispatch(dispatchAction(resJson))
                        resolve(resJson);
                    }
                    dispatch(uiStopLoading())
                })
                .catch(err => { return saveErrorLog(err, apiUrl) })
        });
    }
};


const saveErrorLog = (error, apiURL) => {
    console.warn('ERRR', error)
    // notification['error']({
    //     message: 'Sorry',
    //     description:
    //         'Error from server side',
    // });

    // alert('sorrt')
    // fetch(`${url}/api/common/logError`, {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         "Content-Type": 'application/json',
    //     },
    //     body: JSON.stringify({
    //         error,
    //         apiURL
    //     })
    // })
    //     .then(res => { return res.json() })
    //     .then((resJson) => {
    //         let data = {
    //             msg: `New error inserted in database`,
    //             number: "923342664254",
    //         }
    //     })
    //     .catch(err => alert('Sorry', `Server Error please try again later ${err}`))
}

// ============================= API start ======================================

// ============================= Shipping API start ======================================




export const feed_report = (data) => {
    return apiFetchDotNet('Report/feed_report', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
};
export const getBrand = (data) => {
    return apiFetchDotNet('update/getvendor', "GET");
};
//shipping Tab Apis
export const getPolyBags = (data) => {
    return apiFetchDotNet('/Report/Addbags', "POST", headerDotNetWithJwt, JSON.stringify({}));
};
export const getThermalBags = (data) => {
    return apiFetchDotNet('/Report/Addthermalbags', "POST", headerDotNetWithJwt, JSON.stringify({}));
};
//Amazon shipping Step status
export const amazonStepStatus = (data) => {
    return apiFetchDotNet('/AmazonShipping/labels_API', "POST", multipartHeader, data);
};
//Amazon shipping Asin uploadFile
export const insertAmazonAsinShiping = (data) => {
    return apiFetchDotNet('/Newshipping/InsertAsins', "POST", multipartHeader, data);
};
//Amazon shipping Sheet uploadFile
export const insertAmazonSheetShiping = (data) => {
    return apiFetchDotNet('/Newshipping/InsertWeight', "POST", multipartHeader, data);
};
//Amazon Shiping Validation Sheet uploadFile
export const amazonShipingValidation = (data) => {
    return apiFetchDotNet('/AmazonShipping/Amazon_shiping_validation', "POST", headerDotNetWithJwt, data);
};
//Amazon Creat shipping 
export const amazonCreateShiping = (data) => {
    return apiFetchDotNet('/AmazonShipping/Create_Amazon_shiping', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Amazon generate Feed 
export const AmazongenerateFeed  = (data) => {
    return apiFetchDotNet('/AmazonShipping/Genrate_Amazon_Shipping_feed', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Non Amazon shipping Sheet uploadFile
export const insertNonAmazonSheetShiping = (data) => {
    return apiFetchDotNet('/Newshipping/NonamazonInsertWeight', "POST", multipartHeader, data);
};
//Non Amazon Shiping Validation 
export const nonAmazonShipingValidation = (data) => {
    return apiFetchDotNet('/NonAmazonShipping/Non_Amazon_shiping_validation', "POST", headerDotNetWithJwt, data);
};
//Non Amazon Creat shipping 
export const nonAmazonCreateShiping = (data) => {
    return apiFetchDotNet('/NonAmazonShipping/Create_Non_Amazon_shiping', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Non Amazon generate Feed 
export const nonAmazongenerateFeed  = (data) => {
    return apiFetchDotNet('/NonAmazonShipping/Genrate_Amazon_Shipping_feed', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Endicia shiping sheet 
export const insertEndiciaShipingSheet  = (data) => {
    console.log('multipartHeader',multipartHeader)
    return apiFetchDotNet('/Newshipping/InsertEndiciaWeight', "POST", multipartHeader, data);
};
//Fedex shiping sheet 
export const insertFedexShipingSheet  = (data) => {
    return apiFetchDotNet('/Walmart/InserCAWeight', "POST", multipartHeader, data);
};
//Fedex shiping validation
export const insertFedexShipingSheetvalidation  = (data) => {
    return apiFetchDotNet('/Walmart/label_validation', "POST", multipartHeader, data);
};
//Creat Fedex shiping 
export const createShipingFedex  = (data) => {
    return apiFetchDotNet('/Walmart/WalmartCA_shipping', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//Endicia Shiping Validation 
export const endiciaShipingValidation = (data) => {
    return apiFetchDotNet('/Endicia_shiping/endicia_shiping_validation', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Endicia Create Shiping  

export const endiciaShipingCreateShiping = (data) => {
    return apiFetchDotNet('/Endicia_shiping/Create_Endicia_shiping', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Endicia check count

export const endiciaShipingcheckcount = (data) => {
    return apiFetchDotNet('/Endicia_shiping/check_count', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Endicia Daily Check Multiple Create Label

export const multipleCreateLabel = (data) => {
    return apiFetchDotNet('/Newshipping/daily_Check_multiple_create_label', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Endicia Verify Label
export const endiciaVerifyLabel = (data) => {
    return apiFetchDotNet('/Endicia_shiping/verify_label', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Fedex Verify Label
export const fedexVerifyLabel = (data) => {
    return apiFetchDotNet('/walmart/verify_label', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Endicia Rizno shiping sheet 
export const insertRiznoEndiciaShipingSheet  = (data) => {
    return apiFetchDotNet('/Newshipping/rizno_shipping_File', "POST", multipartHeader, data);
};
//Endicia Rizno Shiping Validation 
export const endiciaRiznoShipingValidation = (data) => {
    return apiFetchDotNet('/Endicia_shiping/rizno_shiping_Validation', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Endicia Rizno Create Shiping  
export const riznoEndiciaShipingCreateShiping = (data) => {
    return apiFetchDotNet('/Endicia_shiping/Create_Rizno_Endicia_shiping', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Endicia Rizno Daily Check Multiple Create Label
export const multipleCreateLabelRizno = (data) => {
    return apiFetchDotNet('/Newshipping/daily_Check_multiple_create_label_rizno', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Endicia Rizno check count
export const endiciaRiznoShipingcheckcount = (data) => {
    return apiFetchDotNet('/Endicia_shiping/check_rizno_count', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};

//Endicia RefundLabel
export const endiciaRefundLabel = (data) => {
    return apiFetchDotNet('/Endicia_shiping/create_refund_shiping', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Check Endicia RefundLabel
export const checkEndiciaRefundLabel = (data) => {
    return apiFetchDotNet('/Endicia_shiping/verify_refund', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Manual Shipment->POnumber->Submit Button
export const manualShipmentPonumber = (data) => {
    return apiFetchDotNet('/Newshipping/ponumbers', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Manual Shipment->POnumber->Manual Tick
export const manualShipmentPonumberManualTick = (data) => {
    return apiFetchDotNet('/Walmart/manuallyshipped', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Manual Shipment->Amazon Manual Shipping Upload File
export const manualShipmentAmazonManualShipping = (data) => {
    return apiFetchDotNet('/Walmart/uploadamazon', "POST", multipartHeader, data);
};
//Manual Shipment->Amazon Manual Shipping File sheet
export const manualShipmentAmazonManualShippingAmazonFileSheet= (data) => {
    return apiFetchDotNet('/Walmart/amazonfiledownload', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Manual Shipment->Amazon Manual Shipping Upload File
export const manualShipmentAmazonManualShippingAmazonFileDownload = (data) => {
    return apiFetchDotNet('/Walmart/AmazonmanualSheet', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};

//DELIVERY TRACKING STATUS
export const getDeliveyTrackingStatus = (data) => {
    return apiFetchDotNet('/Edit/delivered_tracking_status_report', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Intransits Tracking Upload
export const inTransitsTrackingInsert = (data) => {
    return apiFetchDotNet('/Edit/TransUpload', "POST", multipartHeader, data);
};
//Intransits Tracking Data
export const inTransitsTrackingData= (data) => {
    return apiFetchDotNet('/Edit/Intransis_tracking', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//WEB LABELS ORDERS
export const getWebLabelOrders = (data) => {
    return apiFetchDotNet('/Report/web_create_label_order', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//ALL MP SHIPMENTS
export const getAllMPShipments = () => {
    return apiFetchDotNet('/Report/All_MP_Shipment', "POST", headerDotNetWithJwt, JSON.stringify());
};
//Duplicate Tracking
export const getDupicateTracking= (data) => {
    return apiFetchDotNet('/Edit/duplicate_tracking', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Get Weight for Label calculation Upoad File
export const GetWeightforAmazonLabelUpoadFile = (data) => {
    return apiFetchDotNet('/Edit/AmazonWeightDownload', "POST", multipartHeader, data);
};



//Label calculation Download 

export const GetWeightforAmazonLabelDownload = (data) => {
    return apiFetchDotNet('/Edit/download_amazon_weight_report', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//Getweightinventory
export const Getweightinventory = (data) => {
    return apiFetchDotNet('/Edit/weightinventory', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
//PUStyles->PUAppscript
export const PUAppscript = (data) => {
    return apiFetchDotNet('/Report/download_PU_App_script', "POST", headerDotNetWithJwt,  JSON.stringify(data));
};
// //RMA->RMA Monthly Report
// export const PUAppscript = (data) => {
//     return apiFetchDotNet('/Report/rma_monthly_report', "POST", headerDotNetWithJwt,  JSON.stringify(data));
// };
// ============================= Shipping API end ======================================

// ============================= Reports API start ======================================


export const getOverViewReport = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Ereports/SalesReport', "POST", headerDotNet, JSON.stringify(data));
};
export const getTeamReport = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Ereports/CRMReportS', "POST", headerDotNet, JSON.stringify(data));
};
export const getVendorSalesReport = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Ereports/VendorCRMReportS', "POST", headerDotNet, JSON.stringify(data));
};
// export const getUnshippedOrders = (data) => {
//     // console.log("Hello World!")
//     return apiFetchDotNet('/Ereports/po_item_received', "POST", headerDotNet, JSON.stringify(data));
// };

export const getSalesSummary = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Ereports/sale_summary', "POST", headerDotNet, JSON.stringify(data));
};

export const getTargetReport = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Ereports/Target_report', "POST", headerDotNet, JSON.stringify(data));
};

// export const getReturnPercentageReport = (data) => {
//     // console.log("Hello World!")
//     return apiFetchDotNet('/Ereports/Return_percentage_report', "POST", headerDotNet, JSON.stringify(data));
// };
export const getCRMOrderReport = (data) => {
    return apiFetchDotNet('/Ereports/OrdersREPORT', "POST", headerDotNet, JSON.stringify({  }));
};
export const getCRMOrderReportPU = (data) => {
    // console.log("Hello World!", JSON.parse(localStorage.getItem('user')).jwtToken)
    return apiFetchDotNet('/Ereports/OrdersREPORTPU', "POST", headerDotNet, JSON.stringify(data));
};
export const getCRMOrderReportJLC = (data) => {
    // // console.log("Hello World!")
    return apiFetchDotNet('/Ereports/OrdersREPORTJLC', "POST", headerDotNet, JSON.stringify(data));
};
export const getCRMOrderReportWM = (data) => {
    // // console.log("Hello World!")
    return apiFetchDotNet('/Ereports/OrdersREPORTWallmart', "POST", headerDotNet, JSON.stringify(data));
};

// ============================= Reports API End ======================================
// ============================= StylesNotInPU API start ======================================

export const getStylesNotInPu = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/download_pu_style_report', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const getExcludedStylesNotInPu = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Report/download_pu_style_report_excluded', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const getStyleVariationsNotInPu = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/variation_wise', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const getExcludedStyleVariationsNotInPu = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Report/variation_wise_Excluded', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//============================= StylesNotInPU API end ======================================


//============================= RMA API Start ======================================

export const getRMAMonthlyreporting = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Report/rma_monthly_report', "POST", headerDotNetWithJwt, JSON.stringify(data));
};


//============================= RMA API End ======================================


//============================= ORDER API Start ======================================

//PNL Report
export const getPNLReport = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Edit/sale_reportUT', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//Sales Report
export const getSalesReport = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Edit/sale_report', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//PONet Amount
export const getPONetAmount = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Edit/ponet_amount', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//InstockOrders
export const getInstockReport = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Edit/instock_report', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//Instock Sold Report
export const  getInstockSoldReport = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Edit/Instock_sold', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//Order Confirmation Number
export const  getOrderConfirmationNumber = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/AmazonShipping/confirmationpo', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//Order Search
export const  getOrderSearch = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/orders/List', "POST", headerDotNetWithJwt, JSON.stringify(data));
};


//Back Order Items
export const  getBackOrderItems = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/orders/Back_order_items_log', "POST", headerDotNetWithJwt, JSON.stringify(data));
};


//============================= ORDER API End ======================================


// ============================= Customer Service start ======================================
//Back Order Items
export const  getProhibitedWords = () => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/CustomerService/getProbitedWords', "GET");
};

export const  insertProhibitedWord = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/CustomerService/insertProhibitedWord', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
// ============================= Customer Service end ======================================



// ============================= REPORT API start ======================================

export const getBalanceSheetRecord = () => {
    // console.log('abcd')
    return apiFetchDotNet('Report/balance_sheet_view', "POST", headerDotNetWithJwt, JSON.stringify({  }));
};
export const getBalanceSheetRecordOnClick = (data) => {
    return apiFetchDotNet('Report/balance_sheet', "POST", headerDotNetWithJwt, JSON.stringify({ ...data  }));
};

// export const getBalanceSheetRecord2 = (data) => {
//     // // console.log('abcd')
//     return apiFetchDotNet('Report/balance_sheet_view', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
// };

export const getFeedBackRecordOnClick = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/feed_report', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};
export const getReturnRecordOnClick = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/Check_Return_report', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};
export const getVendorTrackingRecordOnClick = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/Vendor_Tracking_with_Shiping_Price', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};


export const getCheckReleaseOrdersRecordOnClick = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/Check_Released_Order', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};

export const getOrderTrackingRecordOnClick = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/ordertrackingstatus', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};

export const getPOitemReceivedRecordOnClick = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/PurchasedOrders', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};

export const orderDownloadReport = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/order_download_report', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};

export const saleSummaryReport = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/summary_report', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};

export const comparisonReport = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/Comparison_report', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};

export const topSellingStyleCodes = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/Top_Selling_Report', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};

export const purchaseReport = (data) => {
    // // console.log('abcd')
    return apiFetchDotNet('Report/purchase_report', "POST", headerDotNetWithJwt, JSON.stringify({ ...data }));
};
// ============================= REPORT API end ======================================



// ============================= Inventory API start ======================================
export const getvendor = (data) => {
    return apiFetchDotNet('newInventory/getVendor_active', "GET",headerDotNetWithJwt);
};
export const getWebvendor = (data) => {
    return apiFetchDotNet('newInventory/getWebVendor_active', "GET",headerDotNetWithJwt);
};
export const getVendorName = (data) => {
    // console.log('vendor')
    return apiFetchDotNet('newInventory/getVendorname', "GET",headerDotNetWithJwt);
};
export const getUpdateVendorInventoryapi = (data) => {

    return apiFetchDotNet('newInventory/updateVendorInventory', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
};
export const getUpdateWebVendorInventoryapi = (data) => {

    return apiFetchDotNet('newInventory/updateWebVendorInventory', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
};

export const getInventoryapi = (data) => {
  
    return apiFetchDotNet('newInventory/fetchInventoryapi', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};

export const getSubInventoryapi = (data) => {
  
    return apiFetchDotNet('newInventory/fetchSubInventoryapi', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};

export const getAllVendorapi = (data) => {
    return apiFetchDotNet('newInventory/getvendor', "GET",headerDotNetWithJwt);
};
export const getAllbrandapi = (data) => {
    return apiFetchDotNet('newInventory/getBrand', "GET",headerDotNetWithJwt);
};
export const getAllcollectionapi = (data) => {
    return apiFetchDotNet('newInventory/getCollection', "GET",headerDotNetWithJwt);
};
export const getAllcategorynameapi = (data) => {
    return apiFetchDotNet('newInventory/getcategoryname', "GET",headerDotNetWithJwt);
};
export const getAllpustatusapi = (data) => {
    return apiFetchDotNet('newInventory/getpustatus', "GET",headerDotNetWithJwt);
};
export const getInventoryWalmartapi = (data) => {
    return apiFetchDotNet('newInventory/WallMartqty', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
export const getPriceWalmartapi = (data) => {
    return apiFetchDotNet('update/WallMartPrice', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getInventoryWalmart_all_otherapi = (data) => {
    return apiFetchDotNet('newInventory/WallMartallother', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};

export const getWallMartasinqtyapi = (data) => {
    return apiFetchDotNet('newInventory/WallMartasinqty', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
export const getwalmart_asin_all_otherapi = (data) => {
  
    return apiFetchDotNet('newInventory/walmart_asin_all_other', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
export const getWallMartCAqtyapi = (data) => {
    return apiFetchDotNet('newInventory/WallMartqty_canada', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
export const getwalmartCA_all_otherapi = (data) => {
    return apiFetchDotNet('newInventory/wallmart_canada_generate', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
export const getEbayqtyapi = (data) => {
    return apiFetchDotNet('newInventory/ebaygeneratefile', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
//not exists
export const getEbay_all_otherapi = (data) => {
  
   // return apiFetchDotNet('newInventory/walmart_asin_all_other', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
export const getSearsqtyapi = (data) => {
    return apiFetchDotNet('newInventory/searsInventory', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
export const getSearsPriceapi = (data) => {
    return apiFetchDotNet('update/searsprice', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getSears_all_otherapi = (data) => {
    return apiFetchDotNet('newInventory/sears_generate_file', "POST", headerDotNetWithJwt,JSON.stringify({ data }));
};
//n
export const getFetchUpdateInventoryapi = (data) => {
    
    return apiFetchDotNet('newInventory/Editinventory', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getUpdateInventoryDownloadapi = (data) => {
    
    return apiFetchDotNet('newInventory/Editreportresult', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getUpdateInventoryapi = (data) => {
    
    return apiFetchDotNet('newInventory/updateinventory', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getFetchUpdateCanadaInventoryapi = (data) => {
    
    return apiFetchDotNet('newInventory/Edit_ca_inventory', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getUpdateCanadaInventoryapi  = (data) => {
    
    return apiFetchDotNet('newInventory/edit_canada_bulk_product', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getUpdateCanadaInventoryDownloadapi = (data) => {
    
    return apiFetchDotNet('newInventory/download_ca_edit_report', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
//
export const getFetchUpdateUAEInventoryapi = (data) => {
    
    return apiFetchDotNet('newInventory/Edit_UAE_inventory', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getUpdateUAEInventoryapi  = (data) => {
    
    return apiFetchDotNet('newInventory/edit_uae_bulk_product', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getUpdateUAEInventoryDownloadapi = (data) => {
    
    return apiFetchDotNet('newInventory/download_uae_edit_report', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
//

export const getFetchUpdateSubinventoryapi = (data) => {
    
    return apiFetchDotNet('newInventory/editSubinventory', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getUpdateSubinventoryapi  = (data) => {
    
    return apiFetchDotNet('newInventory/updatesubinventory', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
export const getUpdateSubinventoryDownloadapi = (data) => {
    
    return apiFetchDotNet('newInventory/Subinventoryreportresult', "POST", headerDotNetWithJwt,JSON.stringify( data ));
};
//upload File Update
export const getUploadFileUpdateSKUapi = (data) => {
    // console.log('aaaaa headerFileDotNet', data)
    return apiFetchDotNet('newInventory/UploadFile', "POST", multipartHeader, data );
};
//Marketplace place Weight Update
export const getUploadmarketplace_weightapi = (data) => {
 
    return apiFetchDotNet('newInventory/Uploadmarketplace_weight', "POST", multipartHeader, data );
};
//Shipping Update Update void
export const getShippingUpdateapi = (data) => {
 console.log()
    return apiFetchDotNet('Edit/shipping_insert', "POST", multipartHeader, data );
};

//Marketplace place Weight Update
export const apiWalmartCustomerEmail = (data) => {
 
    return apiFetchDotNet('Walmart/EmailsGet', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//sanmar sales Update 
export const getSanmarSalesUpdateapi = (data) => {
 
    return apiFetchDotNet('newInventory/UploadSanmar', "POST", multipartHeader, data );
};
//sanmar sales End 
export const getSanmarSalesEndapi = (data) => {
 
    return apiFetchDotNet('newInventory/EndSanmarSale', "POST", multipartHeader, data );
};
//AutoMate SKU
export const getAutoMateSKUapi = (data) => {
 
    return apiFetchDotNet('newInventory/UploadAutoSKU', "POST", multipartHeader, data );
};
// SKU status update 
export const getSkuStatusUpdateapi = (data) => {
 
    return apiFetchDotNet('newInventory/skuStatusUpload', "POST", multipartHeader, data );
};
// sub sku status update 
export const getSubSkuStatusUpdateapi = (data) => {
 
    return apiFetchDotNet('newInventory/SubskuStatusUpload', "POST", multipartHeader, data );
};


//Report Data
export const getReportDataapi = (data) => {
 
    return apiFetchDotNet('newInventory/ReportUpload', "POST", multipartHeader, data );
};
//Setup Group Asin
export const getGroupAsinSetupapi = (data) => {
 
    return apiFetchDotNet('newInventory/Upload_GroupAsin', "POST", multipartHeader, data );
};
//Setup Group Asin
export const getGroupScrubsetSetupapi = (data) => {
 
    return apiFetchDotNet('newInventory/Upload_scrubsetAsin', "POST", multipartHeader, data );
};
//AutoMate Group
export const getAutoMateGroupapi = (data) => {
 
    return apiFetchDotNet('newInventory/UploadAutoGroup', "POST", multipartHeader, data );
};
//upload File Update Group
export const getUploadFileUpdateGroupapi = (data) => {

    return apiFetchDotNet('newInventory/UploadFileGroup', "POST", multipartHeader, data );
};
//upload File Update Ebay Inventory
export const getUploadFileUpdateEbayInventoryapi = (data) => {

    return apiFetchDotNet('newInventory/UploadEbayFile', "POST", multipartHeader, data );
};
//upload File Update Ebay Inventory
export const getEbayHtmlapi = (data) => {

    return apiFetchDotNet('newInventory/GETHTML', "POST", headerDotNetWithJwt, JSON.stringify( data ) );
};
// ============================= Inventory API end ======================================

// ============================= Shipping API Start ======================================
//Poly Bag fetch
// export const getFetchAddBagsapi = (data) => {

//     return apiFetchDotNet('Newshipping/Addbags', "POST", headerDotNetWithJwt, JSON.stringify( data ) );
// };
// ============================= Shipping API end ======================================

// ============================= Node API start ======================================

// export const loginAPI = (data) => {
//     return apiFetch('api/login/', "POST", header, JSON.stringify({ data }));
// };.

export const loginAPI = (data) => {
    return apiFetchDotNet('Users/login', "POST", header, JSON.stringify( data ));
};

export const logoutAPI = (data) => {
    return apiFetchDotNet('Users/logoutCRM', "POST", header, JSON.stringify( data ));
};


export const addTicketAPI = (data) => {
    return apiFetch('api/ticket/addTicket', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getTicketsAPI = (data) => {
    return apiFetch('api/ticket/getTickets', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const userRemindersOnStatus = (data) => {
    return apiFetch('api/ticket/userRemindersOnStatus', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getBagsAPI = (data) => {
    return apiFetch('api/shipping/getBags', "POST", headerWithWebToken, JSON.stringify({ data }));
};


export const addCommentAPI = (data) => {
    return apiFetch('api/ticket/addComment', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const addReminderAPI = (data) => {
    return apiFetch('api/ticket/addReminder', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getCommentsAPI = (data) => {
    return apiFetch('api/ticket/getComments', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const onStatusChangeAPI = (data) => {
    return apiFetch('api/ticket/onStatusChange', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getUserRemindersAPI = (data) => {
    return apiFetch('api/ticket/getUserReminders', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getDepartsAPI = (data) => {
    return apiFetch('api/ticket/getDeparts', "POST", header, JSON.stringify({ data }));
};

export const getTicketDetailAPI = (data) => {
    return apiFetch('api/ticket/getTicketDetail', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const reminderStatusChangeAPI = (data) => {
    return apiFetch('api/ticket/reminderStatusChange', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getCustomerDetailAPI = (data) => {
    return apiFetch('api/ticket/getCustomerDetail', "POST", headerWithWebToken, JSON.stringify({ data }));
};

// export const logoutAPI = (data) => {
//     return apiFetch('api/login/logout', "POST", header, JSON.stringify({ data }));
// };

export const TicketStatusChangeAPI = (data) => {
    return apiFetch('api/ticket/TicketStatusChange', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const insertDeviceToken = (data) => {
    return apiFetch('api/ticket/insertDeviceToken', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getAzabAPI = (data) => {
    // console.log(JSON.stringify({ data }))
    return apiFetch('api/azab/azabReport', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const CreateUser = (data) => {
    return apiFetch('api/user/create', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const downloadallmpreport = (data) => {
    return apiFetch('api/shipping/allmpreport', "POST", headerWithWebToken, JSON.stringify({}));
};

// export const getVendorName = (data) => {
//     return apiFetch('api/general/getVendorname', "POST", headerWithWebToken, JSON.stringify());
// };


export const insertPractice = () => {
    return apiFetch('api/azab/insertRecord', "POST", headerWithWebToken, JSON.stringify());
};

// image upload
export const uploadAttachment = (data) => {
    return (apiFetch(`api/ticket/imageUpload`, 'POST', header, data))
};

// export const getInventoryapi = (data) => {
//     return apiFetch('api/Inventory/getallvendor', "POST", headerWithWebToken, JSON.stringify({ data }));
// };

// export const getAllbrandapi = (data) => {
//     return apiFetch('api/Inventory/getallbrand', "POST", headerWithWebToken, JSON.stringify({ data }));
// };

// export const getAllcollectionapi = (data) => {
//     return apiFetch('api/Inventory/getallcollection', "POST", headerWithWebToken, JSON.stringify({ data }));
// };
// export const getAllcategorynameapi = (data) => {
//     return apiFetch('api/Inventory/getAllcategoryname', "POST", headerWithWebToken, JSON.stringify({ data }));
// };
// export const getAllpustatusapi = (data) => {
//     return apiFetch('api/Inventory/getAllpustatus', "POST", headerWithWebToken, JSON.stringify({ data }));
// };
// export const getInventoryapi = (data) => {
//     // console.log(JSON.parse(localStorage.getItem('user')).jwtToken)
//     return apiFetch('api/Inventory/getInventoryapi', "POST", headerWithWebToken, JSON.stringify({ data }));
// };

export const getAzabReportDetailapi = (data) => {

    return apiFetch('api/azab/getAzabReportDetailapi', "POST", headerWithWebToken, JSON.stringify({ data }));
};
// ============================= Node API end ======================================


// export const getTrackingInfo  = (data) => {

//============================= User Section ======================================

export const addNewUser = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Users/insertUser', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const getAllUserRecord = () => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Users/getAllUserRecord', "GET", headerDotNetWithJwt, JSON.stringify());
};


export const getNavigation = () => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Users/userManagementNav', "POST", headerDotNet, JSON.stringify());
};


export const saveAllUserRights = (data) => {
    //    // console.log("Hello World!")
    return apiFetchDotNet('/Users/saveUserRights', "POST", headerDotNet, JSON.stringify(data));
};


export const getUserRole = (data) => {
    return apiFetchDotNet('/Users/UserRole', "POST", headerDotNet, JSON.stringify(data));
}


export const getUserRights = (data) => {
    return apiFetchDotNet('/Users/UserRightsJson', "POST", headerDotNet, JSON.stringify(data));
}
export const getSideAndTopNavBar = (data) => {
    return apiFetchDotNet('/Users/SideAndTopNavBar', "POST", headerDotNetWithJwt, JSON.stringify(data));
}
export const insertSideNavandTopApi = (data) => {
    return apiFetchDotNet('/Users/AddTopandNav', "POST", headerDotNetWithJwt, JSON.stringify(data));
}
//De
export const apiDeleteNav = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Users/NavDelete', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//============================= User Section ======================================

//================================ Email CRM Api Start ===================================


export const chartAmazonData = (data) => {

    return apiFetchDotNet('Orders/OrdersREPORT', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
};
export const chartWalmartData = (data) => {
    return apiFetchDotNet('Orders/OrdersREPORTWallmart', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
};
export const chartJLCData = (data) => {
    return apiFetchDotNet('Orders/OrdersREPORTJLC', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
};
export const chartPUData = (data) => {
    return apiFetchDotNet('Orders/OrdersREPORTPU', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
};

export const chartSaleData = (data) => {
    return apiFetchDotNet('Orders/SalesReport', "POST", headerDotNetWithJwt, JSON.stringify({ data }));
};

export const chartTeamData = (data) => {
    return apiFetchDotNet('Orders/CRMReportS', "POST", headerDotNetWithJwt, JSON.stringify( data ));
};

export const chartVendorSalesData = (data) => {
    return apiFetchDotNet('Orders/VendorCRMReportS', "POST", headerDotNetWithJwt, JSON.stringify( data ));
};

export const chartSaleSummaryData = (data) => {
    return apiFetchDotNet('report/sale_summary', "POST", headerDotNetWithJwt, JSON.stringify( data ));
};

export const chartTargetSummaryData = (data) => {
    return apiFetchDotNet('report/Target_report', "POST", headerDotNetWithJwt, JSON.stringify( data ));
};

export const getUnshippedOrders = (data) => {
   
    return apiFetchDotNet('/Orders/po_item_received', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const getReturnPercentageReport = (data) => {
    
    return apiFetchDotNet('/report/Return_percentage_report', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiSummaryReportOrderWise = (data) => {
    
    return apiFetchDotNet('/report/summary_report_order_wise', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiSummaryReportItemWise = (data) => {
    
    return apiFetchDotNet('/report/summary_report_item_wise', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiSummaryReportPriceWise = (data) => {
    
    return apiFetchDotNet('/report/summary_report_price_wise', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apistyleNotMatched = (data) => {
    
    return apiFetchDotNet('/report/styleNotMatched', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiSummaryReportDetailWise = (data) => {
    
    return apiFetchDotNet('/report/sale_reportUT', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiReportOrderWise = (data) => {
    
    return apiFetchDotNet('/report/PNL_Order_wise', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const apiReportItemWise = (data) => {
    
    return apiFetchDotNet('/report/PNL_Item_wise', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiSummaryPNLItemwise = (data) => {
    
    return apiFetchDotNet('/report/Summary_PNL_Item_wise', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiReportOrderWiseWeb = (data) => {
    
    return apiFetchDotNet('/report/PNL_Order_wiseWeb', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const apiReportItemWiseWeb = (data) => {
    
    return apiFetchDotNet('/report/PNL_Item_wiseWeb', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiReportOrderWiseMP = (data) => {
    
    return apiFetchDotNet('/report/PNL_Order_wiseMP', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const apiReportItemWiseMP = (data) => {
    
    return apiFetchDotNet('/report/PNL_Item_wiseMP', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const getGoogleMarketPlaceVerifyapi = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/newInventory/fetchGoogleMarketplaceVerifyapi', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const getGoogleMarketplaceNotVerifyUploadapi = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/newInventory/GoogleMarketplaceNotVerifyUpload', "POST", multipartHeader, data);
};

export const apiWalmartGetSingleOrder = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/walmart/singleOrderGet', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const apiWalmartGetOrder = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/walmart/ordersGetapi', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const apiWalmartGetUSAOrderSheetUpload = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/walmart/UploadForOrders', "POST", multipartHeader, data);
};

export const apiWalmartGetUSAOrderSheetMethod = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/walmart/ordersGet', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const apiWalmartGetCanadaOrderSheetUpload = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/walmart/UploadForOrders_Canada', "POST", multipartHeader, data);
};
export const apiWalmartGetCanadaOrderSheetMethod = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/walmart/ordersGet_canada', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const getOrderSearsApi = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/update/Ordersears', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Add Size Chart
export const apiAddSizeChart = (data) => {
    return apiFetchDotNet('/Report/sizechart', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Update Size Chart
export const apiUpdateSizeChart = (data) => {
    return apiFetchDotNet('/Report/UpdateSizeChart', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//view Size Chart List
export const apiViewSizeChart = (data) => {
    return apiFetchDotNet('/Report/ViewSizechart', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//view Size Chart Update
export const apiViewSizeChartUpdate = (data) => {
    return apiFetchDotNet('/Report/ViewSizeChartUpdate', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Rma qty single
export const apiRMAQtySingle = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/RmaQty_single', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//Rma qty year
export const apiRMAQtyYear = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/RmaQty_year', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//Replacment Amazon Order
export const apiReplacmentQty = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/ReplacmentQty', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

export const apiAmazonFBAGetOrderSheetUpload = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Update/AmazonFBAUploadForOrders', "POST", multipartHeader, data);
};

export const apiAmazonFBAGetOrderSheet = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Update/AmazonFBAOrderbySheet', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
export const apiShipAll = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Edit/shipall', "POST", headerDotNetWithJwt, JSON.stringify(data));
};
//RMA PNL 

//Rma Order Summary
export const apiOrderRMASummary = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/OrderRMASummary', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//Rma Item Summary
export const apiItemRMASummary= (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/ItemRMASummary', "POST", headerDotNetWithJwt, JSON.stringify(data));
};


//Rma Order Detail
export const apiOrderRMADetail = (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/OrderRMADetail', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

//Rma Item Detail
export const apiItemRMADetail= (data) => {
    // console.log("Hello World!")
    return apiFetchDotNet('/Report/ItemRMADetail', "POST", headerDotNetWithJwt, JSON.stringify(data));
};

// UploadForOrders_Canada

// Verify vr = new Verify();
// string status = vr.GetName1();

//         if (status == "Valid")
//         {

// }
// else
// {
//     var response1 = Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Token");
//     return response1;
// }
