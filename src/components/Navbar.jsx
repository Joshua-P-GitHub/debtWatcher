import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/user'

function Navbar() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <>
    <h1 onClick={handleLogout}>Logout</h1>
    </>
  )
}

export default Navbar