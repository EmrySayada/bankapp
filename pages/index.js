import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { getInfo } from "@/api/apiManager";
import NavBar from "@/components/nav";
import { dater } from "@/functions/dater";
import TransactionTable from "@/components/transactionTable";
import ActivityIndicator from "@/components/loading";


export default function Home() {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const [balance, setBalance] = useState();
  const [transaction, setTransaction] = useState();
  const [accounts, setAccounts] = useState();
  const [numOfTransa, setNumOfTransa] = useState();
  const router = useRouter();

  useEffect(() => {
    if(!cookie.token || cookie.token === "undefined"){
      router.replace('/login');
    }else{
      async function orderData(){
        const tempData = await getInfo(cookie.token);
        console.log(tempData)
        if (tempData == undefined || tempData.statusCode === 401){
          router.replace('/login');
        }else{
          if(tempData.transactionsData.transactions !== undefined){
            if (tempData.transactionsData.transactions.length){
              for(let i = 0; i<tempData.transactionsData.transactions.length; i++){
                if(tempData.transactionsData.transactions[i].id == tempData.transactionsData.transactions.length){
                  setTransaction(tempData.transactionsData.transactions[i].amount);
                }
              }
            }else{
              setTransaction(0);
            }
            setAccounts(tempData.accountData.accounts.length);
            setNumOfTransa(tempData.transactionsData.transactions.length);
            var sum = 0;
            for (let i = 0; i<tempData.accountData.accounts.length; i++){
              sum = sum + tempData.accountData.accounts[i].balance;
            }
          }

          setBalance(sum);
        }
        if(tempData === undefined){
          router.replace('/login');
        }
      }
      orderData();
    }
  }, [])
  return (
    <div className="bg-white w-screen h-screen flex flex-row justify-between">
      <NavBar selected={'index'}/>
      <div className="w-[85%] h-screen bg-white flex flex-col items-center justify-center">
        <section className="w-[100%] h-[25vh] flex flex-row items-center justify-around mt-[5vh]">
          <div className="card"><p className="txt font-semibold">Total Balance: </p><p className="txt">{balance}$</p></div>
          <div className="card"><p className="txt font-semibold">Recent Transaction: </p><p className="txt">{transaction}$</p></div>
          <div className="card"><p className="txt font-semibold">Number of accounts: </p><p className="txt">{accounts}</p></div>
          <div className="card"><p className="txt font-semibold">Number of transactions: </p><p className="txt">{numOfTransa}</p></div>
        </section>
        <section className="w-[100%] h-[60vh] flex flex-col items-center mt-[5vh]">
            <h1 className="txt font-semibold">Transactions</h1>
            <TransactionTable/>
        </section>
      </div>
    </div>
  );
}
