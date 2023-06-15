import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  // CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

import './Sidebar.css'
const Sidebar = () => {

  return (
    <div className={`app`} style={{ display: "flex", height: "100%", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#FFF" backgroundColor="#1A88CA">
        <CDBSidebarHeader prefix={<i className="fa fa-bars"></i>}>
        <a href="/" className="dash" style={{color:"inherit",fontSize:24}}>
            DASHBOARD
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked" className={`nav-link`}>
              <CDBSidebarMenuItem >Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/details" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >All Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/alltransactions" activeClassName="activeClicked" className={`nav-link list`}>
            <CDBSidebarMenuItem>All Transactions</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lowdetails" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Low Stocks</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/alltransactions" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Product IN</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Product OUT</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/voucher" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Settings</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/deals" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Export</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminmessage" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >My business</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminmessage" activeClassName="activeClicked" className={`nav-link list`}>
              <CDBSidebarMenuItem >Collaborators</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px"
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
}

export default Sidebar;