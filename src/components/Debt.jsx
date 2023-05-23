import React, { useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDebt, getDebt } from '../redux/slices/debt';
import { useNavigate } from 'react-router-dom';




function Debt(props) {
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [addAmount, setAddAmount] = useState('')
  const [addAmntToggle, setAddAmntToggle] = useState(false)
  const [inputValue, setInputValue] = useState({
    title: props.title,
    originalAmount: props.originalAmount,
    amountPutInDebt: props.amountPutInDebt,
  })
  const trueInputValue = {
    title: props.title,
    originalAmount: props.originalAmount,
    amountPutInDebt: props.amountPutInDebt,
  }
  let isSame;
  if (inputValue.title === trueInputValue.title && inputValue.originalAmount.toLocaleString() === trueInputValue.originalAmount.toLocaleString() && inputValue.amountPutInDebt.toLocaleString() === trueInputValue.amountPutInDebt.toLocaleString()){
   isSame = true 
  } else {
    isSame = false
  }
  console.log(isSame)
  const handleInputChange = (event) => {
    const inputValueCopy = { ...inputValue }
    inputValueCopy[`${event.target.name}`] = event.target.value
    setInputValue(inputValueCopy);
  };
  const dispatch = useDispatch()
  const handleSubmit = () => {
    if (inputValue.title === '/delete'){
      console.log(user.token)
      dispatch(deleteDebt({token: user.token, debt: props._id}))
      dispatch(getDebt(user.token))
    } else if (isSame){
      setAddAmntToggle(true)
      inputRef.current.focus()
    }
  }

  const handleAddAmnt = (event) => {
    setAddAmount(event.target.value)
  }

  const handleAddBlur = () => {
    console.log(Number(addAmount) + Number(trueInputValue.amountPutInDebt))
  }

  const handleBlur = () => {

  }

  const inputRef = useRef()
  return (
    <div id='debt'>
      <div id='debt-date'>
        <div>
          <p>04-24</p>
          <p>2020</p>
        </div>
      </div>
      <div id='debt-title-div'>
        <div id='debt-title'>
          <input type="text" name="title" id="" placeholder='Enter Title' value={inputValue.title} onChange={handleInputChange}/>
        </div>
        <div id='debt-title-toggles'>
          <p>50% completed</p>
        </div>
      </div>
      <div id='debt-retract'>
      <h3>RETRACT</h3>
      </div>
      <div id='debt-add' onClick={handleSubmit}>
      <h3>{isSame ? 'ADD' : inputValue.title === '/delete' ? 'DELETE' : 'Update'}</h3>
      </div>
        <div id='debt-put-in-amnt'>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
          <p>$</p>
          <input type="number" name="amountPutInDebt" id="" placeholder='AMNT' value={ !addAmntToggle ? inputValue.amountPutInDebt : addAmount } onChange={!addAmntToggle ? handleInputChange : handleAddAmnt} ref={inputRef} onBlur={addAmntToggle ? handleAddBlur : handleBlur}/>            
          </div>
          <p>into debt</p>
        </div>
        <div id='debt-origin-amnt'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
          <p>$</p>
          <input type="number" name="originalAmount" id="" placeholder='AMNT' value={inputValue.originalAmount} onChange={handleInputChange}/>            
          </div>
          <p>originally owed</p>
        </div>
      <div id='debt-progress-bar'>
        <div id='progress-bar-white' style={{flex: 1, backgroundColor: 'white', padding: '0px'}}>

        </div>
        <div id='progress-bar-green' style={{backgroundColor: 'green', height: '20%'}}>

        </div>
      </div>
    </div>
  )
}

export default Debt