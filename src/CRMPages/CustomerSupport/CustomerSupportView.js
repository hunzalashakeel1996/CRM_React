import { Tabs } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EmailTemplate from './EmailTemplate/EmailTemplate';
import ProhibitedWords from './EmailTemplate/ProhibitedWords';
import { getProhibitedWords } from './../../redux/apis/DataAction';


const { TabPane } = Tabs;

const CustomerSupportView = (props) => {
    const [activeTab, setActiveTab] = useState('');
    const dispatch = useDispatch();

    const [state, setState] = useState({
        prohibitedWords: []
    });

    useEffect(() => {
        dispatch(getProhibitedWords()).then(data => {
            setState({...state, prohibitedWords: [...data]})
          })
      
    }, []);

    const onNewWordInserted = (data) => {
        setState({...state, prohibitedWords: [...state.prohibitedWords, {marketplace_name: data.marketplaceName, prohibited_word: data.prohibitedWord}]})
    }

    return (
        <div >
            <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
                <TabPane tab="Email Template" key="EmailTemplate">
                    <EmailTemplate  prohibitedWords={state.prohibitedWords}/>
                </TabPane>
                <TabPane tab="Prohibited Words" key="ProhibitedWords">
                    <ProhibitedWords  prohibitedWords={state.prohibitedWords} onNewWordInserterd={onNewWordInserted}/>
                </TabPane>
                
            </Tabs>
        </div>
    );
};

export default CustomerSupportView;
