import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Tabs, Form, Table, Upload, Row, Col, DatePicker, Checkbox, Image, notification } from 'antd';
import { Button, BtnGroup } from '../../../components/buttons/buttons';
import { Drawer } from '../../../components/drawer/drawer';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../components/utilities/utilities'
import { useDispatch, useSelector } from 'react-redux';
// import { Checkbox } from '../../../components/checkbox/checkbox';
import { Main, DatePickerWrapper } from '../../styled';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DateRangePickerOne, CustomDateRange } from '../../../components/datePicker/datePicker';
import { inTransitsTrackingInsert, inTransitsTrackingData } from '../../../redux/apis/DataAction';
import InTransitTrackingData from './InTransitTrckingoverview/InTransitTrackingData'
import InTransittrackingInsert from './InTransitTrckingoverview/InTransittrackingInsert'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

let sellerList = []
const ShippingReportsView = (props) => {
    return (
        <>
       <InTransitTrackingData/>
       <InTransittrackingInsert/>
        </>
    );
};

export default ShippingReportsView;
