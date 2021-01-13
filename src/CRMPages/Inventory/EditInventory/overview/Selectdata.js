import { Col, Row,  Spin,  Card,Input   } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../style';
import { Main } from '../../../styled';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../components/autoComplete/autoComplete';
import { Button } from '../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { addCommentAPI, addTicketAPI, getTicketsAPI, webURL, audioPlay, uploadUrl, getVendorapi } from '../../../../redux/apis/DataAction';
import PropTypes from 'prop-types';

const { TextArea } = Input;
const Selectdata=()=>
{
return (
<>
<Row>
    <Col span={4}style={{marginLeft:20}}>
    <TextArea   />
    </Col>
    <Col span={1} offset={1} >
    <Button type="primary">Search</Button>
 
    </Col>
    <Col span={1}offset={1}  >
   
    <Button type="primary">Download</Button>
    </Col>
    </Row>
</>

)

}


export default Selectdata; 