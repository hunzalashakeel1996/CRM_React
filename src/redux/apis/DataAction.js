import actions from '../authentication/actions';
import sound from '../../static/sounds/notificationBeep.wav'
import { useSelector } from 'react-redux';


//export const webURL = `http://localhost:3001`
// export const webURL = "http://mergemtvw.herokuapp.com";

export const url = "http://192.168.0.115:3000";
export const urlDotNet ="http://localhost:47463/api"
// export const url = "https://crmserver-development.herokuapp.com";

export const uploadUrl = "https://images.vanwala.pk";

const { uiStartLoading, uiStopLoading } = actions;


let headerWithWebToken = {
    Accept: "application/json",
    "Content-Type": "application/json",
    'Cache-Control': 'no-cache',
    "jsonwebtoken": localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).jwtToken : null
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
    console.log('inside 123')
    localStorage.getItem('user')
    localStorage.getItem('user').then((val) => {
        headerWithWebToken = {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Cache-Control': 'no-cache',
            "jsonwebtoken": val.jwtKey
        }
    })
}

export const audioPlay = () => {
    let audio = new Audio(sound).play()
    audio.then(() => {
        console.log('suiccess')
    }).catch(err => {
        console.log('err', err)
    })
}

export const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
}

const multipartHeader = {
    Accept: 'application/json',
    // "Content-Type": "multipart/form-data",
}
const headerDotNet = {
    "Content-Type": "application/json"
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
                .catch(err => {  return saveErrorLog(err, `http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID="622PULSE3418"><TrackID ID=${JSON.stringify(data.trackingNO)} ></TrackID></TrackRequest>`) })
        });
    }
};

export const apiFetchDotNet = (apiUrl, apiMethod, apiHeader, apiBody) => {
    console.log(apiHeader)
    let headerParameters = apiMethod === 'GET' ? { method: apiMethod} :
     {method: apiMethod,headers: apiHeader,body: apiBody}
    return dispatch => {
        return new Promise((resolve, reject) => {
           fetch(`${urlDotNet}/${apiUrl}`, headerParameters)
                .then(res => {
                    // console.log('1', res)
                    return res.json()
                })
                .then(resJson => {
                    // console.log('2', resJson)
                    if (resJson) {
                        resolve(resJson);
                    }
                })
                .catch(err => { return saveErrorLog(err, apiUrl) })
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
}



// ============================= REPORT API start ======================================

export const getBalanceSheetRecord = () => {
    console.log('abcd')
    return apiFetchDotNet('Report/balance_sheet_view', "POST", headerDotNet, JSON.stringify({  }));
};
export const getBalanceSheetRecordOnClick = (data) => {
    return apiFetchDotNet('Report/balance_sheet', "POST", headerDotNet, JSON.stringify({ ...data  }));
};

export const getBalanceSheetRecord2 = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/balance_sheet_view', "POST", headerDotNet, JSON.stringify({ data }));
};

export const getFeedBackRecordOnClick = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/feed_report', "POST", headerDotNet, JSON.stringify({ ...data }));
};
export const getReturnRecordOnClick = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/Check_Return_report', "POST", headerDotNet, JSON.stringify({ ...data }));
};
export const getVendorTrackingRecordOnClick = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/Vendor_Tracking_with_Shiping_Price', "POST", headerDotNet, JSON.stringify({ ...data }));
};


export const getCheckReleaseOrdersRecordOnClick = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/Check_Released_Order', "POST", headerDotNet, JSON.stringify({ ...data }));
};

export const getOrderTrackingRecordOnClick = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/ordertrackingstatus', "POST", headerDotNet, JSON.stringify({ ...data }));
};

export const getPOitemReceivedRecordOnClick = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/PurchasedOrders', "POST", headerDotNet, JSON.stringify({ ...data }));
};

export const orderDownloadReport = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/order_download_report', "POST", headerDotNet, JSON.stringify({ ...data }));
};

export const saleSummaryReport = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/summary_report', "POST", headerDotNet, JSON.stringify({ ...data }));
};

export const comparisonReport = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/Comparison_report', "POST", headerDotNet, JSON.stringify({ ...data }));
};

export const topSellingStyleCodes = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/Top_Selling_Report', "POST", headerDotNet, JSON.stringify({ ...data }));
};

export const purchaseReport = (data) => {
    // console.log('abcd')
    return apiFetchDotNet('Report/purchase_report', "POST", headerDotNet, JSON.stringify({ ...data }));
};
// ============================= REPORT API end ======================================


// ============================= API start ======================================

export const loginAPI = (data) => {
    return apiFetch('api/login/', "POST", header, JSON.stringify({data}));
};

export const addTicketAPI = (data) => {
    return apiFetch('api/ticket/addTicket', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getTicketsAPI = (data) => {
    return apiFetch('api/ticket/getTickets', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const addCommentAPI = (data) => {
    return apiFetch('api/ticket/addComment', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const addReminderAPI = (data) => {
    return apiFetch('api/ticket/addReminder', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const getCommentsAPI = (data) => {
    return apiFetch('api/ticket/getComments', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const onStatusChangeAPI = (data) => {
    return apiFetch('api/ticket/onStatusChange', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const getUserRemindersAPI = (data) => {
    return apiFetch('api/ticket/getUserReminders', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const getDepartsAPI = (data) => {
    return apiFetch('api/ticket/getDeparts', "POST", header, JSON.stringify({data}));
};

export const getTicketDetailAPI = (data) => {
    return apiFetch('api/ticket/getTicketDetail', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const reminderStatusChangeAPI = (data) => {
    return apiFetch('api/ticket/reminderStatusChange', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const getCustomerDetailAPI = (data) => {
    return apiFetch('api/ticket/getCustomerDetail', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const logoutAPI = (data) => {
    return apiFetch('api/login/logout', "POST", header, JSON.stringify({data}));
};

export const TicketStatusChangeAPI = (data) => {
    return apiFetch('api/ticket/TicketStatusChange', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const getAzabAPI = (data) => {
    return apiFetch('api/azab/azabReport', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const getVendorName = (data) => {
    return apiFetch('api/general/getVendorname', "POST", headerWithWebToken, JSON.stringify());
};


export const insertPractice = () => {
    return apiFetch('api/azab/insertRecord', "POST", headerWithWebToken, JSON.stringify());
};

// image upload
export const uploadAttachment = (data) => {
    return (apiFetch(`api/ticket/imageUpload`, 'POST',header, data))
};






