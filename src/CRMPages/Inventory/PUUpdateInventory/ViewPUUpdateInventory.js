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
 import { webURL, audioPlay, uploadUrl,  getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi } from '../../../redux/apis/DataAction';
 import VendorFront_status from './overview/VendorFront_status'
 import Column from './overview/Column'
 import FilterReport from './overview/FilterReport'
 import Promotions from './overview/Promotions'
 import Priceupdate from './overview/Priceupdate'
//const updateVendorInventory = lazy(() => import('./overview/updateVendorInventory'));

const vendorfilter =[];
const brandfilter =[];
const categoryfilter =[];
const collectionfilter =[];
const Typefilter ="";
const pustatusfilter ="";
const stylecodefilter ="";

const Type = ['All', 'Inhouse'];
const Vendornameplain = [];
const Brandnameplain = [];
const Collectionplain = [];
const Catrgoryplain = [];
const PUStatusplain = [];


let myObj = {
     vendorfilter :[],
 brandfilter :[],
 categoryfilter :[],
 collectionfilter :[],
 Typefilter :"",
 pustatusfilter :"",
 stylecodefilter :"",
   
    
  };
const ViewPUUpdateInventory = (props) => {
    const dispatch = useDispatch();
    
    const [Vendornamestate, setstateVendorname] = useState([]);
    const [Brandnamestate, setstateBrandname] = useState([]);
    const [Collectionstate, setstatecollection] = useState([]);
    const [categorynamestate, setstatecategoryname] = useState([]);
    const [puStatusstate, setstatepuStatus] = useState([]);

    useEffect(() => {
        //vendor
        dispatch(getAllVendorapi()).then(data => {
         
            setstateVendorname(data);
        })
        //brand
        
        dispatch(getAllbrandapi()).then(data => {
          

            setstateBrandname(data);
        })
        //collection
        dispatch(getAllcollectionapi()).then(data => {
          

            setstatecollection(data);
        })
        //category
        dispatch(getAllcategorynameapi()).then(data => {
         
            setstatecategoryname(data);
        })
        //pustatus
        dispatch(getAllpustatusapi()).then(data => {
            
            setstatepuStatus(data);
        })
    }, [])

   
    const GenrateFeed = (a) => {

        console.log('column', a)
      };
      const Genratefilter = (obj, e, isArray) => {
          if(isArray)
            myObj[obj] = [...e]
        else 
        {
            console.log(e)
            myObj[obj] = e
        }
        console.log('myObj', myObj)
      };
     
      
    return (
        <>
            <ProjectHeader>
                <PageHeader
                    ghost
                    title="PU Update Inventory"
                />
           
            </ProjectHeader>
            <hr/>
            <div>
            <VendorFront_status />
            </div>
            <hr/>
            <div style={{marginTop:10}}>
            <Row span={24} >

            <Col span={20} >
            <Row spane={20}>
            <Col span={20}>
            <FilterReport Genratefilter={ Genratefilter} Vendornamestate={Vendornamestate}Brandnamestate={Brandnamestate} categorynamestate={categorynamestate}Collectionstate={Collectionstate} puStatusstate={puStatusstate} Type={Type} />
            </Col>

            </Row>
            <Row >
            <Col span={20}>
            <Promotions/>
            </Col>

            </Row>
            <Row >
            <Col span={20}>
            <Priceupdate/>
            </Col>

            </Row>

            </Col>
            <Col span={4}>
            <Column GenrateFeed={ (val) =>GenrateFeed(val)} />
            </Col>
          
            </Row>
          
            </div>
        
        </>
    )
}


export default ViewPUUpdateInventory;