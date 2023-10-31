import React, { useEffect, useState } from 'react'
import { signUpUser } from '../../redux/ActionCreators/authActionCreators';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [name,setName]=useState(""); 
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [passwordConfirmation,setPasswordConfirmation]=useState("");
   const [sucess,setSucess]=useState(false);

   const dispatch=useDispatch();
const navigate=useNavigate();

    const handelSubmit=(e)=>{
        e.preventDefault();
        if(!name||!email || !password ||!passwordConfirmation)
        {
            alert("Please fill The all fields");
            return;
        }
        if(password != passwordConfirmation){
            alert("Password Not Match");
            return;
        }
        
        dispatch(signUpUser(name,email,password,setSucess));
        
    }

    useEffect(()=>{
       if(sucess){
        navigate("/dashboard")
       }
         
    },[sucess])
    return (
      <form onSubmit={handelSubmit}>
        <div className="form-group my-2">
              <input 
               type="text" 
               name="name" 
               className="form-control" 
               placeholder='Name'
               value={name}
               onChange={(e)=>setName(e.target.value)} />
          </div>
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
          <div className="form-group my-2">
              <input 
              type="password" 
              name="passwordConfirmation" 
              className="form-control" 
              placeholder='Re-type Password'
              value={passwordConfirmation}
              onChange={(e)=>setPasswordConfirmation(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary my-2 form-control">Register</button>
      </form>
    )
}
