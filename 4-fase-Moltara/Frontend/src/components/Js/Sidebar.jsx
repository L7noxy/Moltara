import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../Css/Sidebar.css";

function Sidebar() {
  return (
    <>
      <div className="sidebar-custom">
        <nav className="main-menu">
          <div className="icons-section">
            <ul>
              <li>
                <a href="https://jbfarrow.com">
                  <i className="fa fa-home fa-2x"></i>
                  <span className="nav-text">Inicio </span>
                </a>
              </li>
              <li className="has-subnav">
                <a href="#">
                  <i className="fa fa-user fa-2x"></i>
                  <span className="nav-text">Meus dados</span>
                </a>
              </li>
              <li className="has-subnav">
                <a href="#">
                  <i className="fa fa-wallet fa-2x"></i>
                  <span className="nav-text">Survey Photos</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-film fa-2x"></i>
                  <span className="nav-text">Surveying Tutorials</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-book fa-2x"></i>
                  <span className="nav-text">Surveying Jobs</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-cogs fa-2x"></i>
                  <span className="nav-text">Tools & Resources</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-map-marker fa-2x"></i>
                  <span className="nav-text">Member Map</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-info fa-2x"></i>
                  <span className="nav-text">Documentation</span>
                </a>
              </li>
            </ul>
          </div>

          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa fa-power-off fa-2x"></i>
                <span className="nav-text">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
