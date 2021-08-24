import { Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cards } from '../../../components/cards/frame/cards-frame';

const WelcomePage = () => {
    //  // console.log(categories)


    return (
        <>
            {/* <div style={{ backgroundColor: 'white',width: '100%', height: 600,display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Row>
               <p style={{fontSize: 50, color: 'rgb(106 107 110)'}}>
                    Welcome To 
                </p>
                <p style={{fontSize: 50, color: 'rgb(236 135 31)', marginLeft: 12}}>
                 CRM
                </p>
               </Row>
               
            </div> */}
            <div style={{ backgroundColor: 'white',width: '100%', height: 600,display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <img
                    style={{ width: 900, height: 550}}
                    src="/img/icons/CRM_background.jpg"
                />
                </div>
                
        </>
    );
};

export default WelcomePage;
