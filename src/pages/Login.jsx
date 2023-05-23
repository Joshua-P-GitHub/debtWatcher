import React, { useState } from 'react'
import { register, login } from '../redux/slices/user';
import { useDispatch } from 'react-redux';
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
  const handleInputChange = (event) => {
    const inputValueCopy = { ...inputValue }
    inputValueCopy[`${event.target.name}`] = event.target.value
    setInputValue(inputValueCopy);
  };
  const handleLogin = () => {
    dispatch(login({
      email: inputValue.email,
      password: inputValue.password,
    }))
    navigate('/')
  }
  const handleRegister = () => {
    dispatch(register({
      name: inputValue.name,
      email: inputValue.email,
      password: inputValue.password
    }))
    navigate('/')
  }
  return (
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
          type="text"
          value={inputValue.email}
          onChange={handleInputChange}
          name='email'
        />
      </div>

      <div className='item'>
        <h3>PASSWORD</h3>
        <input
          type="text"
          value={inputValue.password}
          onChange={handleInputChange}
          name='password'
        />
      </div>

      <div className='item'>
        <h3>Confirm Password</h3>
        <input
          type="text"
          value={inputValue.confirmPassword}
          onChange={handleInputChange}
          name='confirmPassword'
        />
      </div>
      <div className='buttons'>
      <h2 onClick={handleRegister}>Register</h2>
      <h2 onClick={handleLogin}>Login</h2>           
      </div>
      </div>
    </div>
  )
}

export default Login