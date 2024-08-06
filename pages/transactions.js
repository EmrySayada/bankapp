import React, { useEffect, useState } from 'react'
import { handleTransaction, getInfo, getTransactions } from '@/api/apiManager'
import { useCookies } from 'react-cookie';
import NavBar from '@/components/nav';

function Transaction() {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const [amount, setAmount] = useState();
  const [accounts, setAccounts] = useState();
  const [recAccountId, setRecAccountId] = useState();
  const [description, setDescription] = useState();
  const [ownAccountId, setOwnAccountId] = useState();
  useEffect(() => {
    async function orderDate(){
      const data = await getInfo(cookie.token);
      if(data.statusCode == 201){
        setAccounts(data.accountData.accounts)
      }
    }
    orderDate()
    // async function orderData(){
    //   const data = await getTransactions(cookie.token);
    //   console.log(data)
    // }
    // orderData()
  }, [])
  return (
    <div className='flex'>
      <NavBar selected={'transactions'}/>
      <div className='flex w-[80%] h-screen flex-col justify-center items-center'>
        <input name='account' list='accounts' placeholder='Choose an account' onChange={(v) => {setOwnAccountId(v.target.value)}} className='form'/>
        <datalist className='bg-black' id='accounts'>
          {accounts != undefined ?  (accounts.map((acc, index) => {
            return <option value={index + 1} key={index}>balance: {acc.balance}</option>
          })): ""}
        </datalist>
        <input placeholder='Amount' type='number' onChange={(v) => {setAmount(v.target.value)}} className='form'/>
        <input placeholder="Party's account number" type='number' onChange={(v) => {setRecAccountId(v.target.value)}} className='form'/>
        <input placeholder='Description' type='text' onChange={(v) => {setDescription(v.target.value)}} className='form'/>
        <button type='submit' onClick={() => {handleTransaction(cookie.token, ownAccountId, recAccountId, amount, description)}} className='btn transition-all'>Submit</button>

      </div>
    </div>
  )
}

export default Transaction
