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

import ColumnGroup from '../../../../components/Marketplace/ColumnGroup'
import FilterReportGroup from '../../../../components/Marketplace/FilterReportGroup'
import Promotions from '../../../../components/Marketplace/Promotions'
import Priceupdate from '../../../../components/Marketplace/Priceupdate'

const AmazonPU = (props) => {

    const { genrateFeed, genrateFilter, vendornameState, brandnameState, collectionState, categorynameState, Type, puStatusState,itemType } = props
  //  console.log('vendornameState',vendornameState)
    const amazonPUcolumn = ['su.PRICE', 'su.deliveryinfo', 'STATUS', 'ISPU', 'su.ASIN', 'SU.IsAutomated_PU']

    const amazonPU = "PU"
    const isAmazonProcedure = true
    return (
        <>
          

           
            <div style={{ marginTop: 10 }}>
                <Row >

                    <Col span={24} >
                      
                                <FilterReportGroup genrateFilter={genrateFilter} vendornameState={vendornameState} brandnameState={brandnameState} categorynameState={categorynameState} collectionState={collectionState}
                                    puStatusState={puStatusState} Type={Type}  itemType={itemType} title={'Amazon PU'} />
                        
                      
                        

                    </Col>
                    <Col span={24} style={{ marginTop:20 }}>

                        <ColumnGroup genrateFeed={(col, val) => { genrateFeed(amazonPU, col, isAmazonProcedure, val) }} additionalColumns={amazonPUcolumn} />
                    </Col>

                </Row>

            </div>

        </>
    )
}


export default AmazonPU;