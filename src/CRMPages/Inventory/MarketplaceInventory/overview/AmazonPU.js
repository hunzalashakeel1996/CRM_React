import { Col, Row, Select, Spin, Radio, Checkbox, Divider } from 'antd';
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
import { webURL, audioPlay, uploadUrl, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi, getInventoryapi } from '../../../../redux/apis/DataAction';

import Column from '../../../../components/Marketplace/Column'
import FilterReport from '../../../../components/Marketplace/FilterReport'
import Promotions from '../../../../components/Marketplace/Promotions'
import Priceupdate from '../../../../components/Marketplace/Priceupdate'

const AmazonPU = (props) => {

    const { genrateFeed, genrateFilter, vendornameState, brandnameState, collectionState, categorynameState, Type, puStatusState } = props
  //  console.log('vendornameState',vendornameState)
    const amazonPUcolumn = ['PU_PRICE', 'deliveryinfo', 'PUSTATUS', 'ISPU', 'ASINS', 'IsAutomated_PU']

    const columnDropdown = ['ADD AMAZON INVENTORY', 'ALL', 'OTHER']

    const amazonPU = "PU"
    const isSeller = "Sears"
    return (
        <>
          

           
            <div style={{ marginTop: 10 }}>
                <Row >

                    <Col span={24} >
                      
                                <FilterReport genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState}
                                    puStatusState={puStatusState} Type={Type} title={'Amazon PU'}/>
                        
                      
                        

                    </Col>
                    <Col span={24} style={{ marginTop:20 }}>

                        <Column genrateFeed={(col, val) => { genrateFeed(amazonPU, col, isSeller, val) }} additionalColumns={amazonPUcolumn} columnDropdown={columnDropdown} />
                    </Col>

                </Row>

            </div>

        </>
    )
}


export default AmazonPU;