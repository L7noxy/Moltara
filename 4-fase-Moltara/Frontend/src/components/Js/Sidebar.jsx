import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { LuChartSpline } from "react-icons/lu";
import { FaGear } from "react-icons/fa6";
import { CgAddR } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";

import "../Css/Sidebar.css";

function Sidebar() {
  return (
    <>
      <div class="sidebar-custom">
        <nav class="main-menu">
          <ul>
            <li>
              <a href="https://jbfarrow.com">
                <i class="fa fa-home fa-2x"></i>
                <span class="nav-text">Community Dashboard</span>
              </a>
            </li>
            <li class="has-subnav">
              <a href="#">
                <i class="fa fa-globe fa-2x"></i>
                <span class="nav-text">Global Surveyors</span>
              </a>
            </li>
            <li class="has-subnav">
              <a href="#">
                <i class="fa fa-comments fa-2x"></i>
                <span class="nav-text">Group Hub Forums</span>
              </a>
            </li>
            <li class="has-subnav">
              <a href="#">
                <i class="fa fa-camera-retro fa-2x"></i>
                <span class="nav-text">Survey Photos</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-film fa-2x"></i>
                <span class="nav-text">Surveying Tutorials</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-book fa-2x"></i>
                <span class="nav-text">Surveying Jobs</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-cogs fa-2x"></i>
                <span class="nav-text">Tools & Resources</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-map-marker fa-2x"></i>
                <span class="nav-text">Member Map</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-info fa-2x"></i>
                <span class="nav-text">Documentation</span>
              </a>
            </li>
          </ul>

          <ul class="logout">
            <li>
              <a href="#">
                <i class="fa fa-power-off fa-2x"></i>
                <span class="nav-text">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
