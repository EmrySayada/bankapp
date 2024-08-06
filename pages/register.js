import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { register, hash } from '@/api/apiManager';

function Register() {
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [birth, setBirth] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [err, setErr] = useState();
    const router = useRouter();
    async function handleRegister(username, firstName, lastName, birth, address, phoneNumber, email, password){
        if(username === undefined || firstName === undefined || lastName === undefined || birth === undefined || address === undefined || phoneNumber === undefined || email === undefined || password === undefined){
            setErr("You must enter the required information!");
            return "problem";
        }
        const registerRes = await register(username, firstName, lastName, birth, address, phoneNumber, email, password);
        if(registerRes.error){
            setErr(registerRes.error);
            return "problem";
        }
        router.push('/login');
        return "ok";
    }
    return (
        <div className='flex items-center w-screen h-screen bg-[#3399CC]'>
            <div className='w-[50%] h-screen bg-white rounded-r-[20px] flex flex-col items-center justify-center'>
                <h1 className='mb-[10px] text-[#3399CC] text-[32px] font-bold'>Sign up</h1>
                <input type='text' placeholder='Username' className='form' onChange={(v) => {setUsername(v.target.value)}}/>
                <input type='text' placeholder='First name' className='form' onChange={(v) => {setFirstName(v.target.value)}}/>
                <input type='text' placeholder='Last name' className='form' onChange={(v) => {setLastName(v.target.value)}}/>
                <input type='date' placeholder='Birthday' className='form' onChange={(v) => {setBirth(v.target.value)}}/>
                <input type='text' placeholder='Address' className='form' onChange={(v) => {setAddress(v.target.value)}}/>
                <input type='phone' placeholder='Phone number' className='form' onChange={(v) => {setPhoneNumber(v.target.value)}}/>
                <input type='email' placeholder='Email' className='form' onChange={(v) => {setEmail(v.target.value)}}/>
                <input type='password' placeholder='Password' className='form' onChange={(v) => {setPassword(v.target.value)}}/>
                <p className='text-red-500 mb-[10px] transition-all'>{err}</p>
                <button className='btn transition-all' onClick={async () => {await handleRegister(username, firstName, lastName, birth, address, phoneNumber, email, await hash(password, 2))}}>Sign Up</button>
                <p className='text-[#3399CC] mt-[20px]'>Already have an account? <button className='underline' onClick={() => {router.push('/login')}}>Login</button></p>
            </div>
            <div className='w-[50%] h-screen flex items-center justify-center text-center group'>
                <h1 className='text-white text-[32px] font-bold group-hover:text-[64px] group-hover:text-[#3399CC] transition-all ease z-10'>A new way of banking.</h1>
                <div className='w-[0px] bg-white group-hover:w-[45%] absolute transition-all h-[60px] z-0 rounded-[10px]'></div>
            </div>
        </div>
    )
}

export default Register
