import React, { useEffect, useState } from 'react'
import Debt from '../components/Debt'
import NewDebt from '../components/NewDebt'
import { useDispatch, useSelector } from 'react-redux'
import { getDebt } from '../redux/slices/debt'

function DebtListPage() {
  const {user} = useSelector((state) => state.auth)
  const {debt, isLoading, isError} = useSelector((state) => state.debt)
  console.log(debt)
  const dispatch = useDispatch()
  const handleReload = () => {
    console.log('ranbbbbbb')
    dispatch(getDebt(user.token))
  }
  useEffect(() => {
    console.log(user)
    if(user){
   handleReload()      
    }
  },[])
  let i = 0;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '15px', padding: '15px'}}>
      {debt.map((d) => {
        i++
        return(<Debt title={d.title} originalAmount={d.originalAmount} amountPutInDebt={d.amountPutInDebt} key={d._id} _id={d._id} handleReload={handleReload} num={i}/>)
      })}
      <NewDebt />
    </div>
  )
}

export default DebtListPage