import React, { useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { StyledDashboard } from './sytled.js'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/auth.js'
import { ROLES } from '../../Actions/index.js'
import Copy from '../../Components/UI/Copy/index.jsx'
import Toggle from '../../Components/Toggle/index.jsx'

const sectionTitles = {
  '/dashboard': 'إدارة المنتجات والمخزون',
  '/dashboard/addcategory': 'إدارة أقسام المتجر',
  '/dashboard/addUser': 'إدارة المستخدمين والصلاحيات',
  '/dashboard/addSocial': 'إدارة وسائل التواصل والدعم',
  '/dashboard/orders': 'إدارة طلبات ومبيعات العملاء'
};

const Dashboard = () => {
  const user = useSelector(selectUser)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const currentTitle = sectionTitles[location.pathname] || 'لوحة التحكم';

  return (
    <StyledDashboard>
      <div className="content">
        <aside className={open ? "opened" : "colsed"}>
          <div>
            <div className="sidebarBrand">
              <h3>
                <span>👑</span> لوحة التحكم
              </h3>
              <p>لولو بوتيكات • إدارة المتجر</p>
            </div>

            <ul>
              <li>
                <NavLink 
                  to='/dashboard' 
                  end
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span className="navIcon">🛍️</span>
                  <span>المنتجات</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/dashboard/addcategory'
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span className="navIcon">📂</span>
                  <span>الأقسام</span>
                </NavLink>
              </li>
              {user?.role === ROLES.ADMIN && (
                <li>
                  <NavLink 
                    to='/dashboard/addUser'
                    className={({ isActive }) => isActive ? 'active' : ''}
                    onClick={() => setOpen(false)}
                  >
                    <span className="navIcon">👥</span>
                    <span>المستخدمين</span>
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink 
                  to='/dashboard/addSocial'
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span className="navIcon">🌐</span>
                  <span>وسائل التواصل</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/dashboard/orders'
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span className="navIcon">📦</span>
                  <span>الطلبات</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sidebarFooter">
            <Link to='/home' className="storeLink">
              <span>🛍️ العودة للمتجر</span>
            </Link>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Toggle />
            </div>
          </div>

          <button 
            type="button" 
            className="mobileToggleBtn" 
            onClick={() => setOpen(prev => !prev)}
            title="تبديل القائمة"
          >
            {open ? "✕" : "☰"}
          </button>
        </aside>

        {open && (
          <div className="layout" onClick={() => setOpen(false)} />
        )}

        <main>
          <div className="dashboardHeader">
            <h1 className="pageTitle">{currentTitle}</h1>
            <div className="userBadge">
              <span>👤</span>
              <span>{user?.name || 'مدير المتجر'}</span>
              <span>({user?.role === ROLES.ADMIN ? 'مدير النظام' : 'محرر المتجر'})</span>
            </div>
          </div>

          <Outlet />
        </main>
      </div>

      <footer>
        <Copy />
      </footer>
    </StyledDashboard>
  )
}

export default Dashboard
