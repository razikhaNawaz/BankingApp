import React, { useState } from 'react'
import classes from './Auth.module.css'

const Auth = () => {
    const [email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [login, setLogin]=useState(true)

    const emailHandler=(e)=>{
        setEmail(e.target.value)
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }

    const confirmPasswordHandler=(e)=>{
        setConfirmPassword(e.target.value)
    }
     const switchHandler=()=>{
        setLogin(!login)
     }
let url;
     const Auth=async()=>{
        if(login){
        url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEEV5oe8QHzMWZ9RLhehZG6wu6Ez0agmQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEEV5oe8QHzMWZ9RLhehZG6wu6Ez0agmQ";
    }
    try{
        const response=await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:email,
                password:Password,
                returnSecureToken:true
            }),
            headers:{
                "Content-Type":'application/json'
            }
        })
        const data=await response.json()
        console.log(data)
        if(!data.error){
            localStorage.setItem(data.idToken,'token')
            localStorage.setItem(email,'email')
        }
    }
    catch(err){
        console.log(err);
    }
        
     }

    const submitHandler=(e)=>{
        e.preventDefault();
        // console.log(email, password)
        Auth()
    }

  return (
    <div className={classes.parent}>

    <div className={classes.container}>
        <form onSubmit={submitHandler} className={classes.child1}>
            <h3>Please enter all fields</h3>
            <div className={classes.input}>
            <input type="email" placeholder='Email' value={email} onChange={emailHandler} required/>
            <input type="password" placeholder='Password' value={Password} onChange={passwordHandler} required/>
            <input type="password"placeholder='Confirm Password' value={confirmPassword} onChange={confirmPasswordHandler} required/>

            </div>
            <button type="submit" class="btn btn-primary" >
            {login ? 'login' : 'signUp'}
                </button>
                <div className={classes.child2}>
         <button type="button" class="btn btn-secondary" onClick={switchHandler}>
        {login ? 'create account' : 'Have an Account?Login'}

        </button>

    </div>
        </form>


    </div>
    
    </div>
  )
}

export default Auth