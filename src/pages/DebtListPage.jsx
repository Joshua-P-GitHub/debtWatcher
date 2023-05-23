import React, { useEffect } from 'react'
import Debt from '../components/Debt'
import NewDebt from '../components/NewDebt'
import { useDispatch, useSelector } from 'react-redux'
import { getDebt } from '../redux/slices/debt'

function DebtListPage() {
  const {user} = useSelector((state) => state.auth)
  const {debt, isLoading, isError} = useSelector((state) => state.debt)
  console.log(debt)
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(getDebt(user.token))
  },[])
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
      {debt.map((d) => {
        return(<Debt title={d.title} originalAmount={d.originalAmount} amountPutInDebt={d.amountPutInDebt} key={d._id} _id={d._id}/>)
      })}
      <NewDebt />
    </div>
  )
}

export default DebtListPage