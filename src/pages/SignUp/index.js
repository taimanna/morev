import { Input } from 'antd'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import createUser from '../../api/createUser'
import getUserInfo from '../../api/getUserInfo'
import { Loading } from '../../components'
import { AuthContext } from '../../context/AuthProvider'
import './style.css'

const SignUp = () => {
  const { dispatch } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [fullNameError, setFullNameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [defaultError, setDefaultError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    // xử lý signup
    try {
      setIsLoading(true)
      const res = await createUser({
        email,
        password,
        fullName,
      })

      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)

      dispatch({ type: 'SET_ACCESS_TOKEN', data: res.accessToken })
      const userData = await getUserInfo(res.accessToken)
      dispatch({ type: 'SET_USER', data: userData })
      setIsLoading(false)
      navigate('/') // login xong chuyển về trang chủ
    } catch (error) {
      setFullNameError(null)
      setPasswordError(null)
      setEmailError(null)
      setDefaultError(null)

      error.forEach((err) => {
        switch (err.field) {
          case 'email':
            setEmailError(err.detail)
            break
          case 'password':
            setPasswordError(err.detail.split(/\n/))
            break
          case 'fullName':
            setFullNameError(err.detail)
            break
          default:
            setDefaultError(err.detail)
            break
        }
      })
      setIsLoading(false)
    }
  }

  return (
    <div className='signup'>
      {isLoading && <Loading />}
      <div className='auth-form-container'>
        <h1 className='signup-title'>Sign Up</h1>
        <label htmlFor='name'>Full name</label>
        <input
          className='input-form'
          value={fullName}
          name='name'
          id='name'
          placeholder='Full Name'
          onChange={(e) => {
            setFullName(e.target.value)
          }}
        />
        {fullNameError && <span className='error'>{fullNameError}</span>}
        <label htmlFor='email'>Email</label>
        <input
          className='input-form'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='youremail@gmail.com'
          id='email'
          name='email'
        />
        {emailError && <span className='error'>{emailError}</span>}
        <label htmlFor='password'>Password</label>
        <Input.Password
          className='input-form'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          type='password'
          placeholder='Password'
          id='password'
          name='password'
        />
        {passwordError &&
          passwordError.map((error, index) => (
            <span className='error' key={index}>
              {error}
            </span>
          ))}
        {defaultError && <span className='error'>{defaultError}</span>}
        <button className='signup-btn' onClick={handleSubmit}>
          Sign Up
        </button>
        <div className='link-btn'>
          Already have an account? <Link to='/login'>Login</Link> here.
        </div>
      </div>
    </div>
  )
}

export default SignUp
