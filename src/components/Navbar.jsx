import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/user'
import { resetDebt } from '../redux/slices/debt'

function Navbar() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetDebt())
  }
  const {user} = useSelector((state) => state.auth)
  return (
    <>
    <div id='navbar'>
      <div id='navbar-logout' onClick={handleLogout}>
        <h1>Logout</h1>
      </div>
      <div id='navbar-name'>
        <h1>{user.userName}</h1>
      </div>
      <div style={{flex: 1}}>

      </div>
    </div>
    </>
  )
}

export default Navbar