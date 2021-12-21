import React, { Suspense, useEffect, useState } from 'react';
import { List, Skeleton, Tooltip, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const OfferItem = ({ loading, item, onEdit, changeStatus }) => {
  const { BRANDNAME, OFFER, STATUS } = item;

  const menu = (
    <Menu onClick={changeStatus}>
      <Menu.Item key="Active">Active</Menu.Item>
      <Menu.Item key="InActive">InActive</Menu.Item>
    </Menu>
  );

  return (
    <>
      <List.Item
        actions={[!loading && <a onClick={onEdit} key="list-edit">Edit</a>]}
      >
        <Skeleton avatar title={false} loading={loading} active>
          <List.Item.Meta
            title={<div>{BRANDNAME}</div>}
            description={OFFER}
          />
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              {STATUS} <DownOutlined />
            </a>
          </Dropdown>
        </Skeleton>
      </List.Item>
    </>
  );
};

export default OfferItem;

