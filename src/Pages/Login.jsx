import React from 'react'
import LoginForm from '../Components/AuthComponents/LoginForm'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="container-fluid">
      <h1 className='display1 my-5 text-center'>Login</h1>
      <div className="row">
      <div className="col-md-5 mx-auto mt-5">
        <LoginForm></LoginForm>
        <Link to="/register" >
          <p className="small">Don't Have account ? Register</p>
        </Link>
      </div>
      </div>
    </div>
  )
}
