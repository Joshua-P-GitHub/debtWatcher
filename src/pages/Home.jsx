import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { autoLogin } from '../redux/slices/user'
import { useDispatch } from 'react-redux'




function Home() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  useEffect(() => {
   dispatch(autoLogin())
  }, [])
  return (
    <div id='home'>
      <header>
        <h1 style={{color: 'white'}}>Debt Tracker</h1>
      </header>
      <main>
        <h3 onClick={() => {navigate('/login')}} style={{cursor: 'pointer'}}>Begin Tracking</h3>
      </main>
    </div>
  )
}

export default Home