import actions from '../authentication/actions';
import sound from '../../static/sounds/notificationBeep.wav'
import { useSelector } from 'react-redux';


export const webURL = `http://localhost:3001`
// export const webURL = "http://mergemtvw.herokuapp.com";

export const url = "http://192.168.0.198:3005";
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
    let headerParameters = apiMethod === 'GET' ? { method: apiMethod} : {method: apiMethod,headers: apiHeader,body: apiBody}
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




// ============================= API start ======================================

// ============================= Inventory API start ======================================
export const feed_report = (data) => {
    return apiFetchDotNet('Report/feed_report', "POST", headerDotNet, JSON.stringify({ data }));
};
export const getvendor = (data) => {
    return apiFetchDotNet('newInventory/getVendor_active', "GET");
};

export const getUpdateVendorInventoryapi = (data) => {

    return apiFetchDotNet('newInventory/updateVendorInventory', "POST", headerDotNet, JSON.stringify({ data }));
};

export const getInventoryapi = (data) => {
  
    return apiFetchDotNet('newInventory/fetchInventoryapi', "POST", headerDotNet,JSON.stringify({ data }));
};
export const getAllVendorapi = (data) => {
    return apiFetchDotNet('newInventory/getvendor', "GET");
};
export const getAllbrandapi = (data) => {
    return apiFetchDotNet('newInventory/getBrand', "GET");
};
export const getAllcollectionapi = (data) => {
    return apiFetchDotNet('newInventory/getCollection', "GET");
};
export const getAllcategorynameapi = (data) => {
    return apiFetchDotNet('newInventory/getcategoryname', "GET");
};
export const getAllpustatusapi = (data) => {
    return apiFetchDotNet('newInventory/getpustatus', "GET");
};
export const getInventoryWalmartapi = (data) => {
    return apiFetchDotNet('newInventory/WallMartqty', "POST", headerDotNet,JSON.stringify({ data }));
};
export const getUpdateInventoryapi = (data) => {
    console.log('dataaction',data)
    return apiFetchDotNet('Edit/Editinventory', "POST", headerDotNet,JSON.stringify( data ));
};
// ============================= Inventory API end ======================================

// ============================= Node API start ======================================

export const loginAPI = (data) => {
    return apiFetch('api/login/', "POST", header, JSON.stringify({ data }));
};

export const addTicketAPI = (data) => {
    return apiFetch('api/ticket/addTicket', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getTicketsAPI = (data) => {
    return apiFetch('api/ticket/getTickets', "POST", headerWithWebToken, JSON.stringify({ data }));
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

export const logoutAPI = (data) => {
    return apiFetch('api/login/logout', "POST", header, JSON.stringify({ data }));
};

export const TicketStatusChangeAPI = (data) => {
    return apiFetch('api/ticket/TicketStatusChange', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getAzabAPI = (data) => {
    console.log(JSON.stringify({ data }))
    return apiFetch('api/azab/azabReport', "POST", headerWithWebToken, JSON.stringify({ data }));
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
//     console.log(JSON.parse(localStorage.getItem('user')).jwtToken)
//     return apiFetch('api/Inventory/getInventoryapi', "POST", headerWithWebToken, JSON.stringify({ data }));
// };

export const getAzabReportDetailapi = (data) => {

    return apiFetch('api/azab/getAzabReportDetailapi', "POST", headerWithWebToken, JSON.stringify({ data }));
};
// ============================= Node API end ======================================


// export const getTrackingInfo  = (data) => {

//     return apiTrackinginfoFetch('http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID="622PULSE3418"><TrackID ID="9405516902840439853322"></TrackID></TrackRequest>', "GET");
// };

