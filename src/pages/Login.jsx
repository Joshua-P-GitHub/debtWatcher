import React, { useEffect, useState } from 'react'
import { register, login } from '../redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
function Login() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  let isLoginReady;
  if (inputValue.email !== '' && inputValue.password !== '' && inputValue.email.includes('@')){
    isLoginReady = true
  }
  let isRegeisterReady;
  if (inputValue.email !== '' && inputValue.password !== '' && inputValue.password !== '' && inputValue.confirmPassword === inputValue.password && inputValue.name !== '' && inputValue.email.includes('@')){
    isRegeisterReady = true
  }
  const handleInputChange = (event) => {
    const inputValueCopy = { ...inputValue }
    inputValueCopy[`${event.target.name}`] = event.target.value
    setInputValue(inputValueCopy);
  };
  const handleLogin = () => {
    if (isLoginReady){
    dispatch(login({
      email: inputValue.email,
      password: inputValue.password,
    }))
    navigate('/')      
    }
  }
  const handleRegister = () => {
    if (isRegeisterReady){
      dispatch(register({
        name: inputValue.name,
        email: inputValue.email,
        password: inputValue.password
      }))
      navigate('/')
    }
  }
  return (
    <>
      <header>
        <h1 style={{color: 'white', cursor: 'pointer'}} onClick={() => {navigate('/')}}>Debt Tracker</h1>
      </header>
    <div id='login-form'>
      <div className='form'>
      <div className='item'>
        <h3>NAME</h3>
        <input
          type="text"
          value={inputValue.name}
          onChange={handleInputChange}
          name='name'
        />
      </div>
      <div className='item'>
        <h3>EMAIL</h3>
        <input
          type="email"
          value={inputValue.email}
          onChange={handleInputChange}
          name='email'
        />
      </div>

      <div className='item'>
        <h3>PASSWORD</h3>
        <input
          type="password"
          value={inputValue.password}
          onChange={handleInputChange}
          name='password'
        />
      </div>

      <div className='item'>
        <h3>Confirm Password</h3>
        <input
          type="password"
          value={inputValue.confirmPassword}
          onChange={handleInputChange}
          name='confirmPassword'
        />
      </div>
      <div className='buttons'>
      <h2 onClick={handleRegister} style={ !isRegeisterReady ? {opacity: .1} : {opacity: 1}}>Register</h2>
      <h2 onClick={handleLogin} style={ !isLoginReady ? {opacity: .1} : {opacity: 1}}>Login</h2>           
      </div>
      </div>
    </div>
    </>
  )
}

export default Login