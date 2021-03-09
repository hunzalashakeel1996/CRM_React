import actions from '../authentication/actions';
import sound from '../../static/sounds/notificationBeep.wav'
import { useSelector } from 'react-redux';


//export const webURL = `http://localhost:3001`
// export const webURL = "http://mergemtvw.herokuapp.com";

export const url = "http://192.168.0.198:3005";
//export const urlDotNet ="http://localhost:47463/api"
export const urlDotNet ="http://74.208.31.179:8520/crm.inv_2.1/api"

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

// ============================= Shipping API start ======================================
export const feed_report = (data) => {
    return apiFetchDotNet('Report/feed_report', "POST", headerDotNet, JSON.stringify({ data }));
};
export const getBrand = (data) => {
    return apiFetchDotNet('update/getvendor', "GET");
};
export const getPolyBags = (data) => {
    return apiFetchDotNet('/Report/Addbags', "POST", headerDotNet, JSON.stringify({  }));
};
// ============================= Shipping API end ======================================



export const loginAPI = (data) => {
    return apiFetch('api/login/', "POST", header, JSON.stringify({data}));
};

export const addTicketAPI = (data) => {
    return apiFetch('api/ticket/addTicket', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getTicketsAPI = (data) => {
    return apiFetch('api/ticket/getTickets', "POST", headerWithWebToken, JSON.stringify({ data }));
};

export const getBagsAPI = (data) => {
    return apiFetch('api/shipping/getBags', "POST", headerWithWebToken, JSON.stringify({ data }));
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

export const CreateUser = (data) => {
    return apiFetch('api/user/create', "POST", headerWithWebToken, JSON.stringify({data}));
};

export const downloadallmpreport = (data) => {
    return apiFetch('api/shipping/allmpreport', "POST", headerWithWebToken, JSON.stringify({}));
};


// image upload
export const uploadAttachment = (data) => {
    return (apiFetch(`api/ticket/imageUpload`, 'POST',header, data))
};



