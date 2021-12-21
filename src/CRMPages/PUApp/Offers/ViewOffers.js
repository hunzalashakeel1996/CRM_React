import React, { Suspense, useEffect, useState } from 'react';

import { Row, Col, Icon, Form, Input, List, Avatar, Skeleton, Card, notification, Select, InputNumber, Table, Space, Modal, Radio, Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/buttons/buttons';

import './overview/style.css';
import OfferItem from './overview/OfferItem';
import { PUAppOffers, PUAppUpdateOffer, PUAppUpdateOfferStatus } from '../../../redux/apis/DataAction';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ViewSort = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
  const tabChildBar = JSON.parse(userAccess.top_navigation)['Offers'];
  const [activeTab, setActiveTab] = useState('Active');
  const [activeList, setActiveList] = useState([{}, {}, {}]);
  const [inActiveList, setInActiveList] = useState([]);
  const [initLoading, setInitLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState(null);

  const topMenu = [
    {
      tab: 'Active',
      key: 'Active',
    }
    , {
      tab: 'InActive',
      key: 'InActive',
    }
  ];

  useEffect(() => {
    getOffers();
  }, [])

  const getOffers = () => {
    setInitLoading(true)
    dispatch(PUAppOffers()).then(res => {
      console.log(res)
      setActiveList(res.filter(item => item.STATUS == 'Active'))
      setInActiveList(res.filter(item => item.STATUS == 'InActive'))
      setInitLoading(false)
    })
  }

  const openNotificationWithIcon = (type, title) => {
    notification[type]({
      message: title,
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  const editOffer = (item) => {
    setIsModalVisible(true);
    setSelectedOffer(item)
  };

  const updateOffer = () => {
    setIsModalVisible(false);
    let data = {
      ID: selectedOffer.ID,
      OFFER: selectedOffer.OFFER
    }
    dispatch(PUAppUpdateOffer(data)).then(res => {
      getOffers();
      openNotificationWithIcon('success', 'Offer Successfully Updated!');
      setSelectedOffer(null)
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOffer(null)
  };

  const updateOfferStatus = (item, status) => {
    if (item.STATUS !== status) {
      let data = {
        ID: item.ID,
        STATUS: status
      }
      dispatch(PUAppUpdateOfferStatus(data)).then(res => {
        getOffers();
        openNotificationWithIcon('success', 'Offer Status Successfully Updated!');
      })
    }
  };

  return (
    <>
      <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={false} >
        <Tabs type="card" defaultActiveKey={activeTab} onChange={(key) => { setActiveTab(key) }} style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
          {topMenu.map(item => (
            (
              <TabPane tab={item.tab} key={item.key}>
                <Card id="Offer">
                  <List
                    // loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={activeTab == 'Active' ? activeList : inActiveList}
                    header={<List.Item
                      actions={[<div>Action</div>]}
                    >
                      <List.Item.Meta
                        title={<div>{'Offers'}</div>}
                      />
                      <div>{'Status'}</div>
                    </List.Item>}
                    renderItem={item => <OfferItem loading={initLoading} item={item} changeStatus={({ key }) => updateOfferStatus(item, key)} onEdit={() => editOffer(item)} />}
                  />
                </Card>
              </TabPane>
            )
          ))}
        </Tabs>

        {isModalVisible && <Modal title="Edit Offer" visible={isModalVisible} onOk={updateOffer} okText={'Update'} onCancel={handleCancel}>
          <p>{selectedOffer.BRANDNAME}</p>
          <TextArea value={selectedOffer.OFFER} onChange={(e) => setSelectedOffer({ ...selectedOffer, OFFER: e.target.value })} autoSize />
          {/* <Input value={selectedOffer.OFFER} onChange={(e) => setSelectedOffer({ ...selectedOffer, OFFER: e.target.value })} /> */}
        </Modal>}

      </Spin >
    </>
  );
};

export default ViewSort;

