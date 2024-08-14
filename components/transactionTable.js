import React, { useState, useEffect } from 'react';
import { dater } from '@/functions/dater';
import { acceptTransaction, getTransactions, getUserInfo, rejectTransaction } from '@/api/apiManager';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

function TransactionTable() {
	const [cookie, setCookie, removeCookie] = useCookies();
	const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState();
	const router = useRouter();
	useEffect(() => {
		async function getData(){
			const data = await getTransactions(cookie.token);
      const userData = await getUserInfo(cookie.token);
			if(data.transactions){
        setUsername(userData.user.username)
        const arr = data.transactions.sort(function(a, b) {
					return - (a.id - b.id) ;
				})
				setTransactions(arr);
			}else{
				router.replace('/login');
			}
		}
		getData();
	},[])
  return (
    <div className='w-[90%] h-[50vh] overflow-scroll bg-[#E8F8FF] rounded-[5px]'>
      <table className=" w-[100%] ">
      <thead className="h-[50px]">
        <tr>
          <th className="smallTxt">#</th>
          <th className="smallTxt">From</th>
          <th className="smallTxt">To</th>
          <th className="smallTxt">Amount</th>
          <th className="smallTxt">Description</th>
          <th className="smallTxt">Time Stamp</th>
          <th className="smallTxt">Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tr, index) => {
          return (
          <tr key={index} className="h-[50px] border-y-[1px] border-gray-300 hover:bg-white transition-all">
            <th className="smallTxt font-normal">{tr.id}</th>
            <th className="smallTxt font-normal">{tr.senderUsername}</th>
            <th className="smallTxt font-normal">{tr.receiverUsername}</th>
            <th className="smallTxt font-normal">{tr.amount}$</th>
            <th className="smallTxt font-normal">{tr.description}</th>
            <th className="smallTxt font-normal">{dater(tr.timestamp)}</th>
            {/* <th className="smallTxt font-normal">{tr.status}</th> */}
            <th>
              { tr.status == "0" && tr.senderUsername != username ? (
                <div className='w-[100%] flex flex-row justify-around'>
                  <button onClick={async () => {await acceptTransaction(cookie.token, tr.id); window.location.reload();}}><img src='../yes.svg' width={50} alt='Accept'/></button>
                  <button onClick={async () => {await rejectTransaction(cookie.token, tr.id); window.location.reload();}}><img src='../no.svg' width={40} alt='reject'/></button>
                </div>
              ) : tr.status == "0" ? "Pending" : tr.status
              }
            </th>
          </tr>
          )
        })}
      </tbody>
    </table>
  </div>
  )
}

export default TransactionTable;
