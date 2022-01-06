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
import { webURL, audioPlay, uploadUrl, getAllVendorapi, getAllbrandapi, getAllcollectionapi, getAllcategorynameapi, getAllpustatusapi } from '../../../../redux/apis/DataAction';

import Column from '../../../../components/Marketplace/Column'
import FilterReport from '../../../../components/Marketplace/FilterReport'
import Promotions from '../../../../components/Marketplace/Promotions'
import Priceupdate from '../../../../components/Marketplace/Priceupdate'

const AmazonUAE = (props) => {
    const { genrateFeed, genrateFilter, vendornameState, brandnameState, collectionState, categorynameState, Type, puStatusState } = props

    const amazonUaeColumn =['amazon_UE_price', 'amazon_UE_status','amazon_UE_deliveryinfo','AmazonReviewpages' ]
    const columnDropdown = ['ADD AMAZON INVENTORY', 'ALL', 'OTHER']
    const amazonUae = "Uae"
    const isSeller = "Amazon"
    return (
        <>
           


         
            <div style={{ marginTop: 10 }}>
                <Row  >

                    <Col span={24} >
                       
                                <FilterReport title={'Amazon UAE'} genrateFilter={ genrateFilter} vendornameState={vendornameState}brandnameState={brandnameState} categorynameState={categorynameState}collectionState={collectionState} puStatusState={puStatusState} Type={Type} />
                           
                       

                    </Col>
                    <Col span={24} style={{ marginTop:20 }}>
                        <Column genrateFeed={ (col,val) =>genrateFeed(amazonUae, col, isSeller, val)} additionalColumns={amazonUaeColumn} columnDropdown={columnDropdown}/>
                    </Col>

                </Row>

            </div>

        </>
    )
}


export default AmazonUAE;