import React, { useState, useEffect } from 'react'
import { login, hash } from '@/api/apiManager'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';


function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [err, setErr] = useState();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const router = useRouter();
    async function handleLogin(username, password){
        if(username === undefined || password === undefined){
            setErr("You must enter a username and a password!")
            return "problem";
        }
        const loginRes = await login(username, await hash(password, 2));
        if(loginRes.error){
            setErr(loginRes.error)
            return "problem";
        }
        setCookie('token', loginRes.access_token)
        router.push('/')
        return "ok";
    }
    return (
        <div className='flex items-center w-screen h-screen bg-[#3399CC]'>
            <div className='w-[50%] h-screen bg-white rounded-y-[20px] rounded-r-[20px] flex flex-col items-center justify-center'>
                <h1 className='mb-[10px] text-[#3399CC] text-[32px] font-bold'>Login</h1>
                <input type='text' placeholder='Username' className='form' onChange={(v) => {setUsername(v.target.value); setErr(null)}}/>
                <input type='password' placeholder='Password' className='form' onChange={(v) => {setPassword(v.target.value); setErr(null)}}/>
                <p className='text-red-500 mb-[10px] transition-all'>{err}</p>
                <button className='btn transition-all' onClick={async () => {await handleLogin(username, password)}}>Login</button>
                <p className='text-[#3399CC] mt-[20px]'>Don&apos;t have an account? <button className='underline' onClick={() => {router.push('/register')}}>Sign Up</button></p>
            </div>
            <div className='w-[50%] h-screen flex items-center justify-center text-center group'>
                <h1 className='text-white text-[32px] font-bold group-hover:text-[64px] group-hover:text-[#3399CC] transition-all ease z-10'>A new way of banking.</h1>
                <div className='w-[0px] bg-white group-hover:w-[45%] absolute transition-all h-[60px] z-0 rounded-[10px]'></div>
            </div>
        </div>
    )
}

export default Login
