import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {newDebt} from '../redux/slices/debt'

function NewDebt() {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {debt} = useSelector((state) => state.debt)
  const [inputValue, setInputValue] = useState({
    title: '',
    originalAmount: '',
    amountPutInDebt: '',
  })

  const handleInputChange = (event) => {
    const inputValueCopy = { ...inputValue }
    inputValueCopy[`${event.target.name}`] = event.target.value
    setInputValue(inputValueCopy);
  };


  const handleSubmit = () => {
    dispatch(newDebt({token: user.token, debt: inputValue}))
    setInputValue({
      title: '',
      originalAmount: '',
      amountPutInDebt: '',
    })
  }
  return (
    <div id='new-debt'>
    <div id='debt'>
    <div id='debt-date'>
      <div>
        <h3>Not created</h3>
      </div>
    </div>
    <div id='debt-title-div'>
      <div id='debt-title'>
        <input type="text" name="title" id="" placeholder='Enter Title'
        value={inputValue.title}
        onChange={handleInputChange}/>
      </div>
      <div id='debt-title-toggles'>
        <p>0% completed</p>
      </div>
    </div>
    <div id='debt-retract'>
    <h3>RETRACT</h3>
    </div>
    <div id='debt-add' onClick={handleSubmit}>
    <h3>ADD</h3>
    </div>
      <div id='debt-put-in-amnt'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
        <p>$</p>
        <input type='number' name="amountPutInDebt" id="" placeholder='AMNT'
        value={inputValue.amountPutInDebt}
        onChange={handleInputChange}
        />            
        </div>
        <p>into debt</p>
      </div>
      <div id='debt-origin-amnt'>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
        <p>$</p>
        <input type='number' name="originalAmount" id="" placeholder='AMNT'        
        value={inputValue.originalAmount}
        onChange={handleInputChange}/>            
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
  </div>
  )
}

export default NewDebt