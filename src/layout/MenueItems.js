import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  return (
    <Menu
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
            `${mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
            }`,
          ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
    >
      {/* ==================================== DASHBOARD ========================================================== */}
      <SubMenu key="dashboard" icon={!topMenu && <FeatherIcon icon="home" />} title="Dashboard">
        <Menu.Item key="viewTickets">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/viewTickets`}>
            Tickets
          </NavLink>
        </Menu.Item>
        <Menu.Item key="viewReminders">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/viewReminders`}>
            Reminders
          </NavLink>
        </Menu.Item>
        <Menu.Item key="ViewAzabReport">
          <NavLink onClick={toggleCollapsed} to={`${path}/azab/ViewAzabReport`}>
            AzabReport
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* ==================================== TICKETS ========================================================== */}
      <SubMenu key="Tickets" icon={!topMenu && <FeatherIcon icon="list" />} title="Tickets">
        <Menu.Item key="viewTickets">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/viewTickets`}>
            Tickets
          </NavLink>
        </Menu.Item>
        <Menu.Item key="addTicket">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/addTicket`}>
            Add Ticket
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* ==================================== REMINDERS ========================================================== */}
      <SubMenu key="Reminders" icon={!topMenu && <FeatherIcon icon="calendar" />} title="Reminders">
        <Menu.Item key="viewReminders">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/viewReminders`}>
            Reminders
          </NavLink>
        </Menu.Item>
        <Menu.Item key="addReminder">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/addReminder`}>
            Add Reminder
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* ==================================== INVENTORY ========================================================== */}
      <SubMenu key="Inventory" icon={!topMenu && <FeatherIcon icon="package" />} title="Inventory">
        <Menu.Item key="Vendor Inventory">
          <NavLink onClick={toggleCollapsed} to={`${path}/inventory/vendorInventory`}>
            Vendor Inventory
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Update Inventory">
          <NavLink onClick={toggleCollapsed} to={`${path}/inventory/updateInventory`}>
            Update Inventory
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Marketplace Inventory">
          <NavLink onClick={toggleCollapsed} to={`${path}/inventory/marketplaceInventory`}>
            Marketplace Inventory
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Marketplace Group Inventory">
          <NavLink onClick={toggleCollapsed} to={`${path}/inventory/marketplaceGroupInventory`}>
            Marketplace Group Inventory
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* ==================================== ORDERS ========================================================== */}
      <SubMenu key="Orders" icon={!topMenu && <FeatherIcon icon="shopping-bag" />} title="Orders">
        <Menu.Item key="Order Reports">
          <NavLink onClick={toggleCollapsed} to={`${path}/orders/orderReports`}>
            Order Reports
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Marketplace Orders">
          <NavLink onClick={toggleCollapsed} to={`${path}/orders/marketplaceOrders`}>
            Marketplace Orders
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* ==================================== SALES ========================================================== */}
      <SubMenu key="Sales" icon={!topMenu && <FeatherIcon icon="dollar-sign" />} title="Sales">
        <Menu.Item key="Reports">
          <NavLink onClick={toggleCollapsed} to={`${path}/sales/reports`}>
            Reports
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Balance Sheet">
          <NavLink onClick={toggleCollapsed} to={`${path}/sales/balanceSheet`}>
            Balance Sheet
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Other Reports">
          <NavLink onClick={toggleCollapsed} to={`${path}/sales/otherReports`}>
            Other Reports
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* ==================================== SHIPPING ========================================================== */}
      <SubMenu key="Shipping" icon={!topMenu && <FeatherIcon icon="truck" />} title="Shipping">
        <Menu.Item key="PolyBags and Thermal Labels">
          <NavLink onClick={toggleCollapsed} to={`${path}/shipping/PolybagsAndThermalLabels`}>
            PolyBags and Thermal Labels
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Amazon Shipment">
          <NavLink onClick={toggleCollapsed} to={`${path}/shipping/amazonShipment`}>
            Amazon Shipment
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Endicia Shipment">
          <NavLink onClick={toggleCollapsed} to={`${path}/shipping/endiciaShipment`}>
            Endicia Shipment
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Manual Shipment">
          <NavLink onClick={toggleCollapsed} to={`${path}/shipping/manualShipment`}>
            Manual Shipment
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Shipping Reports">
          <NavLink onClick={toggleCollapsed} to={`${path}/shipping/shippingReports`}>
            Shipping Reports
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Shipping Weight">
          <NavLink onClick={toggleCollapsed} to={`${path}/shipping/shippingWeight`}>
            Shipping Weight
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* ==================================== PU STYLES ========================================================== */}
      <SubMenu key="PUStyles" icon={!topMenu && <FeatherIcon icon="droplet" />} title="PUStyles">
        <Menu.Item key="Styles Not in PU">
          <NavLink onClick={toggleCollapsed} to={`${path}/puStyles/stylesNotInPU`}>
            Styles Not in PU
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* ==================================== CHATBOT ========================================================== */}
      <SubMenu key="Chatbot" icon={!topMenu && <FeatherIcon icon="message-square" />} title="Chatbot">
        <Menu.Item key="Styles Not in PU">
          <NavLink onClick={toggleCollapsed} to={`${path}/chatbot/chat`}>
            Chatbot
          </NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
