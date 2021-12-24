import React, { useEffect } from 'react';
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
  const userAccess = JSON.parse(localStorage.getItem('userRole'))[0];
  const userTopNavigation = JSON.parse(userAccess.child_bar);

  const sideMenu = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      icon: 'home',
      items: [{
        key: 'Report Graph',
        title: 'Comparison Report',
        path: `${path}/graph/comparisonGraph`
      }, {
        key: 'View Tickets',
        title: 'Tickets',
        path: `${path}/ticket/viewTickets`
      }, {
        key: 'View Reminders',
        title: 'Reminder',
        path: `${path}/ticket/viewReminders`
      }, {
        key: 'View Azab Report',
        title: 'AzabReport',
        path: `${path}/azab/ViewAzabReport`
      }, {
        key: 'View Report PNL',
        title: 'Report PNL',
        path: `${path}/PNL/ViewReportPNL`
      }, {
        key: 'View Report PNL Web',
        title: 'Report PNL Web',
        path: `${path}/ReportPNLWeb/ViewReportPNLWeb`
      }, {
        key: 'View Report PNL MP',
        title: 'Report PNL MarketPlace',
        path: `${path}/ReportPNLMP/ViewReportPNLMP`
      }
      , {
        key: 'View PNL RMA',
        title: 'Report RMA PNL',
        path: `${path}/ReportPNLRMA/ViewPNLRMA`
      } , {
        key: 'Report OverAll',
        title: 'Report OverAll',
        path: `${path}/PNLOverAll/ViewReportPNLOverAll`
      }
    ]
    },
    {
      key: 'Tickets',
      title: 'Tickets',
      icon: 'list',
      items: [{
        key: 'View Tickets',
        title: 'Tickets',
        path: `${path}/ticket/viewTickets`
      }, {
        key: 'Add Ticket',
        title: 'Add Ticket',
        path: `${path}/ticket/addTicket`
      }]
    },
    {
      key: 'Inventory',
      title: 'Inventory',
      icon: 'package',
      items: [{
        key: 'Vendor Inventory',
        title: 'Vendor Inventory',
        path: `${path}/inventory/vendorInventory`
      },
      {
        key: 'Update Inventory',
        title: 'Update Inventory',
        path: `${path}/inventory/updateInventory`
      },
      {
        key: 'Marketplace Inventory',
        title: 'Marketplace Inventory',
        path: `${path}/inventory/marketplaceInventory`
      },
      {
        key: 'Marketplace Group Inventory',
        title: 'Marketplace Group Inventory',
        path: `${path}/inventory/marketplaceGroupInventory`
      },
      {
        key: 'Google MarketPlace',
        title: 'Google MarketPlace',
        path: `${path}/inventory/googleMarketPlace`
      }
    ]
    },
    {
      key: 'Reminders',
      title: 'Reminders',
      icon: 'calendar',
      items: [{
        key: 'viewReminders',
        title: 'Reminders',
        path: `${path}/ticket/viewReminders`
      },
      {
        key: 'addReminder',
        title: 'Add Reminder',
        path: `${path}/ticket/addReminder`
      }]
      
    },
    {
      key: 'Orders',
      title: 'Orders',
      icon: 'shopping-bag',
      items: [{
        key: 'Order Reports',
        title: 'Order Reports',
        path: `${path}/orders/orderReports`
      }, 
      {
        key: 'Marketplace Orders',
        title: 'Marketplace Orders',
        path: `${path}/orders/marketplaceOrders`
      }]
    },
    {
      key: 'Order Report ForLabel',
      title: 'Order Report For Label',
      icon: 'list',
      items: [{
        key: 'All MP Shipment',
        title: 'All MP Shipment',
        path: `${path}/orderreportforlabel/AllMPShipment`
      }, {
        key: 'Web order',
        title: 'Web order',
        path: `${path}/orderreportforlabel/WebOrder`
      }]
    },
    {
      key: 'Sales',
      title: 'Sales',
      icon: 'dollar-sign',
      items: [{
        key: 'Reports',
        title: 'Reports',
        path: `${path}/sales/reports`
      }, {
        key: 'Balance Sheet',
        title: 'Balance Sheet',
        path: `${path}/sales/balanceSheet`
      }, {
        key: 'Other Reports',
        title: 'Other Reports',
        path: `${path}/sales/otherReports`
      }]
    },
    {
      key: 'Shipping',
      title: 'Shipping',
      icon: 'truck',
      items: [{
        key: 'PolyBags and Thermal Labels',
        title: 'PolyBags and Thermal Labels',
        path: `${path}/shipping/PolybagsAndThermalLabels`
      },
      {
        key: 'Amazon Shipment',
        title: 'Amazon Shipment',
        path: `${path}/shipping/amazonShipment`
      },
      {
        key: 'Endicia Shipment',
        title: 'Endicia Shipment',
        path: `${path}/shipping/endiciaShipment`
      },
      {
        key: 'Manual Shipment',
        title: 'Manual Shipment',
        path: `${path}/shipping/manualShipment`
      },
      {
        key: 'Shipping Reports',
        title: 'Shipping Reports',
        path: `${path}/shipping/shippingReports`
      },
      {
        key: 'Shipping Weight',
        title: 'Shipping Weight',
        path: `${path}/shipping/shippingWeight`
      },
      {
        key: 'Shipping Notes',
        title: 'Shipping Notes',
        path: `${path}/shipping/shippingNotes`
      },
      {
        key: 'Shipping Update',
        title: 'Shipping Update',
        path: `${path}/shipping/shippingUpdate`
      } ,
      {
        key: 'Walmart Canada Shipping',
        title: 'Walmart Canada Shipping',
        path: `${path}/shipping/WalmartCanadaShipping`
      }
    ]
    },
    {
      key: 'PUStyles',
      title: 'PUStyles',
      icon: 'droplet',
      items: [{
        key: 'Styles Not in PU',
        title: 'Styles Not in PU',
        path: `${path}/puStyles/stylesNotInPU`
      }, {
        key: 'Marketplace Orders',
        title: 'Marketplace Orders',
        path: `${path}/orders/marketplaceOrders`
      }]
    },
    {
      key: 'Chatbot',
      title: 'Chatbot',
      icon: 'message-square',
      items: [{
        key: '',
        title: '',
        path: `${path}/chatbot/chat`
      }]
    },
    {
      key: 'RMA',
      title: 'RMA',
      icon: 'rotate-cw',
      items: [{
        key: 'RMA Notes',
        title: 'RMA Updates',
        path: `${path}/rma/rmaupdates`
      }]
    },
    {
      key: 'User Management',
      title: 'User Management',
      icon: 'users',
      items: [{
        key: 'Add New Users',
        title: 'Add New Users',
        path: `${path}/userManagement/addNewUsers`
      },
      {
        key: 'Manage Users',
        title: 'Manage Users',
        path: `${path}/userManagement/manageUser`
      },
      {
        key: 'User Right',
        title: 'User Right',
        path: `${path}/userManagement/UserRights`
      }
      ,
      {
        key: 'Add Navigation Tab',
        title: 'Add Navigation Tab',
        path: `${path}/userManagement/AddNavigationTab`
      }
    ]
    },
    {
      key: 'Reporting',
      title: 'Reporting',
      icon: 'users',
      items: [{
        key: 'FrontReports',
        title: 'FrontReports',
        path: `${path}/reporting/`
      }]
    },
    {
      key: 'Size Chart',
      title: 'Style Chart',
      icon: 'users',
      items: [{
        key: 'Manage Size Chart',
        title: 'Add Size Chart',
        path: `${path}/styleChart`
      }
    ]
    }
  ]




  useEffect(() => {
    // // console.log("ew", JSON.parse(userAccess.top_navigation))
    // // console.log("child_bar", JSON.parse(userAccess.child_bar))
  }, [])

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
      {sideMenu.map(menu =>
      (Object.keys(userTopNavigation)?.includes(menu.title) &&
        <SubMenu key={menu.key} icon={!topMenu && <FeatherIcon icon={menu.icon} />} title={menu.key}>
          {menu.items.map(item =>
            userTopNavigation[menu.title]?.includes(item.title) &&
            (<Menu.Item key={item.key}>
              <NavLink onClick={toggleCollapsed} to={item.path}>
                {item.key}
              </NavLink>
            </Menu.Item>))}
        </SubMenu>))}

    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
