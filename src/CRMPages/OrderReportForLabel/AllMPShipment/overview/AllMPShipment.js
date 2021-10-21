import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import { Row, Col, Icon, Form, Input, Select, DatePicker, InputNumber, Table, Space, notification, Tabs, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { downloadFile } from '../../../../components/utilities/utilities'
import { getAllMPShipments } from '../../../../redux/apis/DataAction';
import './style.css';




const { TabPane } = Tabs;
const { TextArea } = Input;


const AllMPShipment = () => {



    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const [state, setState] = useState({

        isLoader: false

    });

    const {isLoader} = state


    const AllMPShipments = () => {
        
        setState({ ...state, isLoader: true })

        dispatch(getAllMPShipments()).then(data => {

            downloadFile(data)

            setState({ ...state, isLoader: false })

        })
    }


    return (

        <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.isLoader} >
            <Cards title="All MP Shipment">
                <Button size="large" type="success" onClick={AllMPShipments}  > Download</Button>
            </Cards>
        </Spin>
    );

};

export default AllMPShipment
