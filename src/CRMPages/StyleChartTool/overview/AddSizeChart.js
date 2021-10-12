import { Col, Row, Select, Spin, Radio, Checkbox, Divider, List, Card ,Popover} from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons';
import { useHistory } from "react-router-dom";
import { Cards } from '../../../components/cards/frame/cards-frame';


const AddSizeChart = (props) => {

    const dispatch = useDispatch();

    return (
        <>
            <Cards headless >
                <Row>
                    <Col span={12}>
                        <p>first inoput</p>
                    </Col>

                    <Col span={12}>
                        <p>second input</p>
                    </Col>
                </Row>
            </Cards >

    </>
  );
};

export default AddSizeChart;