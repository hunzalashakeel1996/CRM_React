import { Table, Input, Upload, message, Popconfirm, Tabs, Form, Col, Row, Select, Spin, Radio, Checkbox, Divider, Modal, notification } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ProjectHeader, ProjectSorting } from '../../style';
import { UploadOutlined } from '@ant-design/icons';
import { Main } from '../../../../styled';
import { PageHeader } from '../../../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../../../components/autoComplete/autoComplete';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { downloadFile } from '../../../../../components/utilities/utilities'
import { Button } from '../../../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";






const EbayHtml = (props) => {
  
    const {state}=props
    const {EbayHtml}=state
    return (
        <>
          

        </>
    )

}
// ReactDOM.render(<EditableTable />, mountNode);


export default EbayHtml;