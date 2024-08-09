import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { getNotif, getUserInfo } from '@/api/apiManager';

function NavBar(props) {
	const router = useRouter();
	const [cookie, setCookie, removeCookie] = useCookies(['token']);
	const [name, setName] = useState();
	const [hover, setHover] = useState();
	useEffect(() => {
		const selected = document.getElementById(props.selected);
		selected.style.backgroundColor = '#3399CC';
		selected.style.color = 'white';
		async function order(){
			const userData = await getUserInfo(cookie.token);
			const notif = await getNotif(cookie.token);
			console.log(notif)
			if(userData.user!==undefined){
				setName(userData.user.firstName + " " + userData.user.lastName)
			}
		}
		order()
	}, []);
	return (
		<div className="bg-[#E8F8FF] h-screen w-[35vh] flex flex-col items-center border-r-2 justify-between">
			<h1 className="text-[#3399CC] font-bold text-[32px] ml-[3vh] mt-[5vh]">Banking, Differently.</h1>
			<div className="flex flex-col h-[20%] w-[100%] items-center justify-around text-[#3399CC] text-[20px] font-semibold">
				<button className="h-[33%] w-[90%] rounded-[10px] hover:w-[95%] hover:bg-[#3399CC] hover:text-white transition-all" onClick={() => {router.push('/')}} id='index'>Dashboard</button>
				<button className="h-[34%] w-[90%] rounded-[10px] hover:w-[95%] hover:bg-[#3399CC] hover:text-white transition-all" onClick={() => {router.push('/accounts')}} id='accounts'>Accounts</button>
				<button className="h-[33%] w-[90%] rounded-[10px] hover:w-[95%] hover:bg-[#3399CC] hover:text-white transition-all" onClick={() => {router.push('/transactions')}} id='transactions'>Transactions</button>
			</div>
			<div className='w-[100%] flex flex-col items-center justify-around h-[10%]'>
				<div className='bg-gray-300 w-[200px] h-[2px]'/>
				<button className='btn transition-all' onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} onClick={() => {removeCookie('token'); router.push('/login')}}>{hover ? "Sign Out" : name}</button>
			</div>
		</div>
	)
}

export default NavBar
