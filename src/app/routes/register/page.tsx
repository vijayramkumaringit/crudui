'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react'
import'./register.css'
import { useRouter } from 'next/navigation'

const Register: React.FC = () => {

  const router = useRouter()
  
  const [usernameInput, setUsername] = useState<string>('')
  const [passwordInput, setPassword] = useState<string>('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('')
  const [error, setError] = useState<string>('')

  const addUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:usernameInput, password:passwordInput })
      });
  
      if (res.ok) {
        router.push('/Login');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPasswordInput(e.target.value)
  }

  const handleNewUserSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (passwordInput !== confirmPasswordInput) {
      setError("Passwords do not match!")
      return
    }

    addUser()

    setUsername('')
    setPassword('')
    setConfirmPasswordInput('')
    
  }

  return (
    <div>
      <h1>New user!!! Register here</h1>
      <form onSubmit={handleNewUserSignup} className='registerFormContainer'>
        <label>Username</label>
        <input 
          type="text" 
          placeholder="Enter your username" 
          value={usernameInput}
          onChange={handleUser}
        />
        <label>Password</label>
        <input 
          type="password" 
          placeholder="Enter your password" 
          value={passwordInput}
          onChange={handlePassword}
        />
        <label>Confirm Password</label>
        <input 
          type="password" 
          placeholder="Confirm password" 
          value={confirmPasswordInput}
          onChange={handleConfirmPassword}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Register
