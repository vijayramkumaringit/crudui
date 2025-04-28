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

  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/; 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/; 


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

    if (!usernameInput || !passwordInput || !confirmPasswordInput) {
      setError("All fields are required.");
      return;
    }

    if (!usernameRegex.test(usernameInput)) {
      setError("Username does not meet the requirement.");
      return;
    }

    if (!passwordRegex.test(passwordInput)) {
      setError("Password does not meet the requirement");
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      setError("Passwords did not match!")
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
        <div>
          <input 
            type="text" 
            placeholder="Enter your username" 
            value={usernameInput}
            onChange={handleUser}
          />
          {usernameRegex.test(usernameInput) && usernameInput.length > 2 && (
            <span className="tick-icon">✓</span>
          )}
        </div>
        
        <label>Password</label>
        <div>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={passwordInput}
            onChange={handlePassword}
          />
          {passwordRegex.test(passwordInput) && passwordInput.length > 7 && (
            <span className="tick-icon">✓</span>
          )}
        </div>

        <label>Confirm Password</label>
        <div>
          <input 
          type="password" 
          placeholder="Confirm password" 
          value={confirmPasswordInput}
          onChange={handleConfirmPassword}
        />
         {passwordInput === confirmPasswordInput && confirmPasswordInput.length > 0 && (
            <span className="tick-icon">✓</span>
          )}
        </div>
        
        <p className='requirement'>Password must be 8-20 characters, include uppercase, lowercase, number, and special character. </p>
        <p className='requirement'>Username must be 3-20 alphanumeric characters</p>
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default Register
