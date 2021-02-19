import io from "socket.io-client";
import { url, audioPlay } from './../apis/DataAction';
// const WebSocket = require('ws');
import {addTicket, addComment, addReminder } from '../ticket/actionCreator'

export const connectSocket = (userId, dispatchFunc) => {
  
  return (dispatch, getState) => {
    // !getState().socket.socket.connected
    let ws = getState().socket.socket

    if (getState().socket.socket == null) {
      // ws = new WebSocket("wss://pu-crm-backend-develop.herokuapp.com")
      ws = new WebSocket("wss://18.222.232.23:3000")
      console.log('websocket obejct', ws)
    }

    function heartbeat() {
      if (!ws) return;
      if (ws.readyState !== 1) return;
      ws.send(JSON.stringify({type: "heartbeat"}));
      setTimeout(heartbeat, 15000);
    }

    ws.onopen = () => {
      console.log('connected');
      ws.send(JSON.stringify({type: 'join room', id: userId}))
      dispatch(initializeConnectSocket(ws))
      heartbeat();
    };

    ws.onclose = () => {
      console.log('disconnected');
      dispatch(initializeConnectSocket(null))

    };

    ws.onerror = (err) => {
      console.error('Socket encountered error: ', err, '. Trying to connect again...');
      dispatch(initializeConnectSocket(null))
      setTimeout(function () {
        ws = null;
        connectSocket(); //if error occured, reconnect websocket and fill websocket variable with new instance
      }, 1500);
    }

    ws.onmessage = (data) => {
      let message = JSON.parse(data.data)
      // when recieve broactMessage socket 
      if(message.reason === 'newTicket'){
        audioPlay() //
        dispatch(addTicket(message.data))
      }
      // // when recieve roomMessage socket 
      // else if(message.reason === 'newComment'){
      //   dispatch(addComment(message.data))
      // }
      // else if(message.reason === 'newReminder'){
      //   dispatch(addReminder(message.data))
      // }
    }



    // if (getState().socket.socket === null ? true : false) {
    //   const socket = io(`ws://192.168.0.180:3000`, {
    //     transports: ['websocket'],
    //     jsonp: false
    //   });

    //   console.log('bbbb', getState().socket.socket)

    //   socket.on('connect', () => {
    //     socket.emit("testSocket", { id: userId })
    //     console.log('connection success')
    //     socket.on('disconnect', () => {
    //     });
    //   })

    //   dispatch(initializeConnectSocket(socket))

    // } else {
    //   getState().socket.socket.emit("testSocket", { id: userId })
    //   console.log("sockeeeeeeety", getState().socket.socket)
    // }

  }
};

export const initializeConnectSocket = (socket) => {
  return {
    type: 'CONNECT_SOCKET',
    socket
  }
};

export const socketClose = () => {
  return {
    type: 'CLOSE_SOCKET'
  }
};

