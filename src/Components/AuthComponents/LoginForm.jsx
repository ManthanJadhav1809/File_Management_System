import React, { useEffect } from 'react'
import { useState } from 'react'
import { signInUser } from '../../redux/ActionCreators/authActionCreators';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [sucess,setSucess]=useState(false);

   const dispatch=useDispatch();
   const navigate=useNavigate();

  const handelSubmit=(e)=>{
    e.preventDefault();
    if(!email || !password){
      toast.error('Please fill The all fields',{
        position: 'top-right',
      })
      // alert("Please fill The all fields");
      return;
    }
    else{
      dispatch(signInUser(email,password,setSucess));
    }
  }

  useEffect(()=>{
    if(sucess){
      navigate("/dashboard")
     }
  },[sucess])
  
    return (
    <form  onSubmit={handelSubmit}>
        <div className="form-group my-2">
            <input 
             type="email" 
             name="email" 
             className="form-control" 
             placeholder='Email'
             value={email}
             onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-group my-2">
            <input 
            type="password" 
            name="password" 
            className="form-control" 
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary my-2 form-control">Login</button>
    </form>
  )
}
