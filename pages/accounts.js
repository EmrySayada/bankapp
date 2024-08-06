import React, { useState, useEffect } from 'react'
import NavBar from '@/components/nav'
import { createAccount, getAccounts } from '@/api/apiManager'
import { useCookies } from 'react-cookie'
import { dater } from '@/functions/dater';

function Accounts() {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    async function getData(){
      const data = await getAccounts(cookie.token);
      setAccounts(data.accounts);
    }
    getData();
  }, [])
  return (
    <div className='bg-white w-screen h-screen flex flex-row justify-between'>
        <NavBar selected={'accounts'}/>
        <div className="w-[85%] h-screen bg-white flex flex-col items-center justify-center">
          <section className='flex flex-wrap justify-around h-[90%] ml-[10px]'>
            {accounts.map((acc, index) => {
              return (
                <div className='bg-[#E8F8FF] h-[200px] w-[500px] rounded-[20px] flex flex-col items-center justify-around mr-[10px]' key={index}>
                  <p className='txt font-semibold'>{acc.id}</p>
                  <p className='txt'>Balance: {acc.balance}$</p>
                  <p className='smallTxt'>Created At: {dater(acc.dateCreated)}</p>
                </div>
              )
            })}
          </section>
          <button className='btn transition-all' onClick={async () => {await createAccount(cookie.token)}}>Create Account</button>
        </div>
    </div>
  )
}

export default Accounts
