import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Input, Select, Tabs, Table, Upload, Row, Col, Switch, Checkbox, Collapse, Spin, notification } from 'antd';
import { Button, BtnGroup } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Drawer } from '../../components/drawer/drawer';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { getSideAndTopNavBar, insertSideNavandTop } from '../../redux/apis/DataAction';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import startOfYesterday from 'date-fns/startOfYesterday';
import e from 'cors';


const DeleteNavigationTab = (props) => {

    return (
<>
</>
    )

}

export default DeleteNavigationTab