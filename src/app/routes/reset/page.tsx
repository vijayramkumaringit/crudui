'use client'
import React, { use, useState } from 'react'
import './reset.css'
import { useRouter } from 'next/navigation'

const ResetPage = () => {

  const router=useRouter()

  const [username,setUsername]=useState('')
  const [newPassword,setNewPassword]=useState('')
  const [error,setError]=useState('')
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/; 


  const handleResetPassword=async (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if(!username || !newPassword){
      alert('input fields cant be empty')
    }

    if (!passwordRegex.test(newPassword)) {
      setError("Password does not meet the requirement");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:username, password:newPassword })
      });

      const data = await res.json()

      if (res.ok) {
        alert('Password updated successfully.')
      } else {
        alert(data.message || 'Failed to reset password.')
      }
      router.push('/Login')
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <div className='resetPage'>
        <form className='resetPageForm' onSubmit={handleResetPassword}>
            <h1>Password Assistance</h1>
            <p>Enter the email address associated with your account.</p>
            <label>username or email </label>
            <input type='text' placeholder='enter the email'  value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
            <label>New Password</label>
            <input type='password' placeholder='enter your new password' onChange={(event)=>{setNewPassword(event.target.value)}}/>
            <div>
                <button type='submit'>continue</button>
            </div>
            {error&&<p style={{ color: 'red' }}>{error}<span style={{color:'black'}}>. Password must be 8-20 characters, include uppercase, lowercase, number, and special character.</span></p>}
        </form>
    </div>
  )
}

export default ResetPage