import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDebt, getDebt, updateDebt } from '../redux/slices/debt';
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
  console.log(trueInputValue)

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
    } else if (!isSame && inputValue.title !== '' && inputValue.originalAmount !== '' && inputValue.amountPutInDebt !== ''){
        dispatch(updateDebt({token: user.token, data: {debt: props._id, updateDept: {...inputValue}}}))
    }
     else if (isSame && inputValue.title !== '' && inputValue.originalAmount !== '' && inputValue.amountPutInDebt !== ''){
      setAddAmntToggle(true)
      inputRef.current.focus()
    }
  }

  const handleAddAmnt = (event) => {
    setAddAmount(event.target.value)
  }

  const handleAddBlur = () => {
    if (addAmount !== ''){
      console.log('edjfsbsfekjdb')
    let newAmount = Number(addAmount) + Number(trueInputValue.amountPutInDebt)
    dispatch(updateDebt({token: user.token, data: {debt: props._id, updateDebt: {amountPutInDebt: newAmount}}}))
    setAddAmntToggle(false)
    props.handleReload()
    setInputValue({...inputValue, amountPutInDebt: newAmount})
    setAddAmount('')
    } else {
    setAddAmntToggle(false)
    }
  }


  const handleRetract = () => {

  }
  let percentage =  (Number(trueInputValue.amountPutInDebt) / Number(trueInputValue.originalAmount)) * 100
  const inputRef = useRef()
  return (
    <div id='debt'>
      <div id='debt-date'>
        <div>
            <p>{props.num}</p>
        </div>
      </div>
      <div id='debt-title-div'>
        <div id='debt-title'>
          <input type="text" name="title" id="" placeholder='Enter Title' value={inputValue.title} onChange={handleInputChange}/>
        </div>
        <div id='debt-title-toggles'>
          <p>{percentage}% completed</p>
        </div>
      </div>
      <div id='debt-retract'>
      <h3>RETRACT</h3>
      </div>
      <div id='debt-add' onClick={handleSubmit} style={inputValue.title === '/delete' ? {backgroundColor: 'red'} : isSame ? {backgroundColor: 'green'} : inputValue.title === '' || inputValue.originalAmount === '' || inputValue.amountPutInDebt === '' ? {backgroundColor: 'black'} : {backgroundColor: 'yellow'}}>
      <h3>{isSame ? 'ADD' : inputValue.title === '/delete' ? 'DELETE' : 'Update'}</h3>
      </div>
        <div id='debt-put-in-amnt'>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
          <p>$</p>
          <input type="number" name="amountPutInDebt" id="" placeholder='AMNT' value={ !addAmntToggle ? inputValue.amountPutInDebt : addAmount } onChange={!addAmntToggle ? handleInputChange : handleAddAmnt} ref={inputRef} onBlur={addAmntToggle ? handleAddBlur : null}/>            
          </div>
          <p>into debt</p>
        </div>
        <div id='debt-origin-amnt'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
          <p>$</p>
          <input type="number" name="originalAmount" id="" placeholder='AMNT' value={inputValue.originalAmount} onChange={handleInputChange} />            
          </div>
          <p>originally owed</p>
        </div>
      <div id='debt-progress-bar'>
        <div id='progress-bar-white' style={{flex: 1, backgroundColor: 'white', padding: '0px'}}>

        </div>
        <div id='progress-bar-green' style={{backgroundColor: 'green', height: `${percentage}%`}}>

        </div>
      </div>
    </div>
  )
}

export default Debt