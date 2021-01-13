import { Col, Row,  Spin   } from 'antd';
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
import Regularsku from './overview/Regularsku'
import Groupsku from './overview/Groupsku'
 import { webURL, audioPlay, uploadUrl,getVendorapi } from '../../../redux/apis/DataAction';
 
//const updateVendorInventory = lazy(() => import('./overview/updateVendorInventory'));

const ViewVendorinventory = () => {
    const dispatch = useDispatch();
    const [Regularvendorstate,setstateRegularvendor] = useState([])
    
  
    useEffect (()=>{
        dispatch(getVendorapi()).then(data=>{
            setstateRegularvendor(data)
            console.log(data)
        })
    },[])

    function callback(key) {
        console.log(key);
      }
    return (
        <>
            <ProjectHeader>
                <PageHeader
                    ghost
                    title="Vendor Inventory"
                />           
            </ProjectHeader>
            <div>
            <Regularsku Regularvendor={Regularvendorstate}/>
            </div>
            <div>
            <Groupsku/>
            </div>
        
        </>
    )
}


export default ViewVendorinventory;