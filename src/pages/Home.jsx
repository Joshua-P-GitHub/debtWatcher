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
    <div>
      <header>
        <h1>Keep Track of your Debt</h1>
      </header>
      <main>
        <h3 onClick={() => {navigate('/login')}}>Begin Tracking</h3>
      </main>
    </div>
  )
}

export default Home