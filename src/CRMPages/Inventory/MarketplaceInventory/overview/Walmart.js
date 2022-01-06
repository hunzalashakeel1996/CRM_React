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


import Column from '../../../../components/Marketplace/Column'
import FilterReport from '../../../../components/Marketplace/FilterReport'
import Promotions from '../../../../components/Marketplace/Promotions'
import Priceupdate from '../../../../components/Marketplace/Priceupdate'

const Walmart = (props) => {
    const { genrateFeed, genrateFilter, vendornameState, brandnameState, collectionState, categorynameState, Type, puStatusState } = props

    const WalmartColumn =['WALLMARTSTATUS', 'WALLMARTPRICE','WalmartReviewpages','WalmartSKULink' ]
    const columnDropdown = ['ADD WALMART INVENTORY', 'Walmart PRICE TEMPLATE', 'ALL', 'OTHER']
    const isSeller = "Walmart"
    const WalmartPU = "WalmartUSA"
    
    return (
        <>
           

          
            <div style={{ marginTop: 10 }}>
                <Row  >

                    <Col span={24} >
                     <FilterReport title={'Walmart'} genrateFilter={ genrateFilter} vendornameState={vendornameState}brandnameState={brandnameState} categorynameState={categorynameState}collectionState={collectionState} puStatusState={puStatusState} Type={Type} />
                         </Col>
                    <Col span={24} style={{ marginTop:20 }}>
                        <Column genrateFeed={(col, val) => { genrateFeed(WalmartPU, col, isSeller, val) }} additionalColumns={WalmartColumn} columnDropdown={columnDropdown} />
                    </Col>

                </Row>

            </div>

        </>
    )
}


export default Walmart;