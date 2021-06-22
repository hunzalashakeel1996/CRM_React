import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input,Form, Tabs, Table, Upload, Row, Col,Modal,notification } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { endiciaRefundLabel,checkEndiciaRefundLabel } from '../../../redux/apis/DataAction';
import CheckRefundLabels from './EndiciaRefundoverview/CheckRefundLabels';
import RefundLabel from './EndiciaRefundoverview/RefundLabel';
const { TabPane } = Tabs;
const { TextArea } = Input;

const EndiciaShipmentView = (props) => {
 
    return (
        <>
           
            {/* Check Labels Here Div  */}
           
               <RefundLabel/>
            
               <CheckRefundLabels/>
           
            



      

        </>
    );
};

export default EndiciaShipmentView;
