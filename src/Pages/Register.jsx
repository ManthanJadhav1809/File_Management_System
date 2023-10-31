import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../Components/AuthComponents/RegisterForm'

export default function Register() {
  return (
    <div className="container-fluid">
      <h1 className='display1 my-5 text-center'>Register here</h1>
      <div className="row">
      <div className="col-md-5 mx-auto mt-5">
        <RegisterForm></RegisterForm>
        <Link to="/login" >
          <p className="small">Already Have account ? Login</p>
        </Link>
      </div>
      </div>
    </div>
  )
}
