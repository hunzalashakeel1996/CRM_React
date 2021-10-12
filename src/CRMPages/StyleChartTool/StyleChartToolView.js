import { Spin, Tabs } from 'antd';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AddSizeChart = lazy(() => import('./overview/AddSizeChart'));

const { TabPane } = Tabs;

const StyleChartTool = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { path } = props.match;

  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
  const tabChildBar = JSON.parse(userAccess.top_navigation)['Add Size Chart'];

  const [activeTab, setActiveTab] = useState('');
  const [state, setState] = useState({
    loader: false,
  });
  const { loader } = state;

  // get items from redux
  let user = useSelector(state => state.auth.login);

  useEffect(() => {
    
  }, []);

  const topMenu = [
    {
        tab: 'Custom Size Chart',
        key: 'Custom Size Chart',
        tabName: <AddSizeChart  />
    },
];
    return (
        <>
            <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={loader} >
                <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
                    {topMenu.map(item => (
                        tabChildBar?.includes(item.tab) && (
                            <TabPane tab={item.tab} key={item.key}>
                                {item.tabName}
                            </TabPane>)

                    ))}

                </Tabs>
            </Spin>
        </>
    );
};


export default StyleChartTool;
