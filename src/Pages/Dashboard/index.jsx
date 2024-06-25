import React from 'react'
import { MainButton } from '../../Global/components.js'
import { Link, Outlet } from 'react-router-dom'
import { StyledDashboard } from './sytled.js'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/auth.js'
import { ROLES } from '../../Actions/index.js'
import { useState } from 'react'
import Copy from '../../Components/UI/Copy/index.jsx'
import Toggle from '../../Components/Toggle/index.jsx' 
const Dashboard = () => {
  const user = useSelector(selectUser)
  const [open, setOpen] = useState(false)  
  return (
    <StyledDashboard>
      <div className="content">

        <aside className={open ? "opened" : "colsed"}>
          <ul>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/dashboard'>Add Products</Link>
            </li>
            <li>
              <Link to='addcategory'>Add Catetory</Link>
            </li>
            {
              user?.role === ROLES.ADMIN &&
              <li>
                <Link to='adduser'>Add User</Link>
              </li>
            }
            <li>
              <Link to='AddSocial'>Add Social</Link>
            </li>
            <li>
              <Link to='orders'>Orders</Link>
            </li>
            <li>
              <Toggle />
            </li>
          </ul>
          <MainButton onClick={() => {
            setOpen(prev => (!prev))
          }}>{open ? "<" : ">"}</MainButton>
        </aside>
        {
          open &&
          <div className="layout" onClick={() => setOpen(false)}></div>
        }
        <main>
          <div className='container'>
            <Outlet />
          </div>
        </main>
      </div>
      <footer>
        <Copy />
      </footer>
    </StyledDashboard>
  )
}

export default Dashboard
