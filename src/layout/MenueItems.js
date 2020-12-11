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

      <SubMenu key="ticket" icon={!topMenu && <FeatherIcon icon="target" />} title="Ticket">
        {/* <Menu.Item key="viewTickets">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/viewTickets`}>
            Tickets
          </NavLink>
        </Menu.Item>
        <Menu.Item key="viewReminders">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/viewReminders`}>
            Reminders
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="addTicket">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/addTicket`}>
            Add Ticket
          </NavLink>
        </Menu.Item>
        <Menu.Item key="addReminder">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/addReminder`}>
            Add Reminder
          </NavLink>
        </Menu.Item>
        
        {/* <Menu.Item key="createTicket">
          <NavLink onClick={toggleCollapsed} to={`${path}/ticket/createTicket`}>
            Create Ticket
          </NavLink>
        </Menu.Item> */}
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
