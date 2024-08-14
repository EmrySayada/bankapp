import React, { useEffect, useState } from 'react'
import { createTransaction, getInfo, getTransactions } from '@/api/apiManager'
import { useCookies } from 'react-cookie';
import NavBar from '@/components/nav';
import TransactionTable from '@/components/transactionTable';

function Transaction() {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const [amount, setAmount] = useState();
  const [recAccountId, setRecAccountId] = useState();
  const [description, setDescription] = useState();
  const [ownAccountId, setOwnAccountId] = useState();
  const [err, setErr] = useState();
  async function handleTransaction(token, ownAccId, recAccId, amount, description){
    const data = await createTransaction(token, ownAccId, recAccId, amount, description);
    if(data.error){
      setErr(data.error);
    }
    window.location.reload();
  }
  return (
    <div className='flex'>
      <NavBar selected={'transactions'}/>
      <div className='w-[85%] flex justify-around flex-col h-screen'>
        <div className='flex flex-col justify-center items-center w-[100%]'>
          <input placeholder='Enter account number' type='number' onChange={(v) => {setOwnAccountId(v.target.value)}} className='form'/>
          <input placeholder='Amount' type='number' onChange={(v) => {setAmount(v.target.value)}} className='form'/>
          <input placeholder="Party's account number" type='number' onChange={(v) => {setRecAccountId(v.target.value)}} className='form'/>
          <input placeholder='Description' type='text' onChange={(v) => {setDescription(v.target.value)}} className='form'/>
          <button type='submit' onClick={async () => {await handleTransaction(cookie.token, ownAccountId, recAccountId, amount, description)}} className='btn transition-all'>Submit</button>
          <p className='text-red-500 mt-[10px] transition-all'>{err}</p>
        </div>
        <div className='h-[50%] flex items-center justify-center w-[100%]'>
          <TransactionTable/>
        </div>
      </div>
    </div>
  )
}

export default Transaction
