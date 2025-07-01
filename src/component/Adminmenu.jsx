"use client"
import Link from 'next/link'
import React from 'react'

export default function Adminmenu() {
  return (



    <div className="app-menu navbar-menu">
      {/* LOGO */}
      <div className="navbar-brand-box">
        {/* Dark Logo*/}
        <Link href="/" className="logo logo-dark">
          <span className="logo-sm">
            <img src="/images/logo.png" alt="biz analytics" height={22} />
          </span>
          <span className="logo-lg">
            <img src="/images/logo.png" alt="biz analytics" height={17} />
          </span>
        </Link>
        {/* Light Logo*/}
        <Link href="/" className="logo logo-light">
          <span className="logo-sm">
            <img src="/images/logo.png" alt="biz analytics" height={22} />
          </span>
          <span className="logo-lg">
            <img src="/images/logo.png" alt="biz analytics" height={57} />
          </span>
        </Link>
        <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
          <i className="ri-record-circle-line" />
        </button>
      </div>
      <div className="dropdown sidebar-user m-1 rounded">
        <button type="button" className="btn material-shadow-none" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="d-flex align-items-center gap-2">
            <img className="rounded header-profile-user" src="/assets/images/users/avatar-1.jpg" alt="Header Avatar" />
            <span className="text-start">
              <span className="d-block fw-medium sidebar-user-name-text">Anna Adame</span>
              <span className="d-block fs-14 sidebar-user-name-sub-text"><i className="ri ri-circle-fill fs-10 text-success align-baseline" /> <span className="align-middle">Online</span></span>
            </span>
          </span>
        </button>
        <div className="dropdown-menu dropdown-menu-end">
          {/* item*/}
          <h6 className="dropdown-header">Welcome Anna!</h6>
          <a className="dropdown-item" href="pages-profile.html"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" /> <span className="align-middle">Profile</span></a>
          <a className="dropdown-item" href="apps-chat.html"><i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Messages</span></a>
          <a className="dropdown-item" href="apps-tasks-kanban.html"><i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Taskboard</span></a>
          <a className="dropdown-item" href="pages-faqs.html"><i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" /> <span className="align-middle">Help</span></a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="pages-profile.html"><i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" /> <span className="align-middle">Balance : <b>$5971.67</b></span></a>
          <a className="dropdown-item" href="pages-profile-settings.html"><span className="badge bg-success-subtle text-success mt-1 float-end">New</span><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Settings</span></a>
          <a className="dropdown-item" href="auth-lockscreen-basic.html"><i className="mdi mdi-lock text-muted fs-16 align-middle me-1" /> <span className="align-middle">Lock screen</span></a>
          <a className="dropdown-item" href="auth-logout-basic.html"><i className="mdi mdi-logout text-muted fs-16 align-middle me-1" /> <span className="align-middle" data-key="t-logout">Logout</span></a>
        </div>
      </div>


      <div id="scrollbar">
        <div className="container-fluid">
          <div id="two-column-menu">
          </div>
          <ul className="navbar-nav" id="navbar-nav">
            {/* <li className="menu-title"><span data-key="t-menu">Menu</span></li> */}

            <li >
              <Link className="nav-link " href="/admin" >
                <i className="ri-store-line" /> <span >Dashboard</span>

              </Link>

            </li>

            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards" >
                <i className="ri-database-line" /> <span data-key="t-Manage Blogs">Blogs</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards">
                <ul className="nav nav-sm flex-column">

                  <li className="nav-item">
                    <Link href="/admin/blog/create" className="nav-link" data-key="t-create">create blog</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/admin/blog" className="nav-link" data-key="t-list">blogs list</Link>
                  </li>


                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards1" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-file-image-line" /> <span data-key="t-Manage Slider">Sliders</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards1">
                <ul className="nav nav-sm flex-column">

                  <li className="nav-item">
                    <Link href="/admin/slider/create" className="nav-link" data-key="t-create">create slider</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/admin/slider/list" className="nav-link" data-key="t-list">sliders list</Link>
                  </li>


                </ul>
              </div>
            </li>



            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards3" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-file-image-line" /> <span data-key="t-Manage Offers">Galleries</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards3">
                <ul className="nav nav-sm flex-column">

                  <li className="nav-item">
                    <a href="/admin/gallery/create" className="nav-link" data-key="t-create">upload image</a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/gallery/list" className="nav-link" data-key="t-list">images list</a>
                  </li>


                </ul>
              </div>
            </li>


            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards4" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-info-i" /> <span data-key="t-Manage Inquiry">Inquiries</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards4">
                <ul className="nav nav-sm flex-column">


                  <li className="nav-item">
                    <a href="/admin/inquiry" className="nav-link" data-key="t-list">inquiries list</a>
                  </li>


                </ul>
              </div>
            </li>


            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards5" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-user-forbid-line" /> <span data-key="t-Manage Inquiry">Testimonials</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards5">
                <ul className="nav nav-sm flex-column">


                  <li className="nav-item">
                    <a href="/admin/testimonial/create" className="nav-link" data-key="t-create">create testimonial</a>
                  </li>

                  <li className="nav-item">
                    <a href="/admin/testimonial/list" className="nav-link" data-key="t-list">testimonials list </a>
                  </li>


                </ul>
              </div>
            </li>


            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards6" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-infinity-line" /> <span data-key="t-Manage Inquiry">Pages</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards6">
                <ul className="nav nav-sm flex-column">


                  <li className="nav-item">
                    <a href="/admin/page/create-normal" className="nav-link" data-key="t-create">create normal page</a>
                  </li>

                  <li className="nav-item">
                    <a href="/admin/page/create-service" className="nav-link" data-key="t-create">create service page</a>
                  </li>

                  <li className="nav-item">
                    <a href="/admin/page/list" className="nav-link" data-key="t-list">pages list
                    </a>
                  </li>


                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards7" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-user-follow-line" /> <span data-key="t-Manage Inquiry">Subscriptions</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards7">
                <ul className="nav nav-sm flex-column">


                  <li className="nav-item">
                    <a href="/admin/subscription" className="nav-link" data-key="t-list">subscriptions list</a>
                  </li>


                </ul>
              </div>
            </li>


            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards8" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-tv-2-line" /> <span data-key="t-Manage Website">Website Details</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards8">
                <ul className="nav nav-sm flex-column">

                  <li className="nav-item">
                    <a href="/admin/details" className="nav-link" data-key="t-details">details</a>
                  </li>


                </ul>
              </div>
            </li>



            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards11" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-file-image-line" /> <span data-key="t-Manage Gallery">Gallery Section</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards11">
                <ul className="nav nav-sm flex-column">

                  <li className="nav-item">
                    <a href="/admin/client/create" className="nav-link" data-key="t-create">create client</a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/category/list" className="nav-link" data-key="t-list">category list</a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/client/list" className="nav-link" data-key="t-list">client list</a>
                  </li>


                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link menu-link" href="#sidebarDashboards12" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i className="ri-file-image-line" /> <span data-key="t-Manage Gallery">Manage Header</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarDashboards12">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <a href="/admin/menu/list" className="nav-link" data-key="t-list">menu list</a>
                  </li>
                </ul>
              </div>
            </li>


          </ul>
        </div>
        {/* Sidebar */}
      </div>
      <div className="sidebar-background" />
    </div>



  )
}
