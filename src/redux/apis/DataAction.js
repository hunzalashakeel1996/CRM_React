import actions from '../authentication/actions';
import sound from '../../static/sounds/notificationBeep.wav'
import {  useSelector } from 'react-redux';
import { Button, notification, Space } from 'antd';


// export const webURL = `http://localhost:3001`
export const webURL = "http://mergemtvw.herokuapp.com";

// export const url = "http://192.168.4.109:3000";
export const url = "crm.rizno.com";

// export const url = "http://192.168.4.104:3000";
// export const url = "https://pu-crm-backend-develop.herokuapp.com";
// export const url = "http://beu4uojtuot0pa:ikjkj3q9hmd8rmka5i9biap7hb2my@us-east-static-06.quotaguard.com:9293";

export const uploadUrl = "https://images.vanwala.pk";

const { uiStartLoading, uiStopLoading  } = actions;


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

// const getJwt = () => {
//     localStorage.getItem('jwt')
//         .then(jwt => {
//             return jwt
//         })
// }

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
    // "jsonwebtoken": user.jwtKey
    // 'Cache-Control': 'no-cache',
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "*",
}

// let setHeaderWithWebToken = () => {
//     localStorage.getItem('jwt').then((val) => {
//         headerWithWebToken = {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             'Cache-Control': 'no-cache',
//             "jsonwebtoken": val
//         }
//     })
// }

const multipartHeader = {
    Accept: 'application/json',
    // "Content-Type": "multipart/form-data",
}

// const multipartHeaderWithJWT = localStorage.getItem('jwt').then(val => {
//     return {
//         Accept: 'application/json',
//         "Content-Type": "multipart/form-data",
//         "jsonwebtoken": val
//     }
// })

export const apiFetch = (apiUrl, apiMethod, apiHeader, apiBody, isImage = false) => {
    console.log('header', apiHeader)
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(uiStartLoading());
            fetch(`${isImage ? uploadUrl: url}/${apiUrl}`, {
                method: apiMethod,
            headers: apiHeader,
            body: apiBody
        })
            .then(res => {
                console.log('122222', res)
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
    notification['error']({
        message: 'Sorry',
        description:
          'Error from server side',
      });
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

// image upload
export const uploadAttachment = (data) => {
    return (apiFetch(`api/ticket/imageUpload`, 'POST',header, data))
};



