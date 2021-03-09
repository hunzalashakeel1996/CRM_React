import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import AddNewUsers from './AddNewUsers';
import ManageUsers from './ManageUsers';

const { TabPane } = Tabs;

const UsersView = (props) => {
    return (
        <>
            <Tabs defaultActiveKey="Add New Users" centered>
                <TabPane tab="Add New Users" key="Add New Users">
                    Add New Users
                    
                </TabPane>
                <TabPane tab="Manage Users" key="Manage Users">
                    Manage Users
                    
                </TabPane>
            </Tabs>
        </>
    );
};

export default UsersView;
