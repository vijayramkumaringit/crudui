'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import'./login.css'

const Login = () => {

  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLoginForm = async (e: React.FormEvent) => {

    e.preventDefault()

    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('token', data.token)
      router.push('/routes/item')
    } else {
      alert('Invalid credentials')
    }
  }
  
  return (
    <div>
      <form onSubmit={submitLoginForm} className='loginFormContainer'>
        <label>Username</label>
        <input
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <p>existing user log in , new user register here</p>
        <div className='formButtonContainer'>
          <button type='submit'>Log in</button>
          <button type='button' onClick={()=>{router.push('/routes/register')}}>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Login