import { Col, Row, Select, Spin, Radio,Checkbox, Divider  } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from './style';
import { Main } from '../../styled';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
 import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, uploadUrl} from '../../../redux/apis/DataAction';
import Selectdata from './overview/Selectdata';
import Viewdata from './overview/Viewdata';
//const updateVendorInventory = lazy(() => import('./overview/updateVendorInventory'));


const ViewPUUpdateInventory = (props) => {
 
 


    return (
        <>
            <ProjectHeader>
                <PageHeader
                    ghost
                    title="PU Edit Inventory"
                />
           
            </ProjectHeader>
            <div>
            <Row>
                <Col span={24}>
           <Selectdata/>
           </Col>
           </Row>
           <Row>
                <Col span={24}>
           <Viewdata/>
           </Col>
           </Row>
           </div>
        </>
    )
}


export default ViewPUUpdateInventory;